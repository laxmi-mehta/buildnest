"use client";

import { CircleDollarSign, Clock4, FolderKanban, Receipt } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { StatCard } from "@/components/shared/stat-card";
import { useExpenses } from "@/features/expenses/hooks";
import { useProjectStore } from "@/lib/store/project-store";
import { formatCurrency } from "@/lib/utils";
import { ExpensesTable } from "./expenses-table";

export function ExpensesView() {
  const { activeProjectId } = useProjectStore();
  const { data, isLoading } = useExpenses(activeProjectId);

  if (!activeProjectId) {
    return (
      <EmptyState
        icon={FolderKanban}
        title="No project selected"
        description="Go to Projects, select a project, then come back to see its expenses."
      />
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  const expenses = data?.results ?? [];
  const total = expenses.reduce((s, e) => s + parseFloat(e.amount), 0);
  const largest = expenses.reduce(
    (max, e) => (parseFloat(e.amount) > max ? parseFloat(e.amount) : max),
    0
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total recorded"
          value={formatCurrency(total)}
          deltaLabel={`${expenses.length} entries`}
          icon={CircleDollarSign}
        />
        <StatCard
          label="This project"
          value={String(expenses.length)}
          deltaLabel="expense entries"
          icon={Clock4}
        />
        <StatCard label="Largest expense" value={formatCurrency(largest)} icon={Receipt} />
      </div>

      <ExpensesTable expenses={expenses} />
    </div>
  );
}
