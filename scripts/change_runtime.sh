#!/usr/bin/env bash
set -euo pipefail

# Function to display usage information
usage() {
    echo "Usage: $0 <runtime> <starting-directory> <file-name-1> [file-name-2] ... [file-name-N]"
    exit 1
}

# Check if at least two arguments are passed
if [ "$#" -lt 3 ]; then
    usage
fi


RUNTIME=$1

# Get the starting directory from the first argument
START_DIR=$2
shift 2 # Shift the arguments to the left, so $@ contains the file names

# Check if the starting directory exists
if [ ! -d "$START_DIR" ]; then
    echo "The directory $START_DIR does not exist."
    exit 1
fi

# Construct the find command to search for all specified file names
find_command="find \"$START_DIR\" -type f \( "
while [ "$#" -gt 1 ]; do
    find_command+=" -name \"$1\" -o"
    shift
done
find_command+=" -name \"$1\" \)"

# Perform in-place editing using sed for all files found
eval "$find_command" | xargs sed -i "s/^export const runtime = 'edge';/export const runtime = '$RUNTIME';/"
eval "$find_command" | xargs sed -i "s/^export const runtime = 'nodejs';/export const runtime = '$RUNTIME';/"

# Then, add the runtime declaration if it doesn't exist
for file in $(eval "$find_command"); do
    if ! grep -q "export const runtime" "$file"; then
        # Add a newline and the runtime export at the bottom of the file
        echo -e "\nexport const runtime = '$RUNTIME';" >> "$file"
    fi
done

echo "Changed the runtime assignment in all specified files to $RUNTIME."
