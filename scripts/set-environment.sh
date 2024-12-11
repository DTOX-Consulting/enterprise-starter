#!/usr/bin/env bash
set -euo pipefail

echo "NODE_VERSION=$(cat .node-version)"

# Handle both PR and push events
if [[ $GITHUB_REF == refs/pull/* ]]; then
    # For pull requests, always use dev environment
    echo "STACK_NAME=dev"
    echo "NEXT_PUBLIC_ENVIRONMENT=development"
    exit 0
fi

# For pushes, use the current branch
BRANCH=${GITHUB_REF#refs/heads/}

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
