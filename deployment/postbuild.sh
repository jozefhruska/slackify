# Generate prisma client
CURRENT_SERVICE="slackify-prisma"
echo "[postbuild]: Generating prisma client..."

npx lerna run generate --scope $CURRENT_SERVICE
EXIT_STATUS=$?
if [ $EXIT_STATUS -ne 0 ]; then
  exit $EXIT_STATUS
fi

# Build "slackify-service-private"
CURRENT_SERVICE="slackify-service-private"
echo "[postbuild]: Building \"$CURRENT_SERVICE\""

npx lerna run generate --scope $CURRENT_SERVICE
EXIT_STATUS=$?
if [ $EXIT_STATUS -ne 0 ]; then
  exit $EXIT_STATUS
fi

npx lerna run --scope $CURRENT_SERVICE build
EXIT_STATUS=$?
if [ $EXIT_STATUS -ne 0 ]; then
  exit $EXIT_STATUS
fi