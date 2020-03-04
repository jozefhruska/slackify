require('dotenv').config();

/* Slack
============================================================================= */
export const SLACK_CLIENT_ID = process?.env?.SLACK_CLIENT_ID as string;
if (!SLACK_CLIENT_ID) {
  console.error(new Error('Environment variable "SLACK_CLIENT_ID" is not defined.'));
  process.exit(1);
}

export const SLACK_CLIENT_SECRET = process?.env?.SLACK_CLIENT_SECRET as string;
if (!SLACK_CLIENT_SECRET) {
  console.error(new Error('Environment variable "SLACK_CLIENT_SECRET" is not defined.'));
  process.exit(1);
}

/* Common
============================================================================= */
export const PORT = process?.env?.PORT;
