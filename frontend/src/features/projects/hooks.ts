import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import * as api from "@/lib/api/endpoints/projects";
import { apiErrorMessage } from "@/lib/api/client";
import type { CreateProjectInput } from "@/lib/api/types";

export const projectKeys = {
  all: ["projects"] as const,
  lists: () => [...projectKeys.all, "list"] as const,
  detail: (id: number) => [...projectKeys.all, "detail", id] as const,
};

export function useProjects() {
  return useQuery({
    queryKey: projectKeys.lists(),
    queryFn: api.listProjects,
  });
}

export function useProject(id: number) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => api.getProject(id),
    enabled: id > 0,
  });
}

export function useCreateProject(options?: { onSuccess?: () => void }) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateProjectInput) => api.createProject(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: projectKeys.lists() });
      options?.onSuccess?.();
    },
    onError: (err) => toast.error(apiErrorMessage(err, "Could not create project")),
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.deleteProject(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: projectKeys.lists() }),
    onError: (err) => toast.error(apiErrorMessage(err, "Could not delete project")),
  });
}
