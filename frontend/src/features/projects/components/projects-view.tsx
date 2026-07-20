"use client";

import { CalendarRange, FolderKanban, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { StatCard } from "@/components/shared/stat-card";
import { useProjects } from "@/features/projects/hooks";
import { useProjectStore } from "@/lib/store/project-store";
import { cn, formatCurrency } from "@/lib/utils";

const STATUS_DISPLAY = {
  planning: { label: "Planning", className: "text-chart-1 border-chart-1/30" },
  active: { label: "Active", className: "text-success border-success/30" },
  on_hold: { label: "On Hold", className: "text-warning border-warning/40" },
  completed: { label: "Completed", className: "text-muted-foreground border-border" },
} as const;

export function ProjectsView() {
  const { data, isLoading } = useProjects();
  const { activeProjectId, setActiveProjectId } = useProjectStore();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-52 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const projects = data?.results ?? [];
  const active = projects.filter((p) => p.status === "active" || p.status === "planning");
  const totalBudget = projects.reduce(
    (s, p) => s + (p.total_budget ? parseFloat(p.total_budget) : 0),
    0
  );
  const activeName = projects.find((p) => p.id === activeProjectId)?.name;

  if (projects.length === 0) {
    return (
      <EmptyState
        icon={FolderKanban}
        title="No projects yet"
        description="Create your first project to start tracking your build."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total projects" value={String(projects.length)} icon={FolderKanban} />
        <StatCard label="In flight" value={String(active.length)} />
        <StatCard label="Combined budget" value={formatCurrency(totalBudget)} />
        <StatCard label="Active context" value={activeName ?? "None selected"} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => {
          const s = STATUS_DISPLAY[project.status];
          const isActive = activeProjectId === project.id;
          return (
            <Card key={project.id} className={cn("flex flex-col", isActive && "ring-brand ring-2")}>
              <CardHeader className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-base leading-tight font-semibold">{project.name}</h2>
                  <Badge variant="outline" className={cn("shrink-0", s.className)}>
                    {s.label}
                  </Badge>
                </div>
                <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
                  <MapPin className="size-3.5 shrink-0" /> {project.city}
                </p>
              </CardHeader>

              <CardContent className="flex-1 space-y-3">
                {project.total_budget && (
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="text-muted-foreground">Budget</span>
                    <span className="font-medium tabular-nums">
                      {formatCurrency(parseFloat(project.total_budget))}
                    </span>
                  </div>
                )}
                {(project.start_date || project.expected_end_date) && (
                  <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                    <CalendarRange className="size-3.5" />
                    {project.start_date &&
                      new Date(project.start_date).toLocaleDateString("en-IN", {
                        month: "short",
                        year: "numeric",
                      })}
                    {project.start_date && project.expected_end_date && " → "}
                    {project.expected_end_date &&
                      new Date(project.expected_end_date).toLocaleDateString("en-IN", {
                        month: "short",
                        year: "numeric",
                      })}
                  </p>
                )}
              </CardContent>

              <CardFooter className="border-t pt-4!">
                <Button
                  size="sm"
                  variant={isActive ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setActiveProjectId(isActive ? null : project.id)}
                >
                  {isActive ? "Active — click to deselect" : "Select as active project"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
