import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiErrorMessage } from "@/lib/api/client";
import * as api from "@/lib/api/endpoints/photos";

export const photoKeys = {
  list: (projectId: number | null) => ["photos", projectId] as const,
};

export function usePhotos(projectId: number | null) {
  return useQuery({
    queryKey: photoKeys.list(projectId),
    queryFn: () => api.listPhotos(projectId ?? undefined),
    enabled: projectId !== null,
  });
}

export function useUploadPhoto(projectId: number | null) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => api.uploadPhoto(formData),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: photoKeys.list(projectId) });
    },
    onError: (err) => toast.error(apiErrorMessage(err, "Upload failed")),
  });
}

export function useDeletePhoto(projectId: number | null) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.deletePhoto(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: photoKeys.list(projectId) });
      toast.success("Photo deleted");
    },
    onError: (err) => toast.error(apiErrorMessage(err, "Could not delete photo")),
  });
}
