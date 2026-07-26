import { useQuery } from "@tanstack/react-query";
import * as api from "@/lib/api/endpoints/notifications";

export const notificationKeys = {
  all: ["notifications"] as const,
};

export function useNotifications() {
  return useQuery({
    queryKey: notificationKeys.all,
    queryFn: api.getNotifications,
    staleTime: 30_000,
  });
}
