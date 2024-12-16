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
SERVICE_DIR="${CURRENT_DIR}/..";

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

find "${SERVICE_DIR}" -type f -exec sed -i "s/enterprise-starter/${SERVICE_NAME}/g" {} +
find "${SERVICE_DIR}" -type f -exec sed -i "s/Enterprise Starter/$(capitalize_dashed "${SERVICE_NAME}")/g" {} +

# Replace __template__ with SERVICE in all files
find "${SERVICE_DIR}" -type f -exec sed -i "s/__template__/${SERVICE_NAME}/g" {} +
find "${SERVICE_DIR}" -type f -exec sed -i "s/__Template__/$(capitalize_dashed "${SERVICE_NAME}")/g" {} +

pnpm install
