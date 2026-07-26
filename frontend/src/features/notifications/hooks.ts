import { useQuery } from "@tanstack/react-query";
import * as api from "@/lib/api/endpoints/notifications";

export const notificationKeys = {
  list: (projectId: number | null) => ["notifications", projectId] as const,
};

export function useNotifications(projectId: number | null) {
  return useQuery({
    queryKey: notificationKeys.list(projectId),
    queryFn: () => api.getNotifications(projectId!),
    enabled: projectId !== null,
    staleTime: 60_000,
  });
}
