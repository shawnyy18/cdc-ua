#!/usr/bin/env bash
set -euo pipefail

# Simple helper to add or replace OPENAI_API_KEY in .env.local (local only).
# Usage: bash scripts/add_openai_key.sh
# This script does NOT send your key anywhere. It writes to a local file and
# creates a timestamped backup.

ENVFILE=".env.local"

echo "This script will add or update OPENAI_API_KEY in $ENVFILE"
read -s -p "Paste your OPENAI_API_KEY (input hidden): " KEY
echo

if [ -z "$KEY" ]; then
  echo "No key provided — aborting." >&2
  exit 1
fi

# Ensure file exists
if [ ! -f "$ENVFILE" ]; then
  echo "# Local environment file" > "$ENVFILE"
fi

# Backup
BACKUP="${ENVFILE}.bak.$(date +%s)"
cp "$ENVFILE" "$BACKUP"
echo "Backup saved to $BACKUP"

# Replace or append the OPENAI_API_KEY line. Use a safe temp file for macOS compatibility.
if grep -q '^OPENAI_API_KEY=' "$ENVFILE" 2>/dev/null; then
  awk -v key="$KEY" 'BEGIN{OFS=FS="="} /^OPENAI_API_KEY=/{print $1"="key; next} {print}' "$ENVFILE" > "${ENVFILE}.tmp" && mv "${ENVFILE}.tmp" "$ENVFILE"
else
  printf "\nOPENAI_API_KEY=%s\n" "$KEY" >> "$ENVFILE"
fi

echo "OPENAI_API_KEY written to $ENVFILE"
echo "Please restart your dev server: npm run dev"
