import { env } from "@/lib/env";
import { STORAGE_KEYS } from "@/lib/constants";

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

// Prevent multiple concurrent refresh calls
let refreshPromise: Promise<string | null> | null = null;

async function tryRefreshAccessToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  const refresh = window.localStorage.getItem(STORAGE_KEYS.refreshToken);
  if (!refresh) return null;

  if (!refreshPromise) {
    refreshPromise = fetch(`${env.apiUrl}/auth/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    })
      .then(async (res) => {
        if (!res.ok) {
          window.localStorage.removeItem(STORAGE_KEYS.authToken);
          window.localStorage.removeItem(STORAGE_KEYS.refreshToken);
          window.location.href = "/login";
          return null;
        }
        const data: { access: string } = await res.json();
        window.localStorage.setItem(STORAGE_KEYS.authToken, data.access);
        return data.access;
      })
      .catch(() => null)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

function buildHeaders(token: string | null, isFormData: boolean, extra?: HeadersInit): HeadersInit {
  return {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

export async function apiClient<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { body, anonymous, headers, ...rest } = options;

  const token = anonymous ? null : getAccessToken();
  const isFormData = body instanceof FormData;
  const serializedBody = isFormData ? body : body !== undefined ? JSON.stringify(body) : undefined;

  const response = await fetch(`${env.apiUrl}${path}`, {
    ...rest,
    headers: buildHeaders(token, isFormData, headers),
    body: serializedBody,
  });

  // Attempt silent token refresh on 401, then retry once
  if (response.status === 401 && !anonymous) {
    const newToken = await tryRefreshAccessToken();
    if (newToken) {
      const retry = await fetch(`${env.apiUrl}${path}`, {
        ...rest,
        headers: buildHeaders(newToken, isFormData, headers),
        body: serializedBody,
      });
      if (!retry.ok) {
        let details: unknown;
        try {
          details = await retry.json();
        } catch {
          details = undefined;
        }
        throw new ApiError(retry.status, retry.statusText, details);
      }
      if (retry.status === 204) return undefined as T;
      return (await retry.json()) as T;
    }
    // No refresh token — fall through to throw the 401
  }

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
