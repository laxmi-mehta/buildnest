import { apiClient, type Paginated } from "../client";

export type DocumentCategory = "permit" | "contract" | "invoice" | "plan" | "report" | "other";

export interface ApiDocument {
  id: number;
  project: number;
  title: string;
  category: DocumentCategory;
  file_url: string;
  file_size: number;
  uploaded_at: string;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function listDocuments(projectId?: number): Promise<Paginated<ApiDocument>> {
  const params = projectId ? `?project=${projectId}&page_size=100` : "?page_size=100";
  return apiClient(`/documents/${params}`);
}

export function uploadDocument(formData: FormData): Promise<ApiDocument> {
  return apiClient("/documents/", { method: "POST", body: formData });
}

export function deleteDocument(id: number): Promise<void> {
  return apiClient(`/documents/${id}/`, { method: "DELETE" });
}
