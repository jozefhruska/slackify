/* Schema
============================================================================= */
export const SCHEMA_URL =
  (process?.env?.NEXT_PUBLIC_SCHEMA_URL as string) ?? 'http://localhost:5000';
if (!SCHEMA_URL) {
  console.error(new Error('Environment variable "NEXT_PUBLIC_SCHEMA_URL" is not defined.'));
  process.exit(1);
}

/* Slack
============================================================================= */
export const REDIRECT_HOST =
  (process?.env?.NEXT_PUBLIC_REDIRECT_HOST as string) ?? 'https://slackify.now.sh';
