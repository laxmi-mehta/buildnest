/**
 * Typed, validated access to environment variables.
 * Only NEXT_PUBLIC_* vars are available in the browser.
 */

function required(name: string, value: string | undefined, fallback?: string): string {
  const v = value ?? fallback;
  if (v === undefined) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return v;
}

export const env = {
  /** Base URL of the BuildNest API (no trailing slash). */
  apiUrl: required(
    "NEXT_PUBLIC_API_URL",
    process.env.NEXT_PUBLIC_API_URL,
    "http://localhost:8000/api/v1"
  ),
  /** Absolute URL of this app, used for metadata and links. */
  appUrl: required("NEXT_PUBLIC_APP_URL", process.env.NEXT_PUBLIC_APP_URL, "http://localhost:3000"),
  isDev: process.env.NODE_ENV !== "production",
} as const;
