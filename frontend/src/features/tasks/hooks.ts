import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import * as api from "@/lib/api/endpoints/tasks";
import { apiErrorMessage } from "@/lib/api/client";
import type { ApiTask, CreateTaskInput } from "@/lib/api/types";

export const taskKeys = {
  all: ["tasks"] as const,
  list: (projectId: number | null) => [...taskKeys.all, "list", projectId] as const,
};

export function useTasks(projectId: number | null) {
  return useQuery({
    queryKey: taskKeys.list(projectId),
    queryFn: () => api.listTasks(projectId ?? undefined),
    enabled: projectId !== null,
  });
}

export function useCreateTask(projectId: number | null) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateTaskInput) => api.createTask(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: taskKeys.list(projectId) }),
    onError: (err) => toast.error(apiErrorMessage(err, "Could not create task")),
  });
}

export function useUpdateTask(projectId: number | null) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: Partial<ApiTask> }) =>
      api.updateTask(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: taskKeys.list(projectId) }),
    onError: (err) => toast.error(apiErrorMessage(err, "Could not update task")),
  });
}
