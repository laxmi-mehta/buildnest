"use client";

import { format, parseISO } from "date-fns";
import { CheckCircle2, Circle, CircleDot, Flag, FolderKanban, Loader } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { StatCard } from "@/components/shared/stat-card";
import { useMilestones } from "@/features/milestones/hooks";
import { useProjectStore } from "@/lib/store/project-store";
import type { ApiMilestone } from "@/lib/api/types";
import { cn } from "@/lib/utils";

type DisplayStatus = "completed" | "in_progress" | "pending" | "delayed";

const STATUS_CONFIG: Record<
  DisplayStatus,
  { icon: typeof CheckCircle2; iconClass: string; label: string; badgeClass: string }
> = {
  completed: {
    icon: CheckCircle2,
    iconClass: "text-success",
    label: "Completed",
    badgeClass: "bg-success/10 text-success border-transparent",
  },
  in_progress: {
    icon: CircleDot,
    iconClass: "text-brand",
    label: "In progress",
    badgeClass: "bg-brand/10 text-brand border-transparent",
  },
  pending: {
    icon: Circle,
    iconClass: "text-muted-foreground",
    label: "Pending",
    badgeClass: "bg-muted text-muted-foreground border-transparent",
  },
  delayed: {
    icon: Flag,
    iconClass: "text-destructive",
    label: "Delayed",
    badgeClass: "bg-destructive/10 text-destructive border-transparent",
  },
};

function MilestoneCard({ milestone }: { milestone: ApiMilestone }) {
  const config = STATUS_CONFIG[milestone.status];
  const Icon = config.icon;

  return (
    <Card>
      <CardContent className="flex gap-4">
        <Icon className={cn("mt-0.5 size-5 shrink-0", config.iconClass)} />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="text-sm font-semibold">{milestone.name}</h3>
            <Badge className={config.badgeClass}>{config.label}</Badge>
          </div>
          {milestone.description && (
            <p className="text-muted-foreground text-sm">{milestone.description}</p>
          )}
          <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
            {milestone.target_date && (
              <span className="tabular-nums">
                Target {format(parseISO(milestone.target_date), "MMM d, yyyy")}
              </span>
            )}
            {milestone.completed_date && (
              <span className="text-success tabular-nums">
                Completed {format(parseISO(milestone.completed_date), "MMM d, yyyy")}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function MilestonesView() {
  const { activeProjectId } = useProjectStore();
  const { data, isLoading } = useMilestones(activeProjectId);

  if (!activeProjectId) {
    return (
      <EmptyState
        icon={FolderKanban}
        title="No project selected"
        description="Go to Projects, select a project, then come back to manage its milestones."
      />
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const milestones = data?.results ?? [];
  const completed = milestones.filter((m) => m.status === "completed").length;
  const inProgress = milestones.filter((m) => m.status === "in_progress").length;
  const pending = milestones.filter((m) => m.status === "pending" || m.status === "delayed").length;

  if (milestones.length === 0) {
    return (
      <EmptyState
        icon={Flag}
        title="No milestones yet"
        description="Add milestones to track the big checkpoints of your build."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Completed" value={String(completed)} icon={CheckCircle2} />
        <StatCard label="In progress" value={String(inProgress)} icon={Loader} />
        <StatCard label="Pending / delayed" value={String(pending)} icon={Flag} />
      </div>
      <div className="space-y-4">
        {milestones.map((m) => (
          <MilestoneCard key={m.id} milestone={m} />
        ))}
      </div>
    </div>
  );
}
