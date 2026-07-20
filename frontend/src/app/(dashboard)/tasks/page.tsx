import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { NewTaskDialog } from "@/features/tasks/components/new-task-dialog";
import { TasksView } from "@/features/tasks/components/tasks-view";

export const metadata: Metadata = { title: "Tasks" };

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Tasks"
        description="Everything that needs doing to keep the build moving."
        actions={<NewTaskDialog />}
      />
      <TasksView />
    </div>
  );
}
