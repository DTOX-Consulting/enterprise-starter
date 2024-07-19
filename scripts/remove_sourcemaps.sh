#!/usr/bin/env bash
set -euo pipefail

# Delete source maps
find .next -type f -name '*.js.map' -delete
find .next -type f -name '*.css.map' -delete

# Delete source map references
find .next -type f -name '*.js' -exec sed -i -E 's/sourceMappingURL=[^ ]*\.js\.map//g' {} +
find .next -type f -name '*.css' -exec sed -i -E 's/sourceMappingURL=[^ ]*\.css\.map//g' {} +
