import { apiClient, type Paginated } from "../client";

export interface ApiPhoto {
  id: number;
  project: number;
  caption: string;
  file_url: string;
  file_size: number;
  uploaded_at: string;
}

export function listPhotos(projectId?: number): Promise<Paginated<ApiPhoto>> {
  const params = projectId ? `?project=${projectId}&page_size=200` : "?page_size=200";
  return apiClient(`/photos/${params}`);
}

export function uploadPhoto(formData: FormData): Promise<ApiPhoto> {
  return apiClient("/photos/", { method: "POST", body: formData });
}

export function deletePhoto(id: number): Promise<void> {
  return apiClient(`/photos/${id}/`, { method: "DELETE" });
}
