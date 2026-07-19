"use client";

import { useState } from "react";
import {
  CheckCheck,
  CircleDollarSign,
  FileText,
  HardHat,
  Info,
  ListTodo,
  Milestone,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { notifications as seed } from "@/features/notifications/data";
import type { AppNotification, NotificationKind } from "@/features/notifications/types";
import { cn, timeAgo } from "@/lib/utils";

const kindIcon: Record<NotificationKind, LucideIcon> = {
  budget: CircleDollarSign,
  task: ListTodo,
  document: FileText,
  contractor: HardHat,
  milestone: Milestone,
  system: Info,
};

/**
 * Dummy data is static, so anchor "now" to the newest entry — keeps the
 * Today/Earlier split and relative times stable until the real API lands.
 */
const referenceNow = new Date(Math.max(...seed.map((n) => new Date(n.createdAt).getTime())));

function isToday(dateString: string) {
  const date = new Date(dateString);
  return (
    date.getFullYear() === referenceNow.getFullYear() &&
    date.getMonth() === referenceNow.getMonth() &&
    date.getDate() === referenceNow.getDate()
  );
}

function NotificationRow({
  notification,
  onRead,
}: {
  notification: AppNotification;
  onRead: (id: string) => void;
}) {
  const Icon = kindIcon[notification.kind];
  return (
    <button
      type="button"
      onClick={() => onRead(notification.id)}
      className={cn(
        "hover:bg-accent/50 flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors",
        !notification.read && "bg-accent/30"
      )}
    >
      <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-lg">
        <Icon className="text-muted-foreground size-4" />
      </div>
      <div className="min-w-0 flex-1 space-y-0.5">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium">{notification.title}</p>
          {!notification.read && (
            <span className="bg-brand size-1.5 shrink-0 rounded-full" aria-label="Unread" />
          )}
        </div>
        <p className="text-muted-foreground line-clamp-2 text-sm">{notification.body}</p>
        <p className="text-muted-foreground text-xs">
          {timeAgo(notification.createdAt, referenceNow)}
        </p>
      </div>
    </button>
  );
}

function NotificationList({
  items,
  onRead,
}: {
  items: AppNotification[];
  onRead: (id: string) => void;
}) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={CheckCheck}
        title="You're all caught up"
        description="New notifications about your build will show up here."
      />
    );
  }

  const today = items.filter((n) => isToday(n.createdAt));
  const earlier = items.filter((n) => !isToday(n.createdAt));

  const groups = [
    { label: "Today", entries: today },
    { label: "Earlier", entries: earlier },
  ].filter((group) => group.entries.length > 0);

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <div key={group.label} className="space-y-2">
          <h2 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            {group.label}
          </h2>
          <Card className="gap-0 divide-y overflow-hidden py-0">
            {group.entries.map((notification) => (
              <NotificationRow key={notification.id} notification={notification} onRead={onRead} />
            ))}
          </Card>
        </div>
      ))}
    </div>
  );
}

export function NotificationsView() {
  const [items, setItems] = useState<AppNotification[]>(seed);
  const unread = items.filter((n) => !n.read);

  const markRead = (id: string) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Updates about budget, tasks, documents, and contractors."
        actions={
          <Button variant="outline" size="sm" onClick={markAllRead} disabled={unread.length === 0}>
            <CheckCheck className="size-4" /> Mark all as read
          </Button>
        }
      />

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {unread.length > 0 && (
              <Badge variant="secondary" className="px-1.5 tabular-nums">
                {unread.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <NotificationList items={items} onRead={markRead} />
        </TabsContent>
        <TabsContent value="unread" className="mt-4">
          <NotificationList items={unread} onRead={markRead} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
