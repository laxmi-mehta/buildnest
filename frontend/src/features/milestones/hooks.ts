import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import * as api from "@/lib/api/endpoints/milestones";
import { apiErrorMessage } from "@/lib/api/client";
import type { CreateMilestoneInput } from "@/lib/api/types";

export const milestoneKeys = {
  all: ["milestones"] as const,
  list: (projectId: number | null) => [...milestoneKeys.all, "list", projectId] as const,
};

export function useMilestones(projectId: number | null) {
  return useQuery({
    queryKey: milestoneKeys.list(projectId),
    queryFn: () => api.listMilestones(projectId ?? undefined),
    enabled: projectId !== null,
  });
}

export function useCreateMilestone(projectId: number | null) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateMilestoneInput) => api.createMilestone(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: milestoneKeys.list(projectId) }),
    onError: (err) => toast.error(apiErrorMessage(err, "Could not create milestone")),
  });
}
