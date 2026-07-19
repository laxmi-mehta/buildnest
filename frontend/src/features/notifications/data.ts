import type { AppNotification } from "./types";

export const notifications: AppNotification[] = [
  {
    id: "ntf_01",
    kind: "budget",
    title: "Budget threshold reached",
    body: "Electrical work has used 85% of its allocated budget.",
    createdAt: "2026-07-14T08:20:00Z",
    read: false,
  },
  {
    id: "ntf_02",
    kind: "task",
    title: "Task due tomorrow",
    body: "“Final plumbing inspection walkthrough” is due Jul 15.",
    createdAt: "2026-07-14T06:05:00Z",
    read: false,
  },
  {
    id: "ntf_03",
    kind: "contractor",
    title: "New message from Sharma Plumbing",
    body: "“We can move the rough-in to Thursday if that works…”",
    createdAt: "2026-07-13T17:42:00Z",
    read: false,
  },
  {
    id: "ntf_04",
    kind: "document",
    title: "Permit approved",
    body: "BBMP approved the electrical permit (E-2094).",
    createdAt: "2026-07-13T11:15:00Z",
    read: false,
  },
  {
    id: "ntf_05",
    kind: "milestone",
    title: "Milestone completed",
    body: "Framing signed off — 4 days ahead of schedule.",
    createdAt: "2026-07-11T15:30:00Z",
    read: true,
  },
  {
    id: "ntf_06",
    kind: "system",
    title: "Weekly report ready",
    body: "Your construction progress report for Jul 6–12 is ready to view.",
    createdAt: "2026-07-12T07:00:00Z",
    read: true,
  },
  {
    id: "ntf_07",
    kind: "budget",
    title: "Large expense recorded",
    body: "₹48,500 logged for kitchen cabinetry deposit.",
    createdAt: "2026-07-10T13:48:00Z",
    read: true,
  },
];

export const unreadCount = notifications.filter((n) => !n.read).length;
