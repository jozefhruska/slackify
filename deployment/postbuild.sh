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


# Build selected service
echo "[postbuild]: Building \"$SLACKIFY_SERVICE\""

npx lerna run generate --scope $SLACKIFY_SERVICE
EXIT_STATUS=$?
if [ $EXIT_STATUS -ne 0 ]; then
  exit $EXIT_STATUS
fi

npx lerna run build --scope $SLACKIFY_SERVICE
EXIT_STATUS=$?
if [ $EXIT_STATUS -ne 0 ]; then
  exit $EXIT_STATUS
fi