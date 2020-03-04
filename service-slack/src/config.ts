require('dotenv').config();

/* Slack
============================================================================= */
export const SLACK_BOT_TOKEN = process?.env?.SLACK_BOT_TOKEN as string;
if (!SLACK_BOT_TOKEN) {
  console.error(new Error('Environment variable "SLACK_BOT_ACCESS_TOKEN" is not defined.'));
  process.exit(1);
}

export const SLACK_SIGNING_SECRET = process?.env?.SLACK_SIGNING_SECRET as string;
if (!SLACK_SIGNING_SECRET) {
  console.error(new Error('Environment variable "SLACK_SIGNING_SECRET" is not defined.'));
  process.exit(1);
}

/* Common
============================================================================= */
export const PORT = process?.env?.PORT;
