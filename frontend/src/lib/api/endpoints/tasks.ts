import { apiClient, type Paginated } from "../client";
import type { ApiTask, CreateTaskInput } from "../types";

export function listTasks(projectId?: number): Promise<Paginated<ApiTask>> {
  const params = projectId ? `?project=${projectId}` : "";
  return apiClient(`/tasks/${params}`);
}

export function getTask(id: number): Promise<ApiTask> {
  return apiClient(`/tasks/${id}/`);
}

export function createTask(input: CreateTaskInput): Promise<ApiTask> {
  return apiClient("/tasks/", { method: "POST", body: input });
}

export function updateTask(id: number, input: Partial<CreateTaskInput>): Promise<ApiTask> {
  return apiClient(`/tasks/${id}/`, { method: "PATCH", body: input });
}

export function deleteTask(id: number): Promise<void> {
  return apiClient(`/tasks/${id}/`, { method: "DELETE" });
}
