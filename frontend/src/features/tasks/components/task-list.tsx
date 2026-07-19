"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { CalendarClock, ListTodo, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/shared/empty-state";
import { TODAY, tasks } from "@/features/tasks/data";
import type { Task, TaskPriority, TaskStatus } from "@/features/tasks/types";
import { cn } from "@/lib/utils";

const priorityTone: Record<TaskPriority, string> = {
  high: "bg-destructive/10 text-destructive border-transparent",
  medium: "bg-warning/15 text-foreground border-transparent",
  low: "bg-muted text-muted-foreground border-transparent",
};

const tabs: { value: "all" | TaskStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "in-progress", label: "In progress" },
  { value: "completed", label: "Completed" },
];

function TaskRow({
  task,
  completed,
  onToggle,
}: {
  task: Task;
  completed: boolean;
  onToggle: (checked: boolean) => void;
}) {
  const overdue = !completed && task.dueDate < TODAY;

  return (
    <div className="hover:bg-accent/50 -mx-2 flex items-center gap-3 rounded-lg px-2 py-2.5">
      <Checkbox
        checked={completed}
        onCheckedChange={(checked) => onToggle(checked === true)}
        aria-label={`Mark "${task.title}" as ${completed ? "not completed" : "completed"}`}
      />
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "truncate text-sm font-medium",
            completed && "text-muted-foreground line-through"
          )}
        >
          {task.title}
        </p>
        <div className="text-muted-foreground mt-0.5 flex items-center gap-3 text-xs">
          <span
            className={cn(
              "flex items-center gap-1 tabular-nums",
              overdue && "text-destructive font-medium"
            )}
          >
            <CalendarClock className="size-3" />
            Due {format(parseISO(task.dueDate), "MMM d")}
            {overdue && " · overdue"}
          </span>
          <span className="flex items-center gap-1">
            <User className="size-3" />
            {task.assignee}
          </span>
        </div>
      </div>
      <Badge className={cn("capitalize", priorityTone[task.priority])}>{task.priority}</Badge>
    </div>
  );
}

export function TaskList() {
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(tasks.map((task) => [task.id, task.status === "completed"]))
  );

  const effectiveStatus = (task: Task): TaskStatus => {
    if (completedMap[task.id]) return "completed";
    return task.status === "completed" ? "open" : task.status;
  };

  const toggle = (id: string, checked: boolean) =>
    setCompletedMap((prev) => ({ ...prev, [id]: checked }));

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
            const visible =
              tab.value === "all"
                ? tasks
                : tasks.filter((task) => effectiveStatus(task) === tab.value);
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
                  visible.map((task) => (
                    <TaskRow
                      key={task.id}
                      task={task}
                      completed={completedMap[task.id] ?? false}
                      onToggle={(checked) => toggle(task.id, checked)}
                    />
                  ))
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
}
