import { apiClient, mockResponse } from "../client";

/**
 * Auth endpoints. Signup/login/me hit the real Django API
 * (apps.accounts); password reset and email verification remain mocked
 * until their backend flows exist.
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
  emailVerified: boolean;
}

interface ApiUser {
  id: number;
  email: string;
  full_name: string;
  email_verified: boolean;
}

function toCurrentUser(u: ApiUser): CurrentUser {
  return {
    id: String(u.id),
    email: u.email,
    fullName: u.full_name,
    emailVerified: u.email_verified,
  };
}

/** POST /auth/login/ */
export function login(input: Credentials): Promise<AuthTokens> {
  return apiClient<AuthTokens>("/auth/login/", {
    method: "POST",
    body: input,
    anonymous: true,
  });
}

/** POST /auth/signup/ */
export async function signup(input: SignupInput): Promise<AuthTokens & { user: CurrentUser }> {
  const res = await apiClient<AuthTokens & { user: ApiUser }>("/auth/signup/", {
    method: "POST",
    body: { email: input.email, password: input.password, full_name: input.fullName },
    anonymous: true,
  });
  return { ...res, user: toCurrentUser(res.user) };
}

/** GET /auth/me/ */
export async function getCurrentUser(): Promise<CurrentUser> {
  return toCurrentUser(await apiClient<ApiUser>("/auth/me/"));
}

/** POST /auth/refresh/ */
export function refreshTokens(refresh: string): Promise<{ access: string }> {
  return apiClient<{ access: string }>("/auth/refresh/", {
    method: "POST",
    body: { refresh },
    anonymous: true,
  });
}

/** POST /auth/password/forgot/ — backend flow not implemented yet. */
export function requestPasswordReset(_email: string): Promise<{ detail: string }> {
  return mockResponse({ detail: "Password reset email sent." });
}

/** POST /auth/password/reset/ — backend flow not implemented yet. */
export function resetPassword(_token: string, _password: string): Promise<{ detail: string }> {
  return mockResponse({ detail: "Password updated." });
}

/** POST /auth/email/verify/ — backend flow not implemented yet. */
export function verifyEmail(_token: string): Promise<{ detail: string }> {
  return mockResponse({ detail: "Email verified." });
}
