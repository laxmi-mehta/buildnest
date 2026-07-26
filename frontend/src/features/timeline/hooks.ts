import { useQuery } from "@tanstack/react-query";
import * as api from "@/lib/api/endpoints/timeline";

export const timelineKeys = {
  detail: (projectId: number | null) => ["timeline", projectId] as const,
};

export function useTimeline(projectId: number | null) {
  return useQuery({
    queryKey: timelineKeys.detail(projectId),
    queryFn: () => api.getTimeline(projectId!),
    enabled: projectId !== null,
    staleTime: 60_000,
  });
}
