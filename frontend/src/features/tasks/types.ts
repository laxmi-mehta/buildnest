export type TaskPriority = "high" | "medium" | "low";

export type TaskStatus = "open" | "in-progress" | "completed";

export interface Task {
  id: string;
  title: string;
  priority: TaskPriority;
  /** ISO date, e.g. "2026-07-18". */
  dueDate: string;
  assignee: string;
  status: TaskStatus;
}
