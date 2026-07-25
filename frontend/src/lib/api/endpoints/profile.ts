import { apiClient } from "../client";

export interface ApiProfile {
  id: number;
  email: string;
  full_name: string;
  email_verified: boolean;
  date_joined: string;
}

export type UpdateProfileInput = { full_name?: string };

export function getProfile(): Promise<ApiProfile> {
  return apiClient<ApiProfile>("/profiles/");
}

export function updateProfile(input: UpdateProfileInput): Promise<ApiProfile> {
  return apiClient<ApiProfile>("/profiles/", { method: "PATCH", body: input });
}
