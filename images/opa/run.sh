#!/usr/bin/env bash
set -eu
workspace=$(cd "$(dirname "$0")" && pwd -P)
{
    cd "$workspace" || exit
    # sh ../keycloak/run.sh 
    # brew install opa
    echo "Verify token: "
    opa eval -f pretty -b . -i input.json "data.verify"
}
