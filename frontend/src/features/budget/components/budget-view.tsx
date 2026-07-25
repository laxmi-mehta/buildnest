"use client";

import { AlertTriangle, CircleDollarSign, PiggyBank, Receipt, Wallet } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { useProjectStore } from "@/lib/store/project-store";
import { cn, formatCurrency, formatPercent } from "@/lib/utils";
import { AdjustBudgetButton } from "./adjust-budget-button";
import { CumulativeSpendChart } from "./cumulative-spend-chart";
import { useBudget } from "../hooks";
import type { ApiBudget } from "@/lib/api/endpoints/budget";

function deriveAlerts(data: ApiBudget) {
  const alerts: {
    id: string;
    title: string;
    description: string;
    tone: "warning" | "destructive";
  }[] = [];
  const total = Number(data.total_budget);
  const spent = Number(data.spent_to_date);
  const remaining = Number(data.remaining);

  if (total > 0 && remaining < 0) {
    alerts.push({
      id: "over",
      title: "Project is over budget",
      description: `Spent ₹${Math.abs(remaining).toLocaleString("en-IN")} more than the total budget of ${formatCurrency(total)}.`,
      tone: "destructive",
    });
  } else if (total > 0 && remaining < total * 0.1) {
    alerts.push({
      id: "near",
      title: "Approaching budget limit",
      description: `Only ${formatCurrency(remaining)} (${formatPercent((remaining / total) * 100)}) remains of the total budget.`,
      tone: "warning",
    });
  }

  for (const cat of data.by_category) {
    const catSpent = Number(cat.spent);
    if (total > 0 && catSpent > total * 0.3) {
      alerts.push({
        id: `cat-${cat.category}`,
        title: `${cat.label} is your largest spend`,
        description: `${formatCurrency(catSpent)} spent — ${formatPercent((catSpent / total) * 100)} of total budget.`,
        tone: "warning",
      });
      break;
    }
  }

  return alerts;
}

const alertTone = {
  warning: "bg-warning/15 text-warning",
  destructive: "bg-destructive/10 text-destructive",
} as const;

export function BudgetView() {
  const activeProjectId = useProjectStore((s) => s.activeProjectId);
  const { data, isLoading } = useBudget(activeProjectId);

  if (!activeProjectId) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Budget"
          description="Select a project to view its budget"
          actions={<AdjustBudgetButton />}
        />
        <p className="text-muted-foreground text-sm">No project selected.</p>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="space-y-6">
        <PageHeader title="Budget" actions={<AdjustBudgetButton />} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  const totalBudget = Number(data.total_budget);
  const spentToDate = Number(data.spent_to_date);
  const remaining = Number(data.remaining);
  const spentPct = totalBudget > 0 ? (spentToDate / totalBudget) * 100 : 0;
  const remainingPct = totalBudget > 0 ? (remaining / totalBudget) * 100 : 0;
  const alerts = deriveAlerts(data);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Budget"
        description={
          totalBudget > 0
            ? `${formatCurrency(totalBudget)} total budget`
            : "No budget set — click Adjust budget to add one"
        }
        actions={<AdjustBudgetButton currentBudget={totalBudget || undefined} />}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total budget" value={formatCurrency(totalBudget)} icon={Wallet} />
        <StatCard
          label="Spent to date"
          value={formatCurrency(spentToDate)}
          deltaLabel={totalBudget > 0 ? `${formatPercent(spentPct)} of total budget` : undefined}
          icon={Receipt}
        />
        <StatCard
          label="Remaining"
          value={formatCurrency(remaining)}
          deltaLabel={
            totalBudget > 0
              ? `${formatPercent(Math.max(remainingPct, 0))} of total budget`
              : undefined
          }
          icon={CircleDollarSign}
        />
        <StatCard
          label="Expense categories"
          value={String(data.by_category.length)}
          deltaLabel="active categories"
          icon={PiggyBank}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Spend by category</CardTitle>
            <CardDescription>Actual spend across all expense categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {data.by_category.length === 0 ? (
              <p className="text-muted-foreground text-sm">No expenses recorded yet.</p>
            ) : (
              data.by_category.map((cat) => {
                const pct = totalBudget > 0 ? (Number(cat.spent) / totalBudget) * 100 : 100;
                const over = totalBudget > 0 && Number(cat.spent) > totalBudget;
                return (
                  <div key={cat.category} className="space-y-1.5">
                    <div className="flex items-baseline justify-between gap-2 text-sm">
                      <span className="font-medium">{cat.label}</span>
                      <span className="text-muted-foreground tabular-nums">
                        {formatCurrency(Number(cat.spent))}{" "}
                        {totalBudget > 0 && (
                          <span
                            className={cn(
                              "ml-1 font-medium",
                              over ? "text-destructive" : "text-foreground"
                            )}
                          >
                            {formatPercent(pct)}
                          </span>
                        )}
                      </span>
                    </div>
                    <Progress
                      value={Math.min(pct, 100)}
                      className={cn(over && "[&>div]:bg-destructive")}
                    />
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Budget alerts</CardTitle>
            <CardDescription>Items that need your attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.length === 0 ? (
              <p className="text-muted-foreground text-sm">No alerts — budget looks healthy.</p>
            ) : (
              alerts.map((alert) => (
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
                    <p className="text-sm font-medium">{alert.title}</p>
                    <p className="text-muted-foreground mt-0.5 text-sm">{alert.description}</p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {data.monthly_spend.length > 0 && <CumulativeSpendChart data={data.monthly_spend} />}
    </div>
  );
}
