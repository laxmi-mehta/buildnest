import { env } from "@/lib/env";
import { STORAGE_KEYS } from "@/lib/constants";

/**
 * API abstraction layer — the ONLY place the app talks to the network.
 *
 * Pages and features import endpoint modules (./endpoints/*), never fetch
 * directly. While the backend is not implemented, endpoint modules resolve
 * dummy data through `mockResponse()`; swapping to the real API changes
 * nothing outside `lib/api/`.
 */

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  /** Skip the Authorization header (login, signup, …). */
  anonymous?: boolean;
}

function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(STORAGE_KEYS.authToken);
}

export async function apiClient<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { body, anonymous, headers, ...rest } = options;

  const token = anonymous ? null : getAccessToken();

  const response = await fetch(`${env.apiUrl}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let details: unknown;
    try {
      details = await response.json();
    } catch {
      details = undefined;
    }
    throw new ApiError(response.status, response.statusText, details);
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

/**
 * Temporary stand-in used by endpoint modules until the Django API exists.
 * Simulates network latency so loading states are actually visible in dev.
 */
export function mockResponse<T>(data: T, delayMs = 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(structuredClone(data)), delayMs));
}

/** Human-readable message from a thrown ApiError (DRF error shapes). */
export function apiErrorMessage(error: unknown, fallback = "Something went wrong"): string {
  if (!(error instanceof ApiError)) return fallback;
  const details = error.details as Record<string, unknown> | undefined;
  if (!details) return fallback;
  if (typeof details.detail === "string") return details.detail;
  // Field errors: {"email": ["already exists"]} → "email: already exists"
  const [field, messages] = Object.entries(details)[0] ?? [];
  if (field && Array.isArray(messages) && messages.length) {
    return `${field}: ${messages[0]}`;
  }
  return fallback;
}

/** Standard paginated envelope the DRF backend will return. */
export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
