import { apiClient, type Paginated } from "../client";
import type { ApiContractor, CreateContractorInput } from "../types";

export function listContractors(projectId?: number): Promise<Paginated<ApiContractor>> {
  const params = projectId ? `?project=${projectId}` : "";
  return apiClient(`/contractors/${params}`);
}

export function getContractor(id: number): Promise<ApiContractor> {
  return apiClient(`/contractors/${id}/`);
}

export function createContractor(input: CreateContractorInput): Promise<ApiContractor> {
  return apiClient("/contractors/", { method: "POST", body: input });
}

export function updateContractor(
  id: number,
  input: Partial<CreateContractorInput>
): Promise<ApiContractor> {
  return apiClient(`/contractors/${id}/`, { method: "PATCH", body: input });
}

export function deleteContractor(id: number): Promise<void> {
  return apiClient(`/contractors/${id}/`, { method: "DELETE" });
}
