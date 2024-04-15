#!/usr/bin/env sh

set -eu

# Implementation of image configurations based on:
# https://stackoverflow.com/a/65529290/10330809
# As of version 1.19, the official Nginx Docker image supports templates with
# variable substitution.
# When we use the default.conf.template it is automatically replaced with default.conf
# which automatically replaces environment variables in the script.
# But that uses `envsubst`, which does not allow for
# defaults for missing variables. Here, first use the regular command shell
# to set the defaults:
export SERVER_API_DOCKER_DEPLOY_HOST=${SERVER_API_DOCKER_DEPLOY_HOST:-http://localhost}
export SERVER_API_DOCKER_DEPLOY_PORT=${CALVARY_ERP_PROD_PORT:-8180}
export ERP_DOCUMENTS_MAX_FILE_SIZE=${ERP_DOCUMENTS_MAX_FILE_SIZE:-50M}
# export NODE_OPTIONS=${NODE_OPTIONS:-"--max-old-space-size=8192"}

# Due to `set -u` this would fail if not defined and no default was set above
echo "Requests proxy configured for /* to ${SERVER_API_DOCKER_DEPLOY_HOST}:${SERVER_API_DOCKER_DEPLOY_PORT} /*"

# Finally, let the original Nginx entry point do its work, passing whatever is
# set for CMD. Use `exec` to replace the current process, to trap any signals
# (like Ctrl+C) that Docker may send it:
exec /docker-entrypoint.sh "$@"
