"use client";

import { format, parseISO } from "date-fns";
import { CalendarClock, ListTodo } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/shared/empty-state";
import { useUpdateTask } from "@/features/tasks/hooks";
import type { ApiTask } from "@/lib/api/types";
import { cn } from "@/lib/utils";

type TabValue = "all" | "active" | "done";

const priorityTone: Record<ApiTask["priority"], string> = {
  urgent: "bg-destructive/10 text-destructive border-transparent",
  high: "bg-destructive/10 text-destructive border-transparent",
  medium: "bg-warning/15 text-foreground border-transparent",
  low: "bg-muted text-muted-foreground border-transparent",
};

const tabs: { value: TabValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "done", label: "Done" },
];

function TaskRow({ task, projectId }: { task: ApiTask; projectId: number }) {
  const { mutate: updateTask, isPending } = useUpdateTask(projectId);
  const isDone = task.status === "done";
  const today = new Date().toISOString().slice(0, 10);
  const overdue = !isDone && task.due_date !== null && task.due_date < today;

  const toggle = (checked: boolean) => {
    updateTask({ id: task.id, input: { status: checked ? "done" : "todo" } });
  };

  return (
    <div className="hover:bg-accent/50 -mx-2 flex items-center gap-3 rounded-lg px-2 py-2.5">
      <Checkbox
        checked={isDone}
        disabled={isPending}
        onCheckedChange={(checked) => toggle(checked === true)}
        aria-label={`Mark "${task.title}" as ${isDone ? "not done" : "done"}`}
      />
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "truncate text-sm font-medium",
            isDone && "text-muted-foreground line-through"
          )}
        >
          {task.title}
        </p>
        {task.due_date && (
          <div className="text-muted-foreground mt-0.5 flex items-center gap-1 text-xs">
            <CalendarClock className="size-3" />
            <span className={cn("tabular-nums", overdue && "text-destructive font-medium")}>
              Due {format(parseISO(task.due_date), "MMM d")}
              {overdue && " · overdue"}
            </span>
          </div>
        )}
      </div>
      <Badge className={cn("capitalize", priorityTone[task.priority])}>{task.priority}</Badge>
    </div>
  );
}

export function TaskList({ tasks, projectId }: { tasks: ApiTask[]; projectId: number }) {
  const filter = (tab: TabValue) => {
    if (tab === "all") return tasks;
    if (tab === "done") return tasks.filter((t) => t.status === "done");
    return tasks.filter((t) => t.status !== "done");
  };

  return (
    <Card>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => {
            const visible = filter(tab.value);
            return (
              <TabsContent key={tab.value} value={tab.value} className="mt-3 space-y-0.5">
                {visible.length === 0 ? (
                  <EmptyState
                    icon={ListTodo}
                    title="No tasks here"
                    description="Everything in this view is taken care of."
                    className="border-0 py-10"
                  />
                ) : (
                  visible.map((task) => <TaskRow key={task.id} task={task} projectId={projectId} />)
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
}
