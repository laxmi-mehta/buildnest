"use client";

import { CalendarClock, CircleDollarSign, Gauge, ListChecks } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { useProjectStore } from "@/lib/store/project-store";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { useAnalytics } from "../hooks";
import { CategoryComparisonChart } from "./category-comparison-chart";
import { ContractorSpendChart } from "./contractor-spend-chart";
import { SpendTrendChart } from "./spend-trend-chart";
import { TaskThroughputChart } from "./task-throughput-chart";

export function AnalyticsView() {
  const activeProjectId = useProjectStore((s) => s.activeProjectId);
  const { data, isLoading } = useAnalytics(activeProjectId);

  if (!activeProjectId) {
    return (
      <div className="space-y-6">
        <PageHeader title="Analytics" description="Select a project to view analytics" />
        <p className="text-muted-foreground text-sm">No project selected.</p>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="space-y-6">
        <PageHeader title="Analytics" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const { insights, weekly_spend, category_breakdown, contractor_spend, task_throughput } = data;
  const completionRate = insights.task_completion_rate_pct;
  const avgWeekly = Number(insights.avg_weekly_spend);

  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Spend, progress, and productivity trends" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Avg weekly spend"
          value={formatCurrency(avgWeekly)}
          deltaLabel="last 8 weeks with activity"
          icon={CircleDollarSign}
        />
        <StatCard
          label="Total spend"
          value={formatCurrency(Number(insights.total_spend))}
          deltaLabel="all time"
          icon={Gauge}
        />
        <StatCard
          label="Task completion rate"
          value={formatPercent(completionRate)}
          deltaLabel={`${insights.completed_tasks} of ${insights.total_tasks} tasks done`}
          icon={ListChecks}
        />
        <StatCard
          label="Total tasks"
          value={String(insights.total_tasks)}
          deltaLabel={`${insights.completed_tasks} completed`}
          icon={CalendarClock}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {weekly_spend.length > 0 ? (
          <SpendTrendChart data={weekly_spend} />
        ) : (
          <Skeleton className="h-64 rounded-xl" />
        )}
        {category_breakdown.length > 0 ? (
          <CategoryComparisonChart data={category_breakdown} />
        ) : (
          <Skeleton className="h-64 rounded-xl" />
        )}
        {contractor_spend.length > 0 ? (
          <ContractorSpendChart data={contractor_spend} />
        ) : (
          <Skeleton className="h-64 rounded-xl" />
        )}
        {task_throughput.length > 0 ? (
          <TaskThroughputChart data={task_throughput} />
        ) : (
          <Skeleton className="h-64 rounded-xl" />
        )}
      </div>
    </div>
  );
}
