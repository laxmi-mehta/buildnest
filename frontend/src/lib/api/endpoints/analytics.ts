import { apiClient } from "../client";

export interface ApiAnalyticsInsights {
  total_spend: string;
  avg_weekly_spend: string;
  task_completion_rate_pct: number;
  total_tasks: number;
  completed_tasks: number;
}

export interface WeeklySpend {
  week: string;
  spent: string;
}

export interface CategoryBreakdown {
  category: string;
  label: string;
  spent: string;
}

export interface ContractorSpend {
  payee: string;
  spent: string;
}

export interface TaskThroughput {
  week: string;
  created: number;
  completed: number;
}

export interface ApiAnalytics {
  insights: ApiAnalyticsInsights;
  weekly_spend: WeeklySpend[];
  category_breakdown: CategoryBreakdown[];
  contractor_spend: ContractorSpend[];
  task_throughput: TaskThroughput[];
}

export function getAnalytics(projectId: number): Promise<ApiAnalytics> {
  return apiClient<ApiAnalytics>(`/projects/${projectId}/analytics/`);
}
