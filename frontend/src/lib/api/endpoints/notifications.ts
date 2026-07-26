import { apiClient } from "../client";
import type { NotificationKind } from "@/features/notifications/types";

export interface ApiNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  created_at: string;
  read: boolean;
}

export function getNotifications(projectId: number): Promise<ApiNotification[]> {
  return apiClient<ApiNotification[]>(`/projects/${projectId}/notifications/`);
}
