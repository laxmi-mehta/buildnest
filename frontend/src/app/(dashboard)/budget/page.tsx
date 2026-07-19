import type { Metadata } from "next";
import { AlertTriangle, CircleDollarSign, PiggyBank, Receipt, Wallet } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { AdjustBudgetButton } from "@/features/budget/components/adjust-budget-button";
import { CumulativeSpendChart } from "@/features/budget/components/cumulative-spend-chart";
import { budgetAlerts, budgetCategories, budgetSummary } from "@/features/budget/data";
import { cn, formatCurrency, formatPercent } from "@/lib/utils";

export const metadata: Metadata = { title: "Budget" };

const alertTone = {
  warning: "bg-warning/15 text-warning",
  destructive: "bg-destructive/10 text-destructive",
} as const;

export default function BudgetPage() {
  const allocatedPct = Math.round((budgetSummary.allocated / budgetSummary.totalBudget) * 100);
  const remainingPct = Math.round((budgetSummary.remaining / budgetSummary.totalBudget) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Budget"
        description="Willow Creek Residence · ₹48,50,000 total budget · Finishing phase"
        actions={<AdjustBudgetButton />}
      />

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total budget"
          value={formatCurrency(budgetSummary.totalBudget)}
          icon={Wallet}
        />
        <StatCard
          label="Allocated"
          value={formatCurrency(budgetSummary.allocated)}
          deltaLabel={`${allocatedPct}% of total budget`}
          icon={PiggyBank}
        />
        <StatCard
          label="Spent to date"
          value={formatCurrency(budgetSummary.spentToDate)}
          delta={budgetSummary.spentDeltaPct}
          deltaLabel="vs last month"
          icon={Receipt}
        />
        <StatCard
          label="Remaining"
          value={formatCurrency(budgetSummary.remaining)}
          deltaLabel={`${remainingPct}% of total budget`}
          icon={CircleDollarSign}
        />
      </div>

      {/* Categories + alerts */}
      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Budget by category</CardTitle>
            <CardDescription>Allocated vs spent across all workstreams</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {budgetCategories.map((cat) => {
              const pct = (cat.spent / cat.allocated) * 100;
              const over = cat.spent > cat.allocated;
              return (
                <div key={cat.id} className="space-y-1.5">
                  <div className="flex items-baseline justify-between gap-2 text-sm">
                    <span className="font-medium">{cat.name}</span>
                    <span className="text-muted-foreground tabular-nums">
                      {formatCurrency(cat.spent)}{" "}
                      <span className="text-muted-foreground/70">
                        / {formatCurrency(cat.allocated)}
                      </span>{" "}
                      <span
                        className={cn(
                          "ml-1 font-medium",
                          over ? "text-destructive" : "text-foreground"
                        )}
                      >
                        {formatPercent(pct)}
                      </span>
                    </span>
                  </div>
                  <Progress
                    value={Math.min(pct, 100)}
                    className={cn(over && "[&>div]:bg-destructive")}
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Budget alerts</CardTitle>
            <CardDescription>Items that need your attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {budgetAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-lg",
                    alertTone[alert.tone]
                  )}
                >
                  <AlertTriangle className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm font-medium">{alert.title}</p>
                    <span className="text-muted-foreground shrink-0 text-xs">{alert.meta}</span>
                  </div>
                  <p className="text-muted-foreground mt-0.5 text-sm">{alert.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <CumulativeSpendChart />
    </div>
  );
}
