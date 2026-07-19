"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notifications, unreadCount } from "@/features/notifications/data";
import { cn, timeAgo } from "@/lib/utils";

export function NotificationBell() {
  const recent = notifications.slice(0, 5);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={`Notifications (${unreadCount} unread)`}
        >
          <Bell className="size-4" />
          {unreadCount > 0 && (
            <span className="bg-brand absolute top-1.5 right-1.5 size-2 rounded-full" aria-hidden />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b px-3 py-2.5">
          <p className="text-sm font-semibold">Notifications</p>
          <span className="text-muted-foreground text-xs">{unreadCount} unread</span>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {recent.map((n) => (
            <div
              key={n.id}
              className={cn(
                "hover:bg-accent/50 border-b px-3 py-2.5 last:border-0",
                !n.read && "bg-accent/30"
              )}
            >
              <div className="flex items-start gap-2">
                {!n.read && <span className="bg-brand mt-1.5 size-1.5 shrink-0 rounded-full" />}
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{n.title}</p>
                  <p className="text-muted-foreground line-clamp-2 text-xs">{n.body}</p>
                  <p className="text-muted-foreground/70 mt-1 text-[11px]">
                    {timeAgo(n.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
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
