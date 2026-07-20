import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import * as api from "@/lib/api/endpoints/materials";
import { apiErrorMessage } from "@/lib/api/client";
import type { CreateMaterialInput } from "@/lib/api/types";

export const materialKeys = {
  all: ["materials"] as const,
  list: (projectId: number | null) => [...materialKeys.all, "list", projectId] as const,
};

export function useMaterials(projectId: number | null) {
  return useQuery({
    queryKey: materialKeys.list(projectId),
    queryFn: () => api.listMaterials(projectId ?? undefined),
    enabled: projectId !== null,
  });
}

export function useCreateMaterial(projectId: number | null) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateMaterialInput) => api.createMaterial(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: materialKeys.list(projectId) }),
    onError: (err) => toast.error(apiErrorMessage(err, "Could not save material")),
  });
}
