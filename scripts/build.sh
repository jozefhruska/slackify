#!/bin/bash

# Check if service is selected
if [[ -z "${SLACKIFY_SERVICE}" ]]; then
  echo "[postbuild]: \"SLACKIFY_SERVICE\" is not defined."
  exit 1
fi

# Generate prisma client
echo "[postbuild]: Generating prisma client..."

npx lerna run generate --scope slackify-prisma
EXIT_STATUS=$?
if [ $EXIT_STATUS -ne 0 ]; then
  exit $EXIT_STATUS
fi

# Build "slackify-service-private"
if [[ $SLACKIFY_SERVICE == "slackify-service-private" || $SLACKIFY_SERVICE == "all" ]]; then
  CURRENT_SERVICE="slackify-service-private"
  echo "[postbuild]: Building \"$CURRENT_SERVICE\""

  npx lerna run build --scope $CURRENT_SERVICE
  EXIT_STATUS=$?
  if [ $EXIT_STATUS -ne 0 ]; then
    exit $EXIT_STATUS
  fi
fi

# Build "slackify-service-public"
if [[ $SLACKIFY_SERVICE == "slackify-service-public" || $SLACKIFY_SERVICE == "all" ]]; then
  CURRENT_SERVICE="slackify-service-public"
  echo "[postbuild]: Building \"$CURRENT_SERVICE\""

  npx lerna run build --scope $CURRENT_SERVICE
  EXIT_STATUS=$?
  if [ $EXIT_STATUS -ne 0 ]; then
    exit $EXIT_STATUS
  fi
fi

# Build "slackify-frontend"
if [[ $SLACKIFY_SERVICE == "slackify-frontend" || $SLACKIFY_SERVICE == "all" ]]; then
  CURRENT_SERVICE="slackify-frontend"
  echo "[postbuild]: Building \"$CURRENT_SERVICE\""

  npx lerna run build --scope $CURRENT_SERVICE
  EXIT_STATUS=$?
  if [ $EXIT_STATUS -ne 0 ]; then
    exit $EXIT_STATUS
  fi
fi