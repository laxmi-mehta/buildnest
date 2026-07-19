/** Realistic dummy data for the tasks page. Swaps to the API layer later. */

import type { Task } from "./types";

/** Stable "today" so overdue states render consistently with the dummy data. */
export const TODAY = "2026-07-17";

export const taskAssignees = [
  "You",
  "Sharma Plumbing",
  "Kumar Mechanical",
  "Volt Electric",
  "OakLine Carpentry",
  "StoneWorks Masonry",
  "Summit Roofing",
];

export const tasks: Task[] = [
  // In progress
  {
    id: "tsk_01",
    title: "Final plumbing inspection walkthrough",
    priority: "high",
    dueDate: "2026-07-15",
    assignee: "Sharma Plumbing",
    status: "in-progress",
  },
  {
    id: "tsk_02",
    title: "Install recessed lighting — Level 2",
    priority: "high",
    dueDate: "2026-07-20",
    assignee: "Volt Electric",
    status: "in-progress",
  },
  {
    id: "tsk_03",
    title: "Hang interior doors",
    priority: "medium",
    dueDate: "2026-07-23",
    assignee: "OakLine Carpentry",
    status: "in-progress",
  },

  // Open
  {
    id: "tsk_04",
    title: "Choose master bath tile & grout color",
    priority: "medium",
    dueDate: "2026-07-16",
    assignee: "You",
    status: "open",
  },
  {
    id: "tsk_05",
    title: "Approve kitchen cabinet hardware",
    priority: "medium",
    dueDate: "2026-07-18",
    assignee: "You",
    status: "open",
  },
  {
    id: "tsk_06",
    title: "Schedule HVAC balancing test",
    priority: "low",
    dueDate: "2026-07-21",
    assignee: "Kumar Mechanical",
    status: "open",
  },
  {
    id: "tsk_07",
    title: "Order exterior light fixtures",
    priority: "low",
    dueDate: "2026-07-24",
    assignee: "You",
    status: "open",
  },
  {
    id: "tsk_08",
    title: "Submit final electrical inspection request",
    priority: "high",
    dueDate: "2026-07-31",
    assignee: "Volt Electric",
    status: "open",
  },

  // Completed
  {
    id: "tsk_09",
    title: "Drywall finish — Level 2 hallway",
    priority: "medium",
    dueDate: "2026-07-08",
    assignee: "OakLine Carpentry",
    status: "completed",
  },
  {
    id: "tsk_10",
    title: "Roof flashing touch-up",
    priority: "low",
    dueDate: "2026-07-05",
    assignee: "Summit Roofing",
    status: "completed",
  },
  {
    id: "tsk_11",
    title: "HVAC filter install & startup",
    priority: "medium",
    dueDate: "2026-07-02",
    assignee: "Kumar Mechanical",
    status: "completed",
  },
  {
    id: "tsk_12",
    title: "Confirm limestone veneer delivery window",
    priority: "low",
    dueDate: "2026-06-26",
    assignee: "StoneWorks Masonry",
    status: "completed",
  },
];

export const taskStats = {
  open: tasks.filter((t) => t.status !== "completed").length,
  dueThisWeek: tasks.filter(
    (t) => t.status !== "completed" && t.dueDate >= "2026-07-13" && t.dueDate <= "2026-07-19"
  ).length,
  completedThisMonth: tasks.filter((t) => t.status === "completed" && t.dueDate >= "2026-07-01")
    .length,
};
