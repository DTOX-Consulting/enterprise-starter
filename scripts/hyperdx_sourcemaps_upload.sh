
#!/usr/bin/env bash
set -euo pipefail

pnpx @hyperdx/cli upload-sourcemaps \
  --serviceKey ${HYPERDX_SERVICE_KEY} \
  --path .next
