require('dotenv').config();

export const SLACK_SIGNING_SECRET = process?.env?.SLACK_SIGNING_SECRET as string;
if (!SLACK_SIGNING_SECRET) {
  console.error(new Error('Environment variable "SLACK_SIGNING_SECRET" is not defined.'));
  process.exit(1);
}

/* Common
============================================================================= */
export const PORT = process?.env?.PORT ?? 4000;
