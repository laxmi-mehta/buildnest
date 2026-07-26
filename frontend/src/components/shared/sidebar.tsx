"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Logo } from "@/components/shared/logo";
import { navigation, secondaryNavigation, type NavItem } from "@/config/navigation";
import { useUiStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils";

function SidebarLink({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const pathname = usePathname();
  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

  const link = (
    <Link
      href={item.href}
      className={cn(
        "group flex h-8 items-center gap-2.5 rounded-md px-2.5 text-sm transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
          : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
        collapsed && "justify-center px-0"
      )}
      aria-current={active ? "page" : undefined}
    >
      <item.icon className="size-4 shrink-0" strokeWidth={active ? 2.25 : 2} />
      {!collapsed && <span className="truncate">{item.title}</span>}
      {!collapsed && item.badge && (
        <Badge variant="secondary" className="ml-auto h-5 min-w-5 px-1.5 text-[11px] tabular-nums">
          {item.badge}
        </Badge>
      )}
    </Link>
  );

  if (!collapsed) return link;
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent side="right">{item.title}</TooltipContent>
    </Tooltip>
  );
}

export function Sidebar() {
  const collapsed = useUiStore((s) => s.sidebarCollapsed);
  const toggle = useUiStore((s) => s.toggleSidebar);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <aside
      className={cn(
        "bg-sidebar border-sidebar-border sticky top-0 hidden h-dvh shrink-0 flex-col border-r md:flex",
        mounted && "transition-[width] duration-200 ease-out",
        collapsed ? "w-14" : "w-60"
      )}
    >
      <div className={cn("flex h-14 items-center px-4", collapsed && "justify-center px-0")}>
        <Logo compact={collapsed} />
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-2 py-2" aria-label="Main">
        {navigation.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className="text-muted-foreground/70 mb-1 px-2.5 text-[11px] font-medium tracking-wide uppercase">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <SidebarLink key={item.href} item={item} collapsed={collapsed} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-sidebar-border space-y-0.5 border-t px-2 py-2">
        {secondaryNavigation.map((item) => (
          <SidebarLink key={item.href} item={item} collapsed={collapsed} />
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggle}
          className={cn(
            "text-muted-foreground h-8 w-full justify-start gap-2.5 px-2.5",
            collapsed && "justify-center px-0"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
          {!collapsed && <span className="text-sm">Collapse</span>}
        </Button>
      </div>
    </aside>
  );
}
