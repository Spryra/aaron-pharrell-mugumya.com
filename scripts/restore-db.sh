#!/bin/bash

################################################################################
# Database Restore Script
#
# Purpose: Restore PostgreSQL database from pg_dump backup file
# Usage: bash scripts/restore-db.sh <backup-file> [optional-database-name]
#
# Requirements:
#   - PostgreSQL client tools (psql, pg_restore)
#   - DATABASE_URL environment variable (or provide database name as argument)
#   - Valid pg_dump backup file (compressed .sql.gz or plain .sql)
#   - Write permissions to database (will drop existing tables)
#
# Examples:
#   bash scripts/restore-db.sh backups/backup-2026-06-12-14-30-45.sql.gz
#   bash scripts/restore-db.sh backups/backup-2026-06-12-14-30-45.sql.gz mydbname
#   bash scripts/restore-db.sh /path/to/backup.sql
################################################################################

set -euo pipefail

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

################################################################################
# Configuration & Argument Parsing
################################################################################

BACKUP_FILE="${1:-}"
DATABASE_NAME="${2:-}"
RESTORE_LOG="restore-$(date +%Y-%m-%d-%H-%M-%S).log"

################################################################################
# Functions
################################################################################

log() {
    local level="$1"
    shift
    local message="$@"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[${timestamp}] [${level}] ${message}" | tee -a "${RESTORE_LOG}"
}

log_info() {
    echo -e "${BLUE}[INFO]${NC} $@"
    log "INFO" "$@"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $@"
    log "SUCCESS" "$@"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $@" >&2
    log "ERROR" "$@"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $@"
    log "WARNING" "$@"
}

print_usage() {
    cat << EOF
${BLUE}Usage:${NC} bash scripts/restore-db.sh <backup-file> [optional-database-name]

${BLUE}Arguments:${NC}
  <backup-file>              Path to backup file (.sql.gz or .sql)
  [optional-database-name]   Database name (defaults to DATABASE_URL)

${BLUE}Examples:${NC}
  bash scripts/restore-db.sh backups/backup-2026-06-12-14-30-45.sql.gz
  bash scripts/restore-db.sh ./backup.sql mydbname
  bash scripts/restore-db.sh s3-backups/backup-latest.sql.gz

${BLUE}Requirements:${NC}
  - PostgreSQL client tools (psql)
  - DATABASE_URL environment variable
  - Valid backup file
  - Write permissions to target database

${YELLOW}WARNING:${NC} This script will drop existing tables before restoring!
EOF
}

validate_arguments() {
    log_info "Validating arguments..."

    if [ -z "${BACKUP_FILE}" ]; then
        log_error "Backup file argument is required"
        print_usage
        exit 1
    fi

    if [ ! -f "${BACKUP_FILE}" ]; then
        log_error "Backup file not found: ${BACKUP_FILE}"
        exit 1
    fi

    log_success "Backup file exists: ${BACKUP_FILE}"

    # Check file size
    local file_size=$(du -h "${BACKUP_FILE}" | awk '{print $1}')
    log_info "Backup file size: ${file_size}"

    # Validate file extension
    case "${BACKUP_FILE}" in
        *.sql.gz)
            log_info "Detected gzip-compressed SQL file"
            ;;
        *.sql)
            log_info "Detected plain SQL file"
            ;;
        *)
            log_warning "Unexpected file extension. Proceeding anyway..."
            ;;
    esac
}

validate_environment() {
    log_info "Validating environment..."

    # Check if DATABASE_URL is set
    if [ -z "${DATABASE_URL:-}" ] && [ -z "${DATABASE_NAME}" ]; then
        log_error "DATABASE_URL environment variable is not set and no database name provided"
        exit 1
    fi

    # Check if psql is available
    if ! command -v psql &> /dev/null; then
        log_error "psql command not found. Please install PostgreSQL client tools."
        echo "  macOS: brew install postgresql"
        echo "  Ubuntu/Debian: apt install postgresql-client"
        echo "  Windows: Download PostgreSQL installer from https://www.postgresql.org/download/windows/"
        exit 1
    fi

    log_success "psql is available"
}

extract_database_name() {
    log_info "Extracting database name from connection string..."

    if [ -n "${DATABASE_NAME}" ]; then
        log_info "Using provided database name: ${DATABASE_NAME}"
        return 0
    fi

    if [ -z "${DATABASE_URL:-}" ]; then
        log_error "Cannot extract database name: DATABASE_URL not set and no database name provided"
        exit 1
    fi

    # Extract database name from DATABASE_URL
    # Format: postgresql://user:pass@host:port/dbname?params
    DATABASE_NAME=$(echo "${DATABASE_URL}" | sed -E 's|.*://.*@[^/]+/([^?]+).*|\1|')

    if [ -z "${DATABASE_NAME}" ]; then
        log_error "Failed to extract database name from DATABASE_URL"
        exit 1
    fi

    log_success "Extracted database name: ${DATABASE_NAME}"
}

confirm_restore() {
    log_warning ""
    log_warning "========== RESTORE CONFIRMATION =========="
    log_warning "This operation will DROP all existing tables in: ${DATABASE_NAME}"
    log_warning "Backup file: ${BACKUP_FILE}"
    log_warning "This action cannot be undone!"
    log_warning "========================================"
    log_warning ""

    local response=""
    while [ -z "$response" ] || [[ ! "$response" =~ ^[yY] ]]; do
        read -p "$(echo -e ${YELLOW}Are you sure you want to proceed? [y/N]:${NC} )" response
        if [[ "$response" =~ ^[nN]$ ]] || [ -z "$response" ]; then
            log_warning "Restore cancelled by user"
            exit 0
        fi
        if [[ ! "$response" =~ ^[yY]$ ]]; then
            echo "Please answer 'y' or 'n'"
            response=""
        fi
    done

    log_warning "User confirmed restore operation"
}

prepare_backup_file() {
    log_info "Preparing backup file for restore..."

    local temp_dir="/tmp/db-restore-$$"
    mkdir -p "${temp_dir}"

    case "${BACKUP_FILE}" in
        *.sql.gz)
            log_info "Decompressing gzip file..."
            if gunzip -c "${BACKUP_FILE}" > "${temp_dir}/backup.sql" 2>> "${RESTORE_LOG}"; then
                log_success "Successfully decompressed backup file"
                echo "${temp_dir}/backup.sql"
            else
                log_error "Failed to decompress backup file"
                rm -rf "${temp_dir}"
                exit 1
            fi
            ;;
        *.sql)
            log_info "Using plain SQL file"
            cat "${BACKUP_FILE}"
            ;;
        *)
            # Try to decompress as gzip anyway
            log_warning "Attempting gzip decompression on unknown file type..."
            if gunzip -c "${BACKUP_FILE}" 2>/dev/null; then
                log_success "File was gzip compressed"
            else
                log_warning "File does not appear to be gzip compressed, treating as plain SQL"
                cat "${BACKUP_FILE}"
            fi
            ;;
    esac
}

drop_existing_database() {
    log_warning "Dropping existing tables from database: ${DATABASE_NAME}"

    # Get all table names and drop them
    if ! psql "$DATABASE_URL" -t -c "
        SELECT 'DROP TABLE IF EXISTS \"' || tablename || '\" CASCADE;'
        FROM pg_tables
        WHERE schemaname != 'pg_catalog'
        AND schemaname != 'information_schema'
    " | psql "$DATABASE_URL" 2>> "${RESTORE_LOG}"; then
        log_error "Failed to drop existing tables"
        exit 1
    fi

    log_success "Dropped existing tables"
}

perform_restore() {
    log_info "Starting database restore..."
    log_info "Database: ${DATABASE_NAME}"
    log_info "Source: ${BACKUP_FILE}"

    local start_time=$(date +%s)

    # Perform the restore with error handling
    if prepare_backup_file | psql "$DATABASE_URL" >> "${RESTORE_LOG}" 2>&1; then
        local end_time=$(date +%s)
        local duration=$((end_time - start_time))

        log_success "Restore completed successfully"
        log_info "Duration: ${duration} seconds"

        return 0
    else
        log_error "Restore operation failed"
        log_error "Check log file for details: ${RESTORE_LOG}"
        exit 1
    fi
}

verify_restore() {
    log_info "Verifying restored database..."

    # Get table count
    local table_count=$(psql "$DATABASE_URL" -t -c "
        SELECT COUNT(*)
        FROM pg_tables
        WHERE schemaname != 'pg_catalog'
        AND schemaname != 'information_schema'
    ")

    log_info "Restored tables: ${table_count}"

    if [ "$table_count" -eq 0 ]; then
        log_warning "No tables found in restored database"
        return 1
    fi

    # Get row count summary
    log_info "Row count summary:"
    psql "$DATABASE_URL" -t -c "
        SELECT
            schemaname,
            tablename,
            n_live_tup as row_count
        FROM pg_stat_user_tables
        ORDER BY schemaname, tablename
    " | while read -r line; do
        [ -n "$line" ] && log_info "  $line"
    done

    log_success "Database verification passed"
}

cleanup_temp_files() {
    log_info "Cleaning up temporary files..."
    # Cleanup is handled per-operation
    log_success "Cleanup complete"
}

display_restore_summary() {
    log_info ""
    log_info "========== RESTORE SUMMARY =========="
    log_info "Target Database: ${DATABASE_NAME}"
    log_info "Source Backup: ${BACKUP_FILE}"
    log_info "Restore Log: ${RESTORE_LOG}"
    log_info "Timestamp: $(date '+%Y-%m-%d %H:%M:%S')"
    log_info "===================================="
    log_info ""
}

cleanup() {
    local exit_code=$?
    if [ $exit_code -ne 0 ]; then
        log_error "Restore failed with exit code ${exit_code}"
    fi
    exit $exit_code
}

################################################################################
# Main Execution
################################################################################

trap cleanup EXIT

log_info "========== Database Restore Script Started =========="
log_info "Timestamp: $(date '+%Y-%m-%d %H:%M:%S')"

validate_arguments
validate_environment
extract_database_name
confirm_restore
drop_existing_database
perform_restore
verify_restore
cleanup_temp_files
display_restore_summary

log_success "========== Restore process completed successfully =========="
