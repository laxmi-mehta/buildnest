export type MilestoneStatus = "completed" | "in-progress" | "upcoming";

export interface Milestone {
  id: string;
  name: string;
  description: string;
  /** ISO date, e.g. "2026-04-22". */
  targetDate: string;
  /** ISO date; only set when status is "completed". */
  completedDate?: string;
  /** e.g. "4 days early" — rendered as a success note. */
  earlyNote?: string;
  /** Only set for the in-progress milestone. */
  progressPercent?: number;
  contractor: string;
  status: MilestoneStatus;
}
