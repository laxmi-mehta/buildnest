import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiErrorMessage } from "@/lib/api/client";
import * as api from "@/lib/api/endpoints/documents";

export const documentKeys = {
  list: (projectId: number | null) => ["documents", projectId] as const,
};

export function useDocuments(projectId: number | null) {
  return useQuery({
    queryKey: documentKeys.list(projectId),
    queryFn: () => api.listDocuments(projectId ?? undefined),
    enabled: projectId !== null,
  });
}

export function useUploadDocument(projectId: number | null) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => api.uploadDocument(formData),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: documentKeys.list(projectId) });
      toast.success("Document uploaded");
    },
    onError: (err) => toast.error(apiErrorMessage(err, "Upload failed")),
  });
}

export function useDeleteDocument(projectId: number | null) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.deleteDocument(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: documentKeys.list(projectId) });
      toast.success("Document deleted");
    },
    onError: (err) => toast.error(apiErrorMessage(err, "Could not delete document")),
  });
}
