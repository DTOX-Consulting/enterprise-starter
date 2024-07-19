#!/usr/bin/env bash
set -euo pipefail

# shopt -s extglob

rm -rf public/*
mkdir -p public/images

cp -rf src/images public
cp -rf src/images/logos/favicon/*.xml public
cp -rf src/images/logos/favicon/*.html public
cp -rf src/images/logos/favicon/apple-icon.png public
cp -rf src/images/logos/favicon/mstile-150x150.png public
cp -rf src/images/logos/favicon/safari-pinned-tab.svg public
