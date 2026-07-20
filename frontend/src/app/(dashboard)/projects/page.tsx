import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { NewProjectButton } from "@/features/projects/components/new-project-button";
import { ProjectsView } from "@/features/projects/components/projects-view";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="Every build you're planning, running or have completed."
        actions={<NewProjectButton />}
      />
      <ProjectsView />
    </div>
  );
}
