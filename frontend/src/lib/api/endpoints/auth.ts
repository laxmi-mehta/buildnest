import { mockResponse } from "../client";

/**
 * Auth endpoint signatures. NO real implementation yet — each function
 * documents the eventual DRF endpoint and resolves a mock so the UI flows
 * can be exercised end-to-end.
 */

export interface Credentials {
  email: string;
  password: string;
}

export interface SignupInput extends Credentials {
  fullName: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface CurrentUser {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
}

/** POST /auth/login/ */
export function login(_input: Credentials): Promise<AuthTokens> {
  return mockResponse({ access: "mock-access-token", refresh: "mock-refresh-token" });
}

/** POST /auth/signup/ */
export function signup(_input: SignupInput): Promise<AuthTokens> {
  return mockResponse({ access: "mock-access-token", refresh: "mock-refresh-token" });
}

/** POST /auth/password/forgot/ */
export function requestPasswordReset(_email: string): Promise<{ detail: string }> {
  return mockResponse({ detail: "Password reset email sent." });
}

/** POST /auth/password/reset/ */
export function resetPassword(_token: string, _password: string): Promise<{ detail: string }> {
  return mockResponse({ detail: "Password updated." });
}

/** POST /auth/email/verify/ */
export function verifyEmail(_token: string): Promise<{ detail: string }> {
  return mockResponse({ detail: "Email verified." });
}

/** GET /auth/me/ */
export function getCurrentUser(): Promise<CurrentUser> {
  return mockResponse({
    id: "usr_01",
    email: "arjun@example.com",
    fullName: "Arjun Mehta",
    avatarUrl: null,
  });
}
