#!/usr/bin/env bash
set -euo pipefail

CURRENT_DIR=$(realpath "$(dirname "${BASH_SOURCE:-$0}")")

# Setup AWS default gitpod credentials
# mkdir -p ~/.aws
# rm -f ~/.aws/credentials

# aws configure set aws_access_key_id "${AWS_ACCESS_KEY_DEV_ONLY}" --profile default
# aws configure set aws_secret_access_key "${AWS_SECRET_KEY_DEV_ONLY}" --profile default
# aws configure set region "eu-west-3" --profile default

sudo apt update -y
sudo apt install -y \
  fortune cowsay figlet lolcat

gem install lolcat
gem pristine --all

touch /home/gitpod/.profile

echo "" >> /home/gitpod/.profile
echo "fortune | cowsay -pn | lolcat" >> /home/gitpod/.profile
echo "echo 'Welcome!' | figlet -f banner | lolcat -a -d 5" >> /home/gitpod/.profile
echo "git config pull.rebase false" >> /home/gitpod/.profile
echo "echo 'Node:' \$(node -v)" >> /home/gitpod/.profile
echo "echo 'PNPM:' \$(pnpm -v)" >> /home/gitpod/.profile
echo "echo 'Yarn:' \$(yarn -v)" >> /home/gitpod/.profile
echo "echo 'Bun:'  \$(pnpm -v)" >> /home/gitpod/.profile
