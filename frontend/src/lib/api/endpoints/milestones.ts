import { apiClient, type Paginated } from "../client";
import type { ApiMilestone, CreateMilestoneInput } from "../types";

export function listMilestones(projectId?: number): Promise<Paginated<ApiMilestone>> {
  const params = projectId ? `?project=${projectId}` : "";
  return apiClient(`/milestones/${params}`);
}

export function getMilestone(id: number): Promise<ApiMilestone> {
  return apiClient(`/milestones/${id}/`);
}

export function createMilestone(input: CreateMilestoneInput): Promise<ApiMilestone> {
  return apiClient("/milestones/", { method: "POST", body: input });
}

export function updateMilestone(
  id: number,
  input: Partial<CreateMilestoneInput>
): Promise<ApiMilestone> {
  return apiClient(`/milestones/${id}/`, { method: "PATCH", body: input });
}

export function deleteMilestone(id: number): Promise<void> {
  return apiClient(`/milestones/${id}/`, { method: "DELETE" });
}
