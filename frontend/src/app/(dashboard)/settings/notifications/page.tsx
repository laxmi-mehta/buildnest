import type { Metadata } from "next";
import { NotificationPreferences } from "@/features/settings/components/notification-preferences";

export const metadata: Metadata = { title: "Notification settings" };

export default function NotificationSettingsPage() {
  return <NotificationPreferences />;
}
