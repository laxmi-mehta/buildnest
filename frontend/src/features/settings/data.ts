/** Dummy current user until real auth lands. */
export const currentUser = {
  id: "usr_01",
  name: "Arjun Mehta",
  email: "arjun@example.com",
  avatarUrl: null as string | null,
  role: "Homeowner",
  plan: "Pro",
  location: "Bengaluru, Karnataka",
  joinedAt: "2025-11-02",
};

export type CurrentUser = typeof currentUser;
