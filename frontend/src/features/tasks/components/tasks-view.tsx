"use client";

import { CalendarClock, CheckCircle2, FolderKanban, ListTodo } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { StatCard } from "@/components/shared/stat-card";
import { useTasks } from "@/features/tasks/hooks";
import { useProjectStore } from "@/lib/store/project-store";
import { TaskList } from "./task-list";

export function TasksView() {
  const { activeProjectId } = useProjectStore();
  const { data, isLoading } = useTasks(activeProjectId);
  const today = new Date().toISOString().slice(0, 10);
  const weekEnd = new Date(Date.now() + 7 * 86400_000).toISOString().slice(0, 10);

  if (!activeProjectId) {
    return (
      <EmptyState
        icon={FolderKanban}
        title="No project selected"
        description="Go to Projects, select a project, then come back to manage its tasks."
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
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  const tasks = data?.results ?? [];
  const open = tasks.filter((t) => t.status !== "done").length;
  const dueThisWeek = tasks.filter(
    (t) => t.status !== "done" && t.due_date && t.due_date >= today && t.due_date <= weekEnd
  ).length;
  const completedThisMonth = tasks.filter(
    (t) => t.status === "done" && t.updated_at.slice(0, 7) === today.slice(0, 7)
  ).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Open" value={String(open)} icon={ListTodo} />
        <StatCard label="Due this week" value={String(dueThisWeek)} icon={CalendarClock} />
        <StatCard
          label="Completed this month"
          value={String(completedThisMonth)}
          icon={CheckCircle2}
        />
      </div>
      <TaskList tasks={tasks} projectId={activeProjectId} />
    </div>
  );
}
