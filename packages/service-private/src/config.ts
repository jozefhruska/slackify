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
export const SIGNING_SECRET = process?.env?.SIGNING_SECRET as string;
if (!SIGNING_SECRET) {
  console.error(new Error('Environment variable "SIGNING_SECRET" is not defined.'));
  process.exit(1);
}

export const NODE_ENV = process?.env?.NODE_ENV as string;

export const PORT = process?.env?.PORT;
