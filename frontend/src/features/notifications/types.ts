export type NotificationKind =
  "budget" | "task" | "document" | "contractor" | "milestone" | "system";

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
}
