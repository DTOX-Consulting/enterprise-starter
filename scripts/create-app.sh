#!/usr/bin/env bash
set -euo pipefail

CURRENT_DIR=$(realpath "$(dirname "${BASH_SOURCE:-$0}")")

# Function to capitalize first letter
capitalize() {
  local first="$(echo ${1:0:1} | tr '[:lower:]' '[:upper:]')"
  local rest="${1:1}"
  echo "$first$rest"
}

capitalize_dashed() {
  local words=(${1//-/ })
  local result=""
  for word in "${words[@]}"; do
    if [ -n "$result" ]; then
      result+=" "
    fi
    result+="$(capitalize "$word")"
  done
  echo "$result"
}

SERVICE_NAME=${1:-}
SERVICE_DIR=$(realpath "${CURRENT_DIR}/..")

if [[ -f "${SERVICE_DIR}/.env" ]]; then
  echo "Environment file ${SERVICE_DIR}/.env already exists"
  echo "Do you want to delete it? (y/n)"

  read -r DELETE_ENV
  if [[ "${DELETE_ENV}" = "y" ]]; then
    cp -f "${SERVICE_DIR}/.env.example" "${SERVICE_DIR}/.env"
  fi
else
  cp -f "${SERVICE_DIR}/.env.example" "${SERVICE_DIR}/.env"
fi

# Define directories to exclude with absolute paths and more specific patterns
EXCLUDE_DIRS='-not -path "*/\.*/*" -not -path "*/node_modules/*" -not -path "*/dist/*" -not -path "*/build/*" -not -path "*/.git/*" -not -path "*/.next/*" -not -path "*/.trigger/*" -not -path "*/storybook-static/*" -not -path "*/README.md" -not -path "*/scripts/*"'

echo "Starting file replacements..."
eval "find \"${SERVICE_DIR}\" -type f ${EXCLUDE_DIRS} -exec sh -c '
    if sed -i \
        -e \"s/enterprise-starter/${SERVICE_NAME}/g\" \
        -e \"s/Enterprise Starter/$(capitalize_dashed "${SERVICE_NAME}")/g\" \
        \"\$1\" && [ -n \"\$(grep -l \"${SERVICE_NAME}\" \"\$1\")\" ]; then
        echo \"Modified: \$1\"
    fi
' sh {} \;"
echo "Finished replacements"

pnpm install
