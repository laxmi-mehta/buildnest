import type { Metadata } from "next";
import { CalendarClock, CheckCircle2, ListTodo } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { NewTaskDialog } from "@/features/tasks/components/new-task-dialog";
import { TaskList } from "@/features/tasks/components/task-list";
import { taskStats } from "@/features/tasks/data";

export const metadata: Metadata = { title: "Tasks" };

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Tasks"
        description="Everything that needs doing to keep the build moving."
        actions={<NewTaskDialog />}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Open" value={String(taskStats.open)} icon={ListTodo} />
        <StatCard
          label="Due this week"
          value={String(taskStats.dueThisWeek)}
          icon={CalendarClock}
        />
        <StatCard
          label="Completed this month"
          value={String(taskStats.completedThisMonth)}
          icon={CheckCircle2}
        />
      </div>

      <TaskList />
    </div>
  );
}
