#!/usr/bin/env bash
set -euo pipefail

# Installation Instructions:
# --------------------------
# Prerequisites:
# 1. Ensure you have Homebrew installed. If not, install it with:
#    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
#
# 2. Install the following image optimization tools and dependencies using Homebrew:
# brew install optipng advancecomp pngcrush jpegoptim webp svgo
# ------------------------------------------------------------------------------

# Determine the path to the root-level .gitignore file
root_gitignore="$(git rev-parse --show-toplevel)/.gitignore"

# Define arrays for supported image file types
png_files=()
jpg_files=()
svg_files=()
webp_files=()

# Function to check if a file should be ignored based on .gitignore rules
should_ignore() {
    local file="$1"
    local ignore_file="$2"
    
    # Check if the file is in the 'node_modules' directory and skip it
    if [[ "$file" == *"node_modules"* ]]; then
        return 1  # File is not ignored
    fi
    
    # Use git check-ignore to see if the file is ignored
    if git check-ignore -q "$file" -- "$ignore_file" > /dev/null 2>&1; then
        return 0 # File is ignored
    else
        return 1 # File is not ignored
    fi
}

# Function to recursively find image files and add them to the respective arrays
find_images() {
    local file_type="$1"
    local -n array="$2"
    
    while IFS= read -r -d '' image_file; do
        # Check if the file should be ignored based on .gitignore rules
        if [[ ! "$image_file" =~ /node_modules/ ]] && ! should_ignore "$image_file" "$root_gitignore"; then
            array+=("$image_file")
        fi
    done < <(find . -type f -iname "*.$file_type" -print0)
}

# Find PNG, JPEG, SVG, and WebP files and add them to their respective arrays
find_images "png" png_files
find_images "jpg" jpg_files
find_images "svg" svg_files
find_images "webp" webp_files

# Optimize PNG files
for png_file in "${png_files[@]}"; do
    optipng -nb -nc "$png_file"
    advpng -z4 "$png_file"
    pngcrush -rem gAMA -rem alla -rem cHRM -rem iCCP -rem sRGB -rem time -ow "$png_file"
done

# Optimize JPEG files
for jpg_file in "${jpg_files[@]}"; do
    jpegoptim -f --strip-all "$jpg_file"
done

# Optimize SVG files (using SVGO)
for svg_file in "${svg_files[@]}"; do
    svgo -i "$svg_file" -o "$svg_file"
done

# Optimize WebP files
for webp_file in "${webp_files[@]}"; do
    cwebp -quiet "$webp_file" -o "$webp_file"
done
