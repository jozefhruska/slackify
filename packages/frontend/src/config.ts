/* Schema
============================================================================= */
export const SCHEMA_URL = (process?.env?.SCHEMA_URL as string) ?? 'http://localhost:5000';
if (!SCHEMA_URL) {
  console.error(new Error('Environment variable "SCHEMA_URL" is not defined.'));
  process.exit(1);
}
