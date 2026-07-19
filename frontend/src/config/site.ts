import { APP_DESCRIPTION, APP_NAME, APP_TAGLINE } from "@/lib/constants";

export const siteConfig = {
  name: APP_NAME,
  tagline: APP_TAGLINE,
  description: APP_DESCRIPTION,
  links: {
    docs: "/help",
    support: "mailto:support@buildnest.app",
  },
} as const;
