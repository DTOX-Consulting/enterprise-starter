#!/usr/bin/env bash
set -euo pipefail

# Setup git config
git config --global pull.rebase false
git config --global core.ignorecase false
git config --global push.autoSetupRemote true
git config --global blame.ignoreRevsFile .git-blame-ignore-revs
