import { apiClient, type Paginated } from "../client";
import type { ApiProject, ApiProjectList, CreateProjectInput } from "../types";

export function listProjects(): Promise<Paginated<ApiProjectList>> {
  return apiClient("/projects/");
}

export function getProject(id: number): Promise<ApiProject> {
  return apiClient(`/projects/${id}/`);
}

export function createProject(input: CreateProjectInput): Promise<ApiProject> {
  return apiClient("/projects/", { method: "POST", body: input });
}

export function updateProject(id: number, input: Partial<CreateProjectInput>): Promise<ApiProject> {
  return apiClient(`/projects/${id}/`, { method: "PATCH", body: input });
}

export function deleteProject(id: number): Promise<void> {
  return apiClient(`/projects/${id}/`, { method: "DELETE" });
}
