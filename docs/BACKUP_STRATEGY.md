# Database Backup Strategy

## 1. Overview

**Purpose:** Automated daily backups with 30-day retention, point-in-time recovery capability for Aaron Pharrell's portfolio website database.

**Why:** 
- Data loss prevention from accidental deletions, corrupted data, or infrastructure failures
- Compliance with best practices for production systems
- Fast disaster recovery with minimal downtime
- Ability to recover to any point within the backup retention window

**Scope:** Full PostgreSQL database including complete schema, all data tables, indexes, sequences, and relationships. Backups are created from the Neon serverless PostgreSQL database.

---

## 2. Backup Methods (Two-Tier Strategy)

### Method 1: Manual pg_dump Backups

**When:** On-demand or scheduled via cron/GitHub Actions for daily automated backups.

**Tool:** `pg_dump` + gzip compression

**Location:** `./backups/` directory locally, then pushed to cloud storage (S3/GCS).

**Retention:** 30-day rolling window (oldest backups auto-deleted by backup script).

**Script:** `scripts/backup-db.sh`

**Command Examples:**
```bash
# Basic usage (backups to ./backups/)
bash scripts/backup-db.sh

# Custom backup path
bash scripts/backup-db.sh /custom/path/to/backups

# Verify backup was created
ls -lh ./backups/
```

**Backup Characteristics:**
- Full database dump including schema and data
- Compressed with gzip (reduces size by 70-90%)
- Timestamped filename: `backup-YYYY-MM-DD-HH-MM-SS.sql.gz`
- Includes comprehensive logging to `backups/backup.log`
- Automatic cleanup of backups older than 30 days

**Advantages:**
- Complete point-in-time recovery to specific timestamp
- Portable across different PostgreSQL versions
- Human-readable format (can inspect raw SQL if needed)
- Works with any PostgreSQL instance

**Limitations:**
- Requires manual scheduling or external automation
- Larger file size before compression
- Slower restore process than incremental backups

---

### Method 2: Neon Point-in-Time Recovery (PITR)

**What:** Neon provides automatic hourly backups of the PostgreSQL database without manual setup.

**Access:** Neon Dashboard → [Your Database] → Backups section

**Retention:** 7 days default retention period (depends on Neon plan tier).
- Free tier: 3 days
- Pro tier: 7 days (recommended)
- Enterprise: Custom retention policies available

**Setup Required:** None—automatically enabled with Neon PostgreSQL.

**Steps to Recover Using PITR:**

1. **Open Neon Dashboard**
   - Navigate to https://console.neon.tech
   - Select your project

2. **Access Backups Section**
   - Click on your database branch
   - Go to "Backups" tab

3. **Select Recovery Point**
   - View timeline of available backup snapshots
   - Click on desired timestamp
   - Review the recovery preview

4. **Initiate Restore**
   - Click "Restore" button
   - Neon creates new database branch with restored data
   - Original database remains unchanged

5. **Update Connection**
   - Get new connection string from restored branch
   - Update `DATABASE_URL` in `.env` or environment variables
   - Test application connectivity

**Advantages:**
- Zero setup—built into Neon infrastructure
- Very fast recovery (minutes)
- Granular hour-by-hour recovery points
- No additional cost with Neon
- Works across infrastructure failures

**Limitations:**
- 7-day retention window (shorter than pg_dump backups)
- Recovery creates new branch, requires connection string update
- Dependent on Neon service availability

---

## 3. Automated Backup Scheduling

### Option A: GitHub Actions (Recommended for Cloud-Hosted Projects)

**Advantages:** No local infrastructure needed, integrated with git workflow, automatic uploads to cloud.

**Setup:**

Create `.github/workflows/backup-db.yml`:

```yaml
name: Daily Database Backup

on:
  schedule:
    - cron: '0 2 * * *'  # 2 AM UTC daily (adjust timezone if needed)
  workflow_dispatch:     # Allow manual trigger from GitHub UI

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run backup
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: |
          bash scripts/backup-db.sh
          echo "Backup completed at $(date)"

      - name: Upload to S3
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: us-east-1
        run: |
          # Install AWS CLI if not available
          if ! command -v aws &> /dev/null; then
            apt-get update && apt-get install -y awscli
          fi

          # Ensure backups directory exists
          mkdir -p backups
          aws s3 cp backups/ s3://your-bucket/backups/ --recursive \
            --sse AES256 --exclude "*" --include "backup-*.sql.gz"

      - name: Cleanup old local backups
        run: |
          find ./backups -name "backup-*.sql.gz" -mtime +30 -delete

      - name: Notify on failure
        if: failure()
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: 'Database backup failed! Check workflow logs.'
            })
```

**SECURITY WARNING:** GitHub Actions automatically masks secrets in logs. However, ensure:
- Never commit AWS credentials to the repository
- Rotate AWS access keys regularly
- Use least-privilege IAM policy (S3 bucket write access only)
- Enable CloudTrail logging for backup operations

**GitHub Secrets Setup:**

1. Go to repository Settings → Secrets and variables → Actions
2. Add these secrets:
   - `DATABASE_URL`: Your Neon database connection string
   - `AWS_ACCESS_KEY_ID`: AWS IAM user access key
   - `AWS_SECRET_ACCESS_KEY`: AWS IAM user secret key

**Manual Trigger:**
- Go to Actions tab
- Select "Daily Database Backup" workflow
- Click "Run workflow"

---

### Option B: Local Cron Job (For Development/Testing)

**When to use:** Development machine, testing, or if you want backups before GitHub Actions deployment.

**Setup:**

1. Open crontab editor:
   ```bash
   crontab -e
   ```

2. Add this line (2 AM daily):
   ```cron
   0 2 * * * cd /path/to/project && bash scripts/backup-db.sh && aws s3 sync ./backups s3://aaron-portfolio-backups/ --delete --sse AES256
   ```

3. Verify cron job:
   ```bash
   crontab -l
   ```

**Environment Setup:**
- Ensure `DATABASE_URL` is in `.env` file in project directory
- AWS CLI must be installed and configured: `aws configure`
- Script must have execute permissions: `chmod +x scripts/backup-db.sh`

**View Cron Logs:**
```bash
# macOS
log stream --predicate 'process == "cron"' --level debug

# Linux
grep CRON /var/log/syslog

# Docker container
docker exec <container> cat /var/log/cron
```

---

## 4. Cloud Storage Integration

### AWS S3 Setup (Recommended)

**Why S3:** Industry standard, cost-effective, highly available, excellent for long-term storage.

**Step 1: Create S3 Bucket**
```bash
aws s3 mb s3://aaron-portfolio-backups --region us-east-1
```

**Step 2: Enable Versioning**
- Provides recovery from accidental deletes
- Allows recovery to previous backup versions

```bash
aws s3api put-bucket-versioning \
  --bucket aaron-portfolio-backups \
  --versioning-configuration Status=Enabled
```

**Step 3: Set Lifecycle Policy (Auto-Delete Old Backups)**

Create file `lifecycle-policy.json`:
```json
{
  "Rules": [
    {
      "ID": "DeleteOldBackups",
      "Status": "Enabled",
      "Filter": {
        "Prefix": ""
      },
      "Expiration": {
        "Days": 30
      },
      "NoncurrentVersionExpiration": {
        "NoncurrentDays": 30
      }
    }
  ]
}
```

Apply policy:
```bash
aws s3api put-bucket-lifecycle-configuration \
  --bucket aaron-portfolio-backups \
  --lifecycle-configuration file://lifecycle-policy.json
```

**Step 4: Enable Encryption**

```bash
aws s3api put-bucket-encryption \
  --bucket aaron-portfolio-backups \
  --server-side-encryption-configuration '{
    "Rules": [
      {
        "ApplyServerSideEncryptionByDefault": {
          "SSEAlgorithm": "AES256"
        }
      }
    ]
  }'
```

**Step 5: Create IAM User for Backups (Least Privilege)**

Create restricted IAM user with S3-only access:

```bash
# Create user
aws iam create-user --user-name backup-user

# Create access keys
aws iam create-access-key --user-name backup-user

# Save the output with Access Key ID and Secret Key

# Create inline policy
cat > /tmp/backup-policy.json << 'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::aaron-portfolio-backups",
        "arn:aws:s3:::aaron-portfolio-backups/*"
      ]
    }
  ]
}
EOF

# Attach policy
aws iam put-user-policy \
  --user-name backup-user \
  --policy-name BackupPolicy \
  --policy-document file:///tmp/backup-policy.json
```

**Step 6: Add Credentials to GitHub Secrets**

Use the credentials from step 5:
- Go to repo Settings → Secrets and variables → Actions
- Add `AWS_ACCESS_KEY_ID`
- Add `AWS_SECRET_ACCESS_KEY`

**Manual Upload to S3:**
```bash
# Upload single backup
aws s3 cp backups/backup-2026-06-12-14-30-45.sql.gz \
  s3://aaron-portfolio-backups/ \
  --sse AES256

# Sync entire backups directory
aws s3 sync ./backups s3://aaron-portfolio-backups/ \
  --sse AES256 \
  --exclude "*" \
  --include "backup-*.sql.gz"
```

---

### Alternative: Google Cloud Storage

**Setup (if preferred over AWS):**

```bash
# Create bucket
gsutil mb -l us gs://aaron-portfolio-backups

# Enable versioning
gsutil versioning set on gs://aaron-portfolio-backups

# Upload backup
gsutil cp backups/backup-2026-06-12-14-30-45.sql.gz \
  gs://aaron-portfolio-backups/

# Set lifecycle (delete after 30 days)
cat > /tmp/lifecycle.json << 'EOF'
{
  "lifecycle": {
    "rule": [
      {
        "action": {"type": "Delete"},
        "condition": {"age": 30}
      }
    ]
  }
}
EOF

gsutil lifecycle set /tmp/lifecycle.json gs://aaron-portfolio-backups
```

---

## 5. Restoration Procedures

### From Local Backup File

**Quickest recovery for recent issues:**

```bash
# List available backups
ls -lh ./backups/backup-*.sql.gz

# Restore from specific backup
bash scripts/restore-db.sh ./backups/backup-2026-06-12-14-30-45.sql.gz

# Restore with custom database name
bash scripts/restore-db.sh ./backups/backup-2026-06-12-14-30-45.sql.gz mydbname
```

**The restore script will:**
1. Validate backup file integrity
2. Display confirmation prompt (requires user confirmation)
3. Drop existing tables (with warning)
4. Restore data from backup
5. Verify restoration success
6. Log all operations to `restore-YYYY-MM-DD-HH-MM-SS.log`

---

### From Neon Point-in-Time Recovery

**Fastest recovery with zero data loss risk:**

1. **Go to Neon Dashboard**
   ```
   https://console.neon.tech/app/projects
   ```

2. **Select Your Project and Database**
   - Click project name
   - Click branch name

3. **Open Backups Tab**
   - Look for "Backups" or "Point-in-Time Recovery" section
   - Review available recovery points (up to 7 days)

4. **Select Recovery Timestamp**
   - Choose the point-in-time just before data loss occurred
   - View preview of recovery point

5. **Click Restore**
   - Neon creates new database branch: `main-restored-<timestamp>`
   - Original branch remains unchanged
   - Wait 2-5 minutes for restoration

6. **Update Connection String**
   - New branch has new connection endpoint
   - Get it from Neon Dashboard → Branch → Connection string
   - Update `DATABASE_URL` in `.env` and application config

7. **Test Application**
   - Verify app connects to restored database
   - Check data integrity
   - If successful, can optionally delete old branch

**Advantages of PITR:**
- Safest option—original data untouched
- No download or restore time
- Can easily rollback if needed

---

### From Cloud Storage (S3/GCS)

**For recovery from multiple geographic locations or long-term storage:**

**From AWS S3:**
```bash
# List available backups
aws s3 ls s3://aaron-portfolio-backups/ --human-readable

# Download specific backup
aws s3 cp s3://aaron-portfolio-backups/backup-2026-06-12-14-30-45.sql.gz ./

# Download latest backup
aws s3 cp s3://aaron-portfolio-backups/ ./ \
  --recursive \
  --exclude "*" \
  --include "backup-*.sql.gz"

# Then restore
bash scripts/restore-db.sh ./backup-2026-06-12-14-30-45.sql.gz
```

**From Google Cloud Storage:**
```bash
# Download backup
gsutil cp gs://aaron-portfolio-backups/backup-2026-06-12-14-30-45.sql.gz ./

# Restore
bash scripts/restore-db.sh ./backup-2026-06-12-14-30-45.sql.gz
```

---

## 6. Testing & Verification

### Monthly Backup Integrity Test

Run this monthly to ensure backups are valid and restorable:

**Checklist:**
- [ ] Select a random backup file from cloud storage
- [ ] Download it to local machine: `aws s3 cp s3://bucket/backup.sql.gz ./test-backup.sql.gz`
- [ ] Restore to test database: `bash scripts/restore-db.sh ./test-backup.sql.gz test_db`
- [ ] Verify data integrity with queries below
- [ ] Delete test database when confirmed working
- [ ] Document test completion in BACKUP_TEST_LOG.txt

**Data Integrity Verification Queries:**

```sql
-- Count tables
SELECT COUNT(*) as table_count
FROM pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema');

-- Check row counts by table
SELECT
  schemaname,
  tablename,
  n_live_tup as row_count
FROM pg_stat_user_tables
ORDER BY schemaname, tablename;

-- Verify schema integrity
SELECT
  table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_schema NOT IN ('pg_catalog', 'information_schema')
ORDER BY table_name, ordinal_position;

-- Check for missing sequences
SELECT * FROM pg_sequences;

-- Verify constraints
SELECT
  constraint_name,
  table_name,
  constraint_type
FROM information_schema.table_constraints
WHERE table_schema NOT IN ('pg_catalog', 'information_schema')
ORDER BY table_name;
```

**Test Script** (save as `test-backup.sh`):
```bash
#!/bin/bash

echo "Starting backup integrity test..."
TEST_DB="test_backup_$(date +%s)"

# Extract database name from first backup found
BACKUP_FILE=$(ls -t ./backups/backup-*.sql.gz | head -1)

if [ -z "$BACKUP_FILE" ]; then
  echo "No backup files found"
  exit 1
fi

echo "Testing backup: $BACKUP_FILE"
echo "Test database: $TEST_DB"

# Restore to test database
bash scripts/restore-db.sh "$BACKUP_FILE" "$TEST_DB"

if [ $? -eq 0 ]; then
  echo "✓ Restore successful"
  echo "Test database is ready at: $TEST_DB"
  echo "Run queries to verify data integrity"
  echo ""
  echo "When done, delete with:"
  echo "  dropdb $TEST_DB"
else
  echo "✗ Restore failed"
  exit 1
fi
```

---

### Neon PITR Verification

Test once per month:

1. **Access Neon Dashboard**
2. **Trigger Restore** to any point in last 7 days
3. **Verify database** is accessible and contains expected data
4. **Check timestamp** accuracy matches selected recovery point
5. **Delete test branch** when confirmed
6. **Document** in log: date tested, result, any issues

---

## 7. Disaster Recovery Checklist

**Use this checklist when database is corrupted, lost, or inaccessible:**

### Step 1: Assess Damage Scope
- [ ] Confirm database is truly inaccessible
- [ ] Check if specific tables are corrupted or entire database
- [ ] Review error logs for root cause
- [ ] Notify stakeholders of incident
- [ ] Document timeline: when issue detected, when noticed, estimated data loss window

### Step 2: Try Neon Point-in-Time Recovery First (Fastest)
- [ ] Go to Neon Dashboard
- [ ] Check backup availability (within 7 days)
- [ ] Select recovery point just before corruption detected
- [ ] Click Restore
- [ ] Verify new branch created successfully
- [ ] Update DATABASE_URL to restored branch
- [ ] Test application connectivity
- [ ] If successful, can keep both branches for safety
- [ ] If failed, proceed to Step 3

### Step 3: Restore From pg_dump Backup
- [ ] Identify latest valid backup file from `./backups/`
- [ ] If not available locally, download from cloud: `aws s3 cp s3://bucket/backup.sql.gz ./`
- [ ] Run restore: `bash scripts/restore-db.sh backup.sql.gz`
- [ ] Verify data integrity with queries from Section 6
- [ ] Check row counts match expected values
- [ ] Test critical application features

### Step 4: Recover From Cloud Storage (Last Resort)
- [ ] If local backups lost, download from S3/GCS
- [ ] Verify checksum if available
- [ ] Proceed with restore steps

### Step 5: Validation & Testing
- [ ] Run schema integrity checks
- [ ] Execute application test suite
- [ ] Verify all users can access their data
- [ ] Check for data consistency
- [ ] Monitor for errors in application logs

### Step 6: Post-Recovery Actions
- [ ] Document incident details
- [ ] Root cause analysis
- [ ] Identify prevention strategies
- [ ] Update documentation
- [ ] Communication to stakeholders
- [ ] Schedule backup integrity test

---

## 8. Environment Setup

### Required Environment Variables

Create or update `.env` with:

```bash
# Database Connection (from Neon)
DATABASE_URL=postgresql://user:password@db.neon.tech:5432/neondb?sslmode=require

# AWS Credentials (for S3 backups)
AWS_ACCESS_KEY_ID=your-iam-access-key-here
AWS_SECRET_ACCESS_KEY=your-iam-secret-key-here
AWS_REGION=us-east-1

# AWS Settings
AWS_S3_BUCKET=aaron-portfolio-backups
AWS_S3_BACKUP_PATH=backups/

# Backup Settings
BACKUP_RETENTION_DAYS=30
BACKUP_SCHEDULE_CRON="0 2 * * *"  # 2 AM UTC daily
```

### Required Tools

Ensure these are installed:

```bash
# PostgreSQL client tools
# macOS
brew install postgresql

# Ubuntu/Debian
apt install postgresql-client

# Windows - Download from:
https://www.postgresql.org/download/windows/

# AWS CLI (for S3 uploads)
# macOS
brew install awscli

# Ubuntu/Debian
apt install awscli

# Windows / All platforms
pip install awscli
```

### Verify Installation

```bash
# Check pg_dump
pg_dump --version

# Check psql
psql --version

# Check gzip
gzip --version

# Check AWS CLI
aws --version
```

---

## 9. Maintenance Schedule

| Frequency | Task | Owner | Notes |
|-----------|------|-------|-------|
| Daily | Automated backup via GitHub Actions | System | Set cron to 2 AM UTC or desired time |
| Weekly | Verify latest backup exists | DevOps | Check S3 bucket and local backups directory |
| Weekly | Monitor backup logs | DevOps | Check `backups/backup.log` for errors |
| Monthly | Full restoration test | QA/DevOps | Test with random backup to staging DB |
| Monthly | Neon PITR test | QA/DevOps | Verify point-in-time restore functionality |
| Quarterly | Review & update procedures | DevOps | Ensure documentation reflects current setup |
| Annually | Audit cloud storage costs | Finance/DevOps | Review S3 usage and optimize |

### Automated Daily Maintenance

The `scripts/backup-db.sh` script automatically handles:
- Creating backup with current timestamp
- Compressing with gzip
- Logging all operations
- **Deleting backups older than 30 days**

No manual cleanup needed for local backups. Cloud storage cleanup is handled by S3 lifecycle policies.

---

## 10. Troubleshooting

### Issue: "pg_dump: command not found"

**Cause:** PostgreSQL client tools not installed.

**Solution:**
```bash
# macOS
brew install postgresql

# Ubuntu/Debian
apt update && apt install postgresql-client

# Windows
# Download from https://www.postgresql.org/download/windows/
# Add PostgreSQL bin directory to PATH
```

---

### Issue: "FATAL: remaining connection slots are reserved"

**Cause:** Neon maximum connections reached.

**Solution:**
```bash
# Neon has limited connections per plan tier
# Option 1: Use PgBouncer connection pooling
# Option 2: Close other connections
# Option 3: Upgrade Neon plan

# Check active connections
SELECT count(*) FROM pg_stat_activity;

# Kill idle connections (use carefully)
SELECT pg_terminate_backend(pid) 
FROM pg_stat_activity 
WHERE state = 'idle'
AND query_start < now() - interval '1 hour';
```

---

### Issue: Backup file is too large (>1GB)

**Cause:** Large tables or many records.

**Solution:**
```bash
# Schema-only backup (no data)
pg_dump "$DATABASE_URL" -s --compress=9 -f schema-only.sql.gz

# Exclude large tables
pg_dump "$DATABASE_URL" -T table_name_pattern \
  | gzip > backup.sql.gz

# Backup specific schema
pg_dump "$DATABASE_URL" -n schema_name \
  | gzip > schema-backup.sql.gz
```

---

### Issue: "Permission denied" when uploading to S3

**Cause:** AWS IAM user lacks S3 permissions or invalid credentials.

**Solution:**
```bash
# Verify credentials
aws sts get-caller-identity

# Check S3 bucket permissions
aws s3api get-bucket-acl --bucket aaron-portfolio-backups

# Update IAM policy with proper permissions (see Section 4)
```

---

### Issue: Restore fails with "column reference is ambiguous"

**Cause:** Schema version mismatch between backup and target database.

**Solution:**
```bash
# Use plain format restore instead of binary
pg_restore -F plain backup.dump | psql "$DATABASE_URL"

# Or drop and recreate database
dropdb "$DATABASE_URL"
createdb "$DATABASE_URL"
psql "$DATABASE_URL" < backup.sql
```

---

### Issue: Backup script times out

**Cause:** Very large database or slow network connection.

**Solution:**
```bash
# Increase timeout in GitHub Actions
timeout: 3600  # seconds

# For local backups, run during off-peak hours
# Adjust cron: 0 3 * * * (3 AM instead of 2 AM)

# Or split into multiple backups
pg_dump "$DATABASE_URL" -t table_name1 | gzip > backup-t1.sql.gz
pg_dump "$DATABASE_URL" -t table_name2 | gzip > backup-t2.sql.gz
```

---

### Issue: "gzip: unexpected end of file"

**Cause:** Corrupted or incomplete backup file.

**Solution:**
```bash
# Verify file integrity
gzip -t backup-file.sql.gz

# Download fresh copy from S3
aws s3 cp s3://bucket/backup-*.sql.gz ./

# If all backups corrupted, use Neon PITR
```

---

### Issue: Restored database different from original

**Cause:** Restore from wrong backup point, or ongoing transactions during backup.

**Solution:**
```bash
# Compare row counts
SELECT schemaname, tablename, n_live_tup
FROM pg_stat_user_tables
ORDER BY tablename;

# Compare on both databases to find discrepancies

# Use backup from earlier timestamp if needed
```

---

## Quick Reference Commands

```bash
# Create backup immediately
bash scripts/backup-db.sh

# Create backup with custom location
bash scripts/backup-db.sh /var/backups/db

# List all backups
ls -lh ./backups/backup-*.sql.gz

# Restore from backup (interactive)
bash scripts/restore-db.sh ./backups/backup-2026-06-12-14-30-45.sql.gz

# Download from S3
aws s3 cp s3://aaron-portfolio-backups/backup-2026-06-12-14-30-45.sql.gz ./

# Upload to S3
aws s3 sync ./backups s3://aaron-portfolio-backups/ --sse AES256

# Check backup size
du -h ./backups/

# View backup logs
tail -f ./backups/backup.log

# Test backup integrity
bash test-backup.sh

# View Neon backups
# https://console.neon.tech → Select Project → Backups tab
```

---

## References

- [Neon Backups Documentation](https://neon.tech/docs/manage/backups)
- [PostgreSQL pg_dump Manual](https://www.postgresql.org/docs/current/app-pgdump.html)
- [PostgreSQL Recovery Documentation](https://www.postgresql.org/docs/current/continuous-archiving.html)
- [AWS S3 Lifecycle Policies](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Last Updated:** 2026-06-12
**Maintained By:** Aaron Pharrell Mugumya
**Status:** Active

For questions or improvements, create an issue or contact the development team.
