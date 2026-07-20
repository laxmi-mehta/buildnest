import { apiClient, type Paginated } from "../client";
import type { ApiMaterial, CreateMaterialInput } from "../types";

export function listMaterials(projectId?: number): Promise<Paginated<ApiMaterial>> {
  const params = projectId ? `?project=${projectId}` : "";
  return apiClient(`/materials/${params}`);
}

export function getMaterial(id: number): Promise<ApiMaterial> {
  return apiClient(`/materials/${id}/`);
}

export function createMaterial(input: CreateMaterialInput): Promise<ApiMaterial> {
  return apiClient("/materials/", { method: "POST", body: input });
}

export function updateMaterial(
  id: number,
  input: Partial<CreateMaterialInput>
): Promise<ApiMaterial> {
  return apiClient(`/materials/${id}/`, { method: "PATCH", body: input });
}

export function deleteMaterial(id: number): Promise<void> {
  return apiClient(`/materials/${id}/`, { method: "DELETE" });
}
