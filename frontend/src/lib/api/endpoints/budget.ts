import { apiClient } from "../client";

export interface BudgetByCategory {
  category: string;
  label: string;
  spent: string;
}

export interface MonthlySpend {
  year: number;
  month: number;
  spent: string;
  cumulative: string;
}

export interface ApiBudget {
  total_budget: string;
  spent_to_date: string;
  remaining: string;
  by_category: BudgetByCategory[];
  monthly_spend: MonthlySpend[];
}

export function getBudget(projectId: number): Promise<ApiBudget> {
  return apiClient<ApiBudget>(`/projects/${projectId}/budget/`);
}
