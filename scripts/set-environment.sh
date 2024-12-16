#!/usr/bin/env bash
set -euo pipefail

echo "NODE_VERSION=$(cat .node-version)"

if [ -z "$GITHUB_REF" ] || [ -z "$GITHUB_EVENT_NAME" ]; then
  echo "Error: Required GitHub variables are not set."
  exit 1
fi

# For pushes, use the current branch
if [[ $GITHUB_REF == refs/pull/* ]]; then
  BRANCH=${GITHUB_BASE_REF}
  echo "BRANCH=$BRANCH"
  echo "VERCEL_DEPLOY_ENV=preview"
else
  BRANCH=${GITHUB_REF#refs/heads/}
  echo "BRANCH=$BRANCH"
  echo "VERCEL_DEPLOY_ENV=production"
fi

# Set environment variables based on branch
case "$BRANCH" in
  "main")
    echo "STACK_NAME=dev"
    echo "NEXT_PUBLIC_ENVIRONMENT=development"
    ;;
  "staging")
    echo "STACK_NAME=stg"
    echo "NEXT_PUBLIC_ENVIRONMENT=staging"
    ;;
  "production")
    echo "STACK_NAME=prd"
    echo "NEXT_PUBLIC_ENVIRONMENT=production"
    ;;
  *)
    echo "Unknown branch: $BRANCH" >&2
    exit 1
    ;;
esac
