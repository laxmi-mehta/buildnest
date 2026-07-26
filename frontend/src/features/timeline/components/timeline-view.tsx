"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/shared/page-header";
import { Stepper } from "@/components/shared/stepper";
import { useProjectStore } from "@/lib/store/project-store";
import { useTimeline } from "../hooks";
import { ProjectHistory } from "./project-history";

export function TimelineView() {
  const activeProjectId = useProjectStore((s) => s.activeProjectId);
  const { data, isLoading } = useTimeline(activeProjectId);

  if (!activeProjectId) {
    return (
      <div className="space-y-6">
        <PageHeader title="Timeline" description="Select a project to view its timeline" />
        <p className="text-muted-foreground text-sm">No project selected.</p>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="space-y-6">
        <PageHeader title="Timeline" />
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  const steps = data.phases.map((p) => ({ label: p.label, description: p.description }));

  return (
    <div className="space-y-6">
      <PageHeader title="Timeline" description="Phase progress and project history." />

      <Card>
        <CardHeader>
          <CardTitle>Construction phases</CardTitle>
          <CardDescription>
            {data.phases.length > 0
              ? `Currently in ${data.phases[data.current_phase_index]?.label ?? "—"}`
              : "No milestones added yet"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-muted-foreground">Overall completion</span>
              <span className="font-medium tabular-nums">{data.overall_progress}%</span>
            </div>
            <Progress value={data.overall_progress} />
          </div>
          {steps.length > 0 && <Stepper steps={steps} current={data.current_phase_index} />}
        </CardContent>
      </Card>

      <ProjectHistory history={data.history} />
    </div>
  );
}
