#!/bin/bash

################################################################################
# Database Backup Script
#
# Purpose: Automated PostgreSQL database backup with gzip compression
# Usage: bash scripts/backup-db.sh [optional-backup-path]
#
# Requirements:
#   - PostgreSQL client tools (pg_dump)
#   - DATABASE_URL environment variable
#   - Write permissions to backup directory
#
# Example:
#   bash scripts/backup-db.sh
#   bash scripts/backup-db.sh /custom/backup/path
################################################################################

set -euo pipefail

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BACKUP_DIR="${1:-./-backups}"
TIMESTAMP=$(date +%Y-%m-%d-%H-%M-%S)
BACKUP_FILE="backup-${TIMESTAMP}.sql.gz"
BACKUP_PATH="${BACKUP_DIR}/${BACKUP_FILE}"
LOG_FILE="${BACKUP_DIR}/backup.log"

################################################################################
# Functions
################################################################################

log() {
    local level="$1"
    shift
    local message="$@"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[${timestamp}] [${level}] ${message}" | tee -a "${LOG_FILE}"
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

cleanup() {
    local exit_code=$?
    if [ $exit_code -ne 0 ]; then
        log_error "Backup failed with exit code ${exit_code}"
        # Remove incomplete backup file if it exists
        if [ -f "${BACKUP_PATH}" ]; then
            rm -f "${BACKUP_PATH}"
            log_info "Cleaned up incomplete backup file"
        fi
    fi
    exit $exit_code
}

validate_environment() {
    log_info "Validating environment..."

    # Check if DATABASE_URL is set
    if [ -z "${DATABASE_URL:-}" ]; then
        log_error "DATABASE_URL environment variable is not set"
        exit 1
    fi

    log_info "DATABASE_URL is configured"

    # Check if pg_dump is available
    if ! command -v pg_dump &> /dev/null; then
        log_error "pg_dump command not found. Please install PostgreSQL client tools."
        echo "  macOS: brew install postgresql"
        echo "  Ubuntu/Debian: apt install postgresql-client"
        echo "  Windows: Download PostgreSQL installer from https://www.postgresql.org/download/windows/"
        exit 1
    fi

    log_info "pg_dump is available"

    # Check if gzip is available
    if ! command -v gzip &> /dev/null; then
        log_error "gzip command not found"
        exit 1
    fi

    log_info "gzip is available"
}

create_backup_directory() {
    log_info "Setting up backup directory: ${BACKUP_DIR}"

    if [ ! -d "${BACKUP_DIR}" ]; then
        mkdir -p "${BACKUP_DIR}"
        log_success "Created backup directory"
    else
        log_info "Backup directory already exists"
    fi

    # Verify write permissions
    if [ ! -w "${BACKUP_DIR}" ]; then
        log_error "No write permissions to backup directory: ${BACKUP_DIR}"
        exit 1
    fi

    log_info "Backup directory is writable"
}

calculate_directory_size() {
    local dir="$1"
    if command -v du &> /dev/null; then
        du -sh "${dir}" | awk '{print $1}'
    else
        echo "unknown"
    fi
}

perform_backup() {
    log_info "Starting database backup..."
    log_info "Output file: ${BACKUP_PATH}"

    local temp_file="${BACKUP_PATH}.tmp"
    local start_time=$(date +%s)

    # Perform the backup with error handling
    if pg_dump "$DATABASE_URL" | gzip > "${temp_file}" 2>> "${LOG_FILE}"; then
        # Rename temp file to final destination
        mv "${temp_file}" "${BACKUP_PATH}"

        local end_time=$(date +%s)
        local duration=$((end_time - start_time))
        local file_size=$(du -h "${BACKUP_PATH}" | awk '{print $1}')

        log_success "Backup completed successfully"
        log_info "File: ${BACKUP_FILE}"
        log_info "Size: ${file_size}"
        log_info "Duration: ${duration} seconds"

        return 0
    else
        log_error "pg_dump or gzip operation failed"

        # Clean up temp file
        if [ -f "${temp_file}" ]; then
            rm -f "${temp_file}"
        fi

        exit 1
    fi
}

cleanup_old_backups() {
    log_info "Cleaning up backups older than 30 days..."

    local deleted_count=0
    local total_freed=0

    # Find and delete backups older than 30 days
    while IFS= read -r old_file; do
        if [ -f "${old_file}" ]; then
            local file_size=$(du -h "${old_file}" | awk '{print $1}')
            rm -f "${old_file}"
            log_info "Deleted old backup: $(basename "${old_file}") (${file_size})"
            ((deleted_count++))
        fi
    done < <(find "${BACKUP_DIR}" -name "backup-*.sql.gz" -type f -mtime +30)

    if [ $deleted_count -gt 0 ]; then
        log_info "Removed ${deleted_count} old backup file(s)"
    else
        log_info "No old backups to remove"
    fi
}

display_backup_summary() {
    log_info ""
    log_info "========== BACKUP SUMMARY =========="
    log_info "Backup Directory: ${BACKUP_DIR}"
    log_info "Total backups: $(find "${BACKUP_DIR}" -name "backup-*.sql.gz" -type f | wc -l)"
    log_info "Total size: $(calculate_directory_size "${BACKUP_DIR}")"
    log_info "Log file: ${LOG_FILE}"
    log_info "===================================="
    log_info ""
}

################################################################################
# Main Execution
################################################################################

trap cleanup EXIT

log_info "========== Database Backup Script Started =========="
log_info "Timestamp: $(date '+%Y-%m-%d %H:%M:%S')"

validate_environment
create_backup_directory
perform_backup
cleanup_old_backups
display_backup_summary

log_success "========== Backup process completed successfully =========="
