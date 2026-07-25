import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiErrorMessage } from "@/lib/api/client";
import * as api from "@/lib/api/endpoints/budget";
import { updateProject } from "@/lib/api/endpoints/projects";

export const budgetKeys = {
  detail: (projectId: number | null) => ["budget", projectId] as const,
};

export function useBudget(projectId: number | null) {
  return useQuery({
    queryKey: budgetKeys.detail(projectId),
    queryFn: () => api.getBudget(projectId!),
    enabled: projectId !== null,
    staleTime: 30_000,
  });
}

export function useUpdateProjectBudget(projectId: number | null) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (totalBudget: number) => updateProject(projectId!, { total_budget: totalBudget }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: budgetKeys.detail(projectId) });
      toast.success("Budget updated");
    },
    onError: (err) => toast.error(apiErrorMessage(err, "Could not update budget")),
  });
}
