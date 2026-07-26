import { useQuery } from "@tanstack/react-query";
import * as api from "@/lib/api/endpoints/reports";

export const reportsKeys = {
  detail: (projectId: number | null) => ["reports", projectId] as const,
};

export function useReports(projectId: number | null) {
  return useQuery({
    queryKey: reportsKeys.detail(projectId),
    queryFn: () => api.getReports(projectId!),
    enabled: projectId !== null,
    staleTime: 60_000,
  });
}
