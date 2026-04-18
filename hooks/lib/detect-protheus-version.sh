#!/usr/bin/env bash
# advpl-specialist - Detect Protheus release version in the current project
#
# Usage:
#   source "${CLAUDE_PLUGIN_ROOT}/hooks/lib/detect-protheus-version.sh"
#   VERSION=$(detect_protheus_version)
#   version_gte "$VERSION" "12.1.2410" && echo "supports TLPP+MVC"
#
# Detection tiers (in order):
#   1. .protheus-version file (explicit user convention)
#   2. tds.config.json (TDS-VSCode project config)
#
# Returns the detected version string on stdout, or empty string if unknown.

detect_protheus_version() {
    # Tier 1: .protheus-version (explicit, wins over everything)
    if [ -f ".protheus-version" ]; then
        cat .protheus-version | tr -d '[:space:]'
        return 0
    fi

    # Tier 2: tds.config.json (TDS-VSCode)
    if [ -f "tds.config.json" ]; then
        grep -o '"version"[[:space:]]*:[[:space:]]*"[^"]*"' tds.config.json \
            | head -1 \
            | sed 's/.*"\([^"]*\)"$/\1/'
        return 0
    fi

    echo ""
}

# Compare two semver-like version strings.
# Returns 0 (true) if $1 >= $2, 1 (false) otherwise.
# Uses `sort -V` for natural version ordering.
version_gte() {
    [ "$1" = "$(printf '%s\n%s' "$1" "$2" | sort -V | tail -n1)" ]
}
