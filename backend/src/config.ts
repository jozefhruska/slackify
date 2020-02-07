require('dotenv').config();

export const SLACK_CLIENT_ID = process?.env?.SLACK_CLIENT_ID;
export const SLACK_CLIENT_SECRET = process?.env?.SLACK_CLIENT_SECRET;
export const SLACK_SIGNING_SECRET = process?.env?.SLACK_SIGNING_SECRET;
export const SLACK_VERIFICATION_TOKEN = process?.env?.SLACK_VERIFICATION_TOKEN;
export const SLACK_BOT_ACCESS_TOKEN = process?.env?.SLACK_BOT_USER_ACCESS_TOKEN;

export const PORT = process?.env?.PORT;
