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

export const SLACK_SIGNING_SECRET = process?.env?.SLACK_SIGNING_SECRET as string;
if (!SLACK_SIGNING_SECRET) {
  console.error(new Error('Environment variable "SLACK_SIGNING_SECRET" is not defined.'));
  process.exit(1);
}

export const SLACK_VERIFICATION_TOKEN = process?.env?.SLACK_VERIFICATION_TOKEN as string;
if (!SLACK_VERIFICATION_TOKEN) {
  console.error(new Error('Environment variable "SLACK_VERIFICATION_TOKEN" is not defined.'));
  process.exit(1);
}

export const SLACK_BOT_ACCESS_TOKEN = process?.env?.SLACK_BOT_USER_ACCESS_TOKEN as string;
if (!SLACK_BOT_ACCESS_TOKEN) {
  console.error(new Error('Environment variable "SLACK_BOT_ACCESS_TOKEN" is not defined.'));
  process.exit(1);
}

/* Common
============================================================================= */
export const PORT = process?.env?.PORT;
