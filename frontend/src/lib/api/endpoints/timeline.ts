import { apiClient } from "../client";

export interface ApiPhase {
  id: number;
  label: string;
  description: string;
  status: "pending" | "in_progress" | "completed" | "delayed";
  target_date: string | null;
  completed_date: string | null;
}

export type HistoryCategory = "milestone" | "expense" | "issue" | "general";

export interface ApiHistoryEntry {
  id: string;
  type: string;
  title: string;
  description: string;
  date: string;
  category: HistoryCategory;
}

export interface ApiTimeline {
  phases: ApiPhase[];
  current_phase_index: number;
  overall_progress: number;
  history: ApiHistoryEntry[];
}

export function getTimeline(projectId: number): Promise<ApiTimeline> {
  return apiClient<ApiTimeline>(`/projects/${projectId}/timeline/`);
}
