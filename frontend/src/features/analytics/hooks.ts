import { useQuery } from "@tanstack/react-query";
import * as api from "@/lib/api/endpoints/analytics";

export const analyticsKeys = {
  detail: (projectId: number | null) => ["analytics", projectId] as const,
};

export function useAnalytics(projectId: number | null) {
  return useQuery({
    queryKey: analyticsKeys.detail(projectId),
    queryFn: () => api.getAnalytics(projectId!),
    enabled: projectId !== null,
    staleTime: 60_000,
  });
}
