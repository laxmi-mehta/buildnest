import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import * as api from "@/lib/api/endpoints/contractors";
import { apiErrorMessage } from "@/lib/api/client";
import type { CreateContractorInput } from "@/lib/api/types";

export const contractorKeys = {
  all: ["contractors"] as const,
  list: (projectId: number | null) => [...contractorKeys.all, "list", projectId] as const,
};

export function useContractors(projectId: number | null) {
  return useQuery({
    queryKey: contractorKeys.list(projectId),
    queryFn: () => api.listContractors(projectId ?? undefined),
    enabled: projectId !== null,
  });
}

export function useCreateContractor(projectId: number | null) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateContractorInput) => api.createContractor(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: contractorKeys.list(projectId) }),
    onError: (err) => toast.error(apiErrorMessage(err, "Could not add contractor")),
  });
}
