"use client";

import { STORAGE_KEYS } from "@/lib/constants";

/** Client-side JWT session helpers. */

export interface TokenPair {
  access: string;
  refresh: string;
}

export function saveTokens(tokens: TokenPair) {
  window.localStorage.setItem(STORAGE_KEYS.authToken, tokens.access);
  window.localStorage.setItem(STORAGE_KEYS.refreshToken, tokens.refresh);
}

export function clearTokens() {
  window.localStorage.removeItem(STORAGE_KEYS.authToken);
  window.localStorage.removeItem(STORAGE_KEYS.refreshToken);
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(window.localStorage.getItem(STORAGE_KEYS.authToken));
}
