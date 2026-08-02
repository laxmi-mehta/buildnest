"use client";

import { useEffect } from "react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { MobileNav } from "@/components/shared/mobile-nav";
import { NotificationBell } from "@/components/shared/notification-bell";
import { ProfileMenu } from "@/components/shared/profile-menu";
import { SearchBox } from "@/components/shared/search-box";
import { ThemeSwitch } from "@/components/shared/theme-switch";
import { Separator } from "@/components/ui/separator";
import { useProjects } from "@/features/projects/hooks";
import { useProjectStore } from "@/lib/store/project-store";

export function Navbar() {
  const { data: projects } = useProjects();
  const { activeProjectId, setActiveProjectId } = useProjectStore();

  // Auto-select the first project if none is stored yet
  useEffect(() => {
    if (!activeProjectId && projects && projects.results.length > 0) {
      setActiveProjectId(projects.results[0].id);
    }
  }, [projects, activeProjectId, setActiveProjectId]);

  return (
    <header className="bg-background/80 sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b px-4 backdrop-blur-sm md:px-6">
      <MobileNav />
      <div className="hidden md:block">
        <Breadcrumbs />
      </div>
      <div className="ml-auto flex items-center gap-1.5">
        <SearchBox className="mr-1 hidden w-56 sm:flex" />
        <ThemeSwitch />
        <NotificationBell />
        <Separator orientation="vertical" className="mx-1 h-5" />
        <ProfileMenu />
      </div>
    </header>
  );
}
