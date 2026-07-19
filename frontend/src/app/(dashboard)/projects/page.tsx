import type { Metadata } from "next";
import { CalendarRange, FolderKanban, MapPin } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { NewProjectButton } from "@/features/projects/components/new-project-button";
import { projects, type ProjectStatus } from "@/features/projects/data";
import { cn, formatCurrency, getInitials } from "@/lib/utils";

export const metadata: Metadata = { title: "Projects" };

const statusTone: Record<ProjectStatus, string> = {
  active: "text-success border-success/30",
  planning: "text-chart-1 border-chart-1/30",
  "on hold": "text-warning border-warning/40",
  completed: "text-muted-foreground border-border",
};

export default function ProjectsPage() {
  const active = projects.filter((p) => p.status === "active" || p.status === "planning");
  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="Every build you're planning, running or have completed."
        actions={<NewProjectButton />}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total projects" value={String(projects.length)} icon={FolderKanban} />
        <StatCard label="In flight" value={String(active.length)} />
        <StatCard label="Combined budget" value={formatCurrency(totalBudget)} />
        <StatCard label="Combined spend" value={formatCurrency(totalSpent)} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-base leading-tight font-semibold">{project.name}</h2>
                <Badge
                  variant="outline"
                  className={cn("shrink-0 capitalize", statusTone[project.status])}
                >
                  {project.status}
                </Badge>
              </div>
              <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
                <MapPin className="size-3.5 shrink-0" /> {project.address}
              </p>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-muted-foreground">{project.phase}</span>
                  <span className="font-medium tabular-nums">{project.progressPercent}%</span>
                </div>
                <Progress value={project.progressPercent} />
              </div>
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-muted-foreground">Budget</span>
                <span className="tabular-nums">
                  <span className="font-medium">{formatCurrency(project.spent)}</span>
                  <span className="text-muted-foreground"> / {formatCurrency(project.budget)}</span>
                </span>
              </div>
              <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <CalendarRange className="size-3.5" />
                {new Date(project.startedAt).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
                {" → "}
                {new Date(project.targetCompletion).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </CardContent>
            <CardFooter className="justify-between border-t pt-4!">
              <div className="flex -space-x-2">
                {project.contractors.map((name) => (
                  <Avatar key={name} className="ring-background size-6 ring-2">
                    <AvatarFallback className="text-[9px]">{getInitials(name)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-muted-foreground text-xs">Updated {project.updated}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
