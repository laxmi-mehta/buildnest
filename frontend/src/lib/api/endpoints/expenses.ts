import { apiClient, type Paginated } from "../client";
import type { ApiExpense, CreateExpenseInput } from "../types";

export function listExpenses(projectId?: number): Promise<Paginated<ApiExpense>> {
  const params = projectId ? `?project=${projectId}` : "";
  return apiClient(`/expenses/${params}`);
}

export function getExpense(id: number): Promise<ApiExpense> {
  return apiClient(`/expenses/${id}/`);
}

export function createExpense(input: CreateExpenseInput): Promise<ApiExpense> {
  return apiClient("/expenses/", { method: "POST", body: input });
}

export function updateExpense(id: number, input: Partial<CreateExpenseInput>): Promise<ApiExpense> {
  return apiClient(`/expenses/${id}/`, { method: "PATCH", body: input });
}

export function deleteExpense(id: number): Promise<void> {
  return apiClient(`/expenses/${id}/`, { method: "DELETE" });
}
