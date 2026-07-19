export type HistoryCategory = "milestone" | "expense" | "issue" | "general";

export interface HistoryEntry {
  id: string;
  /** Month heading the entry is grouped under, e.g. "July 2026". */
  month: string;
  title: string;
  description: string;
  /** Short date label, e.g. "Jul 14". */
  meta: string;
  category: HistoryCategory;
}
