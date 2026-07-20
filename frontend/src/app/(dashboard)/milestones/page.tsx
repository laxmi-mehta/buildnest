import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { MilestonesView } from "@/features/milestones/components/milestones-view";

export const metadata: Metadata = { title: "Milestones" };

export default function MilestonesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Milestones"
        description="The big checkpoints between groundbreaking and move-in day."
      />
      <MilestonesView />
    </div>
  );
}
