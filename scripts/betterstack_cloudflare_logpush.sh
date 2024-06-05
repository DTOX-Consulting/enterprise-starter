#!/usr/bin/env bash
set -euo pipefail

ACCOUNT_ID=${1:-}
ZONE_ID=${2:-}
CLOUDFLARE_EMAIL=${3:-}
CLOUDFLARE_TOKEN=${4:-}
SOURCE_TOKEN=${5:-}

if [ -z "$ACCOUNT_ID" ] || [ -z "$ZONE_ID" ] || [ -z "$CLOUDFLARE_EMAIL" ] || [ -z "$CLOUDFLARE_TOKEN" ] || [ -z "$SOURCE_TOKEN" ]; then
    echo "Usage: $0 <account-id> <zone-id> <cloudflare-email> <cloudflare-token> <source-token>"
    exit 1
fi

generate_data() {
    dataset="${1:-workers_trace_events}"
    cat <<EOF
{
    "enabled": true,
    "dataset": "${dataset}",
    "name": "logpush-better-stack-logs",
    "destination_conf": "https://in.logs.betterstack.com?header_Content-Type=application%2Fx-ndjson&header_Authorization=Bearer%20${SOURCE_TOKEN}"
}
EOF
}

echo
curl -X POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/logpush/jobs" \
-H "Content-Type: application/json" \
-H "X-Auth-Key: ${CLOUDFLARE_TOKEN}" \
-H "X-Auth-Email: ${CLOUDFLARE_EMAIL}" \
-H "Authorization: Bearer ${CLOUDFLARE_TOKEN}" \
-d "$(generate_data "workers_trace_events")"

echo
curl -X POST "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/logpush/jobs" \
-H "Content-Type: application/json" \
-H "X-Auth-Key: ${CLOUDFLARE_TOKEN}" \
-H "X-Auth-Email: ${CLOUDFLARE_EMAIL}" \
-H "Authorization: Bearer ${CLOUDFLARE_TOKEN}" \
-d "$(generate_data "http_requests")"

echo
curl -X GET "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/logpush/jobs" \
-H "Content-Type: application/json" \
-H "X-Auth-Key: ${CLOUDFLARE_TOKEN}" \
-H "X-Auth-Email: ${CLOUDFLARE_EMAIL}" \
-H "Authorization: Bearer ${CLOUDFLARE_TOKEN}"

echo
curl -X GET "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/logpush/jobs" \
-H "Content-Type: application/json" \
-H "X-Auth-Key: ${CLOUDFLARE_TOKEN}" \
-H "X-Auth-Email: ${CLOUDFLARE_EMAIL}" \
-H "Authorization: Bearer ${CLOUDFLARE_TOKEN}"
