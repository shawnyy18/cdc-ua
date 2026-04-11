# System Maintenance & Backup Plan — EcoKonek PH

This document describes the proactive maintenance, backup, and security-audit policies for EcoKonek PH. It is written to align with the project's stack (Next.js frontend on Vercel, Supabase PostgreSQL backend with RLS, and cloud AI integrations).

## 1. Scope and Objectives

- Keep the platform secure, available, and recoverable.
- Maintain data integrity and ensure fast recovery (measured via RPO/RTO).
- Ensure compliance with data protection expectations for users in the Philippines.

Target service level objectives (SLOs):

- Recovery Point Objective (RPO): 24 hours (daily backups) for primary data; critical records daily with hourly transaction log capture where possible.
- Recovery Time Objective (RTO): 4 hours for service restoration to a working staging/production-like state; critical user-facing flows (auth, donation submission) restored within 1 hour where possible.

## 2. Routine Maintenance

Cadence:

- Monthly: dependency updates, minor refactors, library upgrades, CI test runs, and vulnerability scans via automated tools (e.g., Dependabot, GitHub Actions with `npm audit` or `snyk`).
- Immediately: patch and deploy critical security fixes (CVEs) as they are discovered.
- Quarterly: deeper code reviews and end-to-end testing against staging.

Process:

1. Create a feature branch and run full test suite (unit + integration + lint/type checks).
2. Open PR with changelog and security rationale for dependency bumps.
3. Run preview deployment and smoke tests on Vercel preview environment.
4. Merge to main only after automated checks pass and one reviewer approves.
5. Monitor production post-deploy for 24–48 hours for regressions.

Tools and checks:

- Dependency scanning: Dependabot / Snyk
- Static analysis: ESLint, TypeScript --noEmit
- CI: GitHub Actions or Vercel built-in pipelines
- Monitoring: Vercel Analytics, Supabase logs, Sentry (error aggregation)

## 3. Data Backup and Recovery

Note: EcoKonek uses Supabase (managed PostgreSQL) — not a NoSQL DB. This plan reflects Postgres characteristics (logical dumps, WAL / PITR where supported, and vendor-managed backups).

Daily Backup Strategy:

- Primary: Supabase automated daily backups (managed by Supabase). Confirm backup retention window and export schedule for your project plan.
- Secondary (geo-redundant export): A nightly exported copy of the database (logical dump) will be uploaded to an external object store in a different cloud/region (e.g., AWS S3, GCS) to provide extra geographic redundancy.
- Retention: Keep 30 days of daily backups, plus monthly snapshots for 12 months.

Sample export (safe to run from a secure CI runner or admin machine):

```bash
# Example using pg_dump (replace placeholders)
PGHOST=<supabase-db-host>
PGPORT=<port>
PGUSER=<db_user_or_service_role>
PGPASSWORD=<db_password>
PGDATABASE=<database_name>

# Dump schema + data
pg_dump --format=custom --file=backup-$(date +%F).dump --no-owner --no-acl -h $PGHOST -p $PGPORT -U $PGUSER $PGDATABASE

# Upload to S3 (example)
aws s3 cp backup-$(date +%F).dump s3://your-backup-bucket/eco-konek/$(date +%F)/ --storage-class STANDARD_IA
```

If relying on Supabase built-in export/backup APIs or the Supabase CLI, adapt the above to use the service role key stored securely in CI (never expose in repo). Example placeholder with Supabase CLI:

```bash
# Supabase CLI (example; adapt to your version and auth flow)
supabase db dump --project-ref yxoxxrbukjyioyfveaml --file backup-$(date +%F).dump
aws s3 cp backup-$(date +%F).dump s3://your-backup-bucket/eco-konek/$(date +%F)/
```

Encryption & Security:

- Backup files must be encrypted at rest in the object store (SSE-KMS or equivalent).
- Access to backup storage is restricted via IAM roles and a minimal set of service accounts.
- Service role keys and DB credentials used for automated backups are stored as secrets in Vercel/GitHub Actions and rotated every 90 days.

Restore Testing (periodic validation):

- Quarterly: perform a restore to a staging environment from a random backup snapshot and run critical end-to-end tests (auth, donation submission, community post creation).
- Document and timestamp each successful restore test; failures are treated as high-priority incidents.

## 4. Security Audits

Cadence and scope:

- Weekly: automated dependency vulnerability scanning (low-effort, continuous).
- Quarterly: manual security audit covering:
  - Application code review (focus on auth flows, RLS enforcement, input validation).
  - Infrastructure review (Vercel project settings, DNS, Supabase API keys & policies, cloud storage permissions).
  - Penetration testing for public endpoints (annually or after major releases).

Deliverables:

- Formal report with prioritized findings and remediation tasks.
- Action items assigned in the project tracker with SLA for fixes.

Key checks:

- Verify Row Level Security (RLS) policies are enforced for sensitive tables (`auth.uid() = user_id` rules).
- Confirm CORS & redirect URLs in Supabase match production domain(s).
- Secrets audit: ensure no secret values in the repository.
- CI/CD pipeline security: ensure PR previews sanitize secrets and that production secrets are not used in preview builds.

## 5. Monitoring, Alerting & Incident Response

Monitoring:

- Track errors and performance in Sentry (or equivalent) and Vercel Analytics.
- Database health: Supabase metrics and slow-query logging.
- Chatbot: quota/latency reporting for Google AI requests.

Alerting:

- Critical alerts (production down, DB unavailable, backup failures): notify on-call via Slack/email and open an incident ticket.
- Non-critical alerts (increased error rates, slow queries): notify team and create follow-up tasks.

Incident Response & Runbook (summary):

1. Triage: collect logs (Vercel, Supabase, Sentry), identify scope and severity.
2. Containment: rollback recent deploy if needed; disable problematic features.
3. Recovery: restore DB from backup to a staging instance if data corruption suspected; apply fixes.
4. Postmortem: document root cause, timeline, and corrective actions. Share with stakeholders.

## 6. Roles & Responsibilities

- Engineering Lead: approves emergency patches and coordinates on-call response.
- DevOps/Platform (can be the engineering lead for small teams): manages backups, encryption keys, and restore tests.
- QA: runs periodic restore validation tests and confirms feature behavior after restores.
- Security Officer (or responsible engineer): schedules and reviews security audits.

## 7. Compliance & Data Retention

- Retention policy: default 24 months for user-generated content unless a legal/compliance requirement dictates otherwise.
- Right to be forgotten: use Supabase deletion APIs and ensure backups are purged in accordance with the retention schedule.
- Data transfer: transfers to geo-redundant backups must comply with local data protection regulations; document transfer locations.

## 8. Automation & CI Integration

- Add a nightly GitHub Action or CI runner job performing the backup + upload.
- Add a quarterly restore validation job that runs in a secure environment and reports success/failure.

Sample GitHub Actions job (skeleton):

```yaml
name: nightly-backup
on:
  schedule:
    - cron: '0 2 * * *' # daily at 02:00 UTC

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Install pg tools
        run: sudo apt-get update && sudo apt-get install -y postgresql

      - name: Run pg_dump
        env:
          PGPASSWORD: ${{ secrets.BACKUP_DB_PASSWORD }}
        run: |
          pg_dump --format=custom --file=backup-$(date +%F).dump -h ${{ secrets.BACKUP_DB_HOST }} -p ${{ secrets.BACKUP_DB_PORT }} -U ${{ secrets.BACKUP_DB_USER }} ${{ secrets.BACKUP_DB_NAME }}

      - name: Upload to S3
        uses: jakejarvis/s3-sync-action@v0.5.1
        with:
          args: --acl private --follow-symlinks
        env:
          AWS_S3_BUCKET: ${{ secrets.BACKUP_S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.BACKUP_AWS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.BACKUP_AWS_SECRET }}

      - name: Notify
        run: echo "Backup complete: $(date)"
```

Secrets used in CI (store securely):

- BACKUP_DB_HOST, BACKUP_DB_PORT, BACKUP_DB_USER, BACKUP_DB_PASSWORD, BACKUP_DB_NAME
- BACKUP_S3_BUCKET, BACKUP_AWS_KEY_ID, BACKUP_AWS_SECRET

## 9. Appendix: Quick checklist

- [ ] Confirm Supabase daily backups and retention window
- [ ] Create geo-redundant export job to S3/GCS
- [ ] Encrypt backup artifacts and restrict access
- [ ] Add scheduled restore validation to CI
- [ ] Set up weekly dependency scans and quarterly manual audits
- [ ] Rotate service account keys every 90 days
- [ ] Document and test incident runbook

---

_Document created: October 26, 2025_
