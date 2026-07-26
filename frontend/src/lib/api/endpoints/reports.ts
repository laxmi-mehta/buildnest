import { apiClient } from "../client";

export interface ApiMonthlySummary {
  year: number;
  month: number;
  label: string;
  total_spend: string;
  expense_count: number;
  tasks_completed: number;
  delta_pct: number | null;
}

export interface ApiReports {
  monthly_summaries: ApiMonthlySummary[];
}

export function getReports(projectId: number): Promise<ApiReports> {
  return apiClient<ApiReports>(`/projects/${projectId}/reports/`);
}
