import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/shared/page-header";
import { Stepper } from "@/components/shared/stepper";
import { ProjectHistory } from "@/features/timeline/components/project-history";
import { currentPhaseIndex, overallProgress, timelinePhases } from "@/features/timeline/data";

export const metadata: Metadata = { title: "Timeline" };

export default function TimelinePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Timeline"
        description="Phase progress and the full history of Willow Creek Residence."
      />

      <Card>
        <CardHeader>
          <CardTitle>Construction phases</CardTitle>
          <CardDescription>
            Currently in {timelinePhases[currentPhaseIndex].label} · started Jan 12, target Nov 20
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-muted-foreground">Overall completion</span>
              <span className="font-medium tabular-nums">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} />
          </div>
          <Stepper steps={timelinePhases} current={currentPhaseIndex} />
        </CardContent>
      </Card>

      <ProjectHistory />
    </div>
  );
}
