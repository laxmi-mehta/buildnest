import type { Metadata } from "next";
import { CalendarClock, CircleDollarSign, Gauge, ListChecks } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { CategoryComparisonChart } from "@/features/analytics/components/category-comparison-chart";
import { ContractorSpendChart } from "@/features/analytics/components/contractor-spend-chart";
import { SpendTrendChart } from "@/features/analytics/components/spend-trend-chart";
import { TaskThroughputChart } from "@/features/analytics/components/task-throughput-chart";
import { insights } from "@/features/analytics/data";
import { formatCurrency, formatPercent } from "@/lib/utils";

export const metadata: Metadata = { title: "Analytics" };

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Spend, progress, and productivity trends for Willow Creek Residence"
      />

      {/* Insights */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Avg weekly spend"
          value={formatCurrency(insights.avgWeeklySpend)}
          delta={insights.avgWeeklySpendDeltaPct}
          deltaLabel="vs previous 8 weeks"
          icon={CircleDollarSign}
        />
        <StatCard
          label="Budget efficiency"
          value={formatPercent(insights.budgetEfficiencyPct)}
          deltaLabel="actual vs planned spend"
          icon={Gauge}
        />
        <StatCard
          label="Task completion rate"
          value={formatPercent(insights.taskCompletionRatePct)}
          delta={insights.taskCompletionDeltaPct}
          deltaLabel="vs last month"
          icon={ListChecks}
        />
        <StatCard
          label="Schedule variance"
          value={`+${insights.scheduleVarianceDays} days`}
          deltaLabel="ahead of plan"
          icon={CalendarClock}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <SpendTrendChart />
        <CategoryComparisonChart />
        <ContractorSpendChart />
        <TaskThroughputChart />
      </div>
    </div>
  );
}
