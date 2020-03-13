/* Common
============================================================================= */
export const API_URL = process?.env?.API_URL as string;
if (!API_URL) {
  console.error(new Error('Environment variable "API_URL" is not defined.'));
  process.exit(1);
}
