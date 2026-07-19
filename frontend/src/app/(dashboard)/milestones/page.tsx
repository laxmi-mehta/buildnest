import type { Metadata } from "next";
import { format, parseISO } from "date-fns";
import { CheckCircle2, Circle, CircleDot, Flag, HardHat, Loader } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { milestones, milestoneStats } from "@/features/milestones/data";
import type { MilestoneStatus } from "@/features/milestones/types";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Milestones" };

const statusConfig: Record<
  MilestoneStatus,
  { icon: typeof CheckCircle2; iconClass: string; label: string; badgeClass: string }
> = {
  completed: {
    icon: CheckCircle2,
    iconClass: "text-success",
    label: "Completed",
    badgeClass: "bg-success/10 text-success border-transparent",
  },
  "in-progress": {
    icon: CircleDot,
    iconClass: "text-brand",
    label: "In progress",
    badgeClass: "bg-brand/10 text-brand border-transparent",
  },
  upcoming: {
    icon: Circle,
    iconClass: "text-muted-foreground",
    label: "Upcoming",
    badgeClass: "bg-muted text-muted-foreground border-transparent",
  },
};

function formatDate(iso: string) {
  return format(parseISO(iso), "MMM d, yyyy");
}

export default function MilestonesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Milestones"
        description="The big checkpoints between groundbreaking and move-in day."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Completed" value={String(milestoneStats.completed)} icon={CheckCircle2} />
        <StatCard label="In progress" value={String(milestoneStats.inProgress)} icon={Loader} />
        <StatCard label="Upcoming" value={String(milestoneStats.upcoming)} icon={Flag} />
      </div>

      <div className="space-y-4">
        {milestones.map((milestone) => {
          const config = statusConfig[milestone.status];
          const Icon = config.icon;
          return (
            <Card key={milestone.id}>
              <CardContent className="flex gap-4">
                <Icon className={cn("mt-0.5 size-5 shrink-0", config.iconClass)} />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-sm font-semibold">{milestone.name}</h3>
                    <Badge className={config.badgeClass}>{config.label}</Badge>
                  </div>

                  <p className="text-muted-foreground text-sm">{milestone.description}</p>

                  <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                    <span className="tabular-nums">Target {formatDate(milestone.targetDate)}</span>
                    {milestone.completedDate && (
                      <span className="tabular-nums">
                        Completed {formatDate(milestone.completedDate)}
                        {milestone.earlyNote && (
                          <span className="text-success font-medium"> · {milestone.earlyNote}</span>
                        )}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <HardHat className="size-3" />
                      {milestone.contractor}
                    </span>
                  </div>

                  {milestone.status === "in-progress" &&
                    milestone.progressPercent !== undefined && (
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-baseline justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium tabular-nums">
                            {milestone.progressPercent}%
                          </span>
                        </div>
                        <Progress value={milestone.progressPercent} />
                      </div>
                    )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
