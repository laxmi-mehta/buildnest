import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import * as api from "@/lib/api/endpoints/expenses";
import { apiErrorMessage } from "@/lib/api/client";
import type { CreateExpenseInput } from "@/lib/api/types";

export const expenseKeys = {
  all: ["expenses"] as const,
  list: (projectId: number | null) => [...expenseKeys.all, "list", projectId] as const,
};

export function useExpenses(projectId: number | null) {
  return useQuery({
    queryKey: expenseKeys.list(projectId),
    queryFn: () => api.listExpenses(projectId ?? undefined),
    enabled: projectId !== null,
  });
}

export function useCreateExpense(projectId: number | null) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateExpenseInput) => api.createExpense(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: expenseKeys.list(projectId) }),
    onError: (err) => toast.error(apiErrorMessage(err, "Could not save expense")),
  });
}

export function useDeleteExpense(projectId: number | null) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.deleteExpense(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: expenseKeys.list(projectId) }),
    onError: (err) => toast.error(apiErrorMessage(err, "Could not delete expense")),
  });
}
