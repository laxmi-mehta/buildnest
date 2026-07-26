"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/features/notifications/hooks";
import { cn, timeAgo } from "@/lib/utils";
import { useProjectStore } from "@/lib/store/project-store";

export function NotificationBell() {
  const activeProjectId = useProjectStore((s) => s.activeProjectId);
  const { data: notifications = [] } = useNotifications(activeProjectId);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const unread = notifications.filter((n) => !readIds.has(n.id));
  const recent = notifications.slice(0, 5);

  function markAllRead() {
    setReadIds(new Set(notifications.map((n) => n.id)));
  }

  return (
    <DropdownMenu onOpenChange={(open) => open && markAllRead()}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={`Notifications${unread.length > 0 ? ` (${unread.length} unread)` : ""}`}
        >
          <Bell className="size-4" />
          {unread.length > 0 && (
            <span className="bg-brand absolute top-1.5 right-1.5 size-2 rounded-full" aria-hidden />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b px-3 py-2.5">
          <p className="text-sm font-semibold">Notifications</p>
          {unread.length > 0 && (
            <span className="text-muted-foreground text-xs">{unread.length} unread</span>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {recent.length === 0 ? (
            <p className="text-muted-foreground px-3 py-6 text-center text-sm">
              {activeProjectId ? "No notifications" : "Select a project to see notifications"}
            </p>
          ) : (
            recent.map((n) => {
              const isUnread = !readIds.has(n.id);
              return (
                <div
                  key={n.id}
                  className={cn(
                    "hover:bg-accent/50 border-b px-3 py-2.5 last:border-0",
                    isUnread && "bg-accent/30"
                  )}
                >
                  <div className="flex items-start gap-2">
                    {isUnread && (
                      <span className="bg-brand mt-1.5 size-1.5 shrink-0 rounded-full" />
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{n.title}</p>
                      <p className="text-muted-foreground line-clamp-2 text-xs">{n.body}</p>
                      <p className="text-muted-foreground/70 mt-1 text-[11px]">
                        {timeAgo(n.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="border-t p-1">
          <Button variant="ghost" size="sm" className="w-full" asChild>
            <Link href="/notifications">View all notifications</Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
