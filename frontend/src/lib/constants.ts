export const APP_NAME = "BuildNest";
export const APP_TAGLINE = "Plan. Build. Track.";
export const APP_DESCRIPTION =
  "The complete digital workspace for homeowners to plan, organize, track, document and manage the entire home construction journey.";

/** Keys for browser storage — always namespaced. */
export const STORAGE_KEYS = {
  authToken: "buildnest.auth.token",
  refreshToken: "buildnest.auth.refresh",
  sidebarCollapsed: "buildnest.ui.sidebar-collapsed",
} as const;

/** Default page size for tables and lists. */
export const DEFAULT_PAGE_SIZE = 10;

export const CURRENCY = {
  code: "INR",
  locale: "en-IN",
} as const;

export const DATE_FORMATS = {
  short: "MMM d, yyyy",
  long: "MMMM d, yyyy",
  withTime: "MMM d, yyyy · h:mm a",
} as const;
