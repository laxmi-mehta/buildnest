"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  addDays,
  endOfMonth,
  format,
  isWithinInterval,
  parseISO,
  startOfMonth,
  subMonths,
} from "date-fns";
import {
  ArrowRight,
  CalendarClock,
  CircleDollarSign,
  HardHat,
  ListTodo,
  Milestone,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { BudgetChart, type BudgetChartDatum } from "./budget-chart";
import { ExpenseChart, type ExpenseChartDatum } from "./expense-chart";
import { useProjects } from "@/features/projects/hooks";
import { useExpenses } from "@/features/expenses/hooks";
import { useTasks } from "@/features/tasks/hooks";
import { useContractors } from "@/features/contractors/hooks";
import { useMilestones } from "@/features/milestones/hooks";
import { useProjectStore } from "@/lib/store/project-store";
import { cn, formatCurrency } from "@/lib/utils";
import type { ApiExpense } from "@/lib/api/types";

const CATEGORY_LABELS: Record<string, string> = {
  materials: "Materials",
  labor: "Labour",
  design: "Design",
  permits: "Permits",
  equipment: "Equipment",
  misc: "Misc",
};

const CHART_COLORS: Record<string, string> = {
  materials: "var(--chart-1)",
  labor: "var(--chart-2)",
  design: "var(--chart-3)",
  permits: "var(--chart-4)",
  equipment: "var(--chart-5)",
  misc: "var(--chart-1)",
};

const PRIORITY_TONE: Record<string, string> = {
  urgent: "bg-destructive/10 text-destructive border-transparent",
  high: "bg-destructive/10 text-destructive border-transparent",
  medium: "bg-warning/15 text-foreground border-transparent",
  low: "bg-muted text-muted-foreground border-transparent",
};

const MILESTONE_TONE: Record<string, string> = {
  completed: "bg-success/10 text-success",
  in_progress: "bg-brand/10 text-brand",
  delayed: "bg-destructive/10 text-destructive",
  pending: "bg-muted text-muted-foreground",
};

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function computeMonthlySpend(
  expenses: ApiExpense[],
  monthlyBudget: number | null
): BudgetChartDatum[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = subMonths(new Date(), 6 - i);
    const start = startOfMonth(d);
    const end = endOfMonth(d);
    const actual = expenses
      .filter((e) => {
        const day = parseISO(e.date);
        return day >= start && day <= end;
      })
      .reduce((sum, e) => sum + parseFloat(e.amount), 0);
    return {
      month: format(d, "MMM"),
      actual: Math.round(actual),
      budget: monthlyBudget ? Math.round(monthlyBudget) : undefined,
    };
  });
}

export function DashboardView() {
  const { activeProjectId } = useProjectStore();

  const { data: projectsResp } = useProjects();
  const { data: expensesResp, isLoading: loadingExpenses } = useExpenses(activeProjectId);
  const { data: tasksResp, isLoading: loadingTasks } = useTasks(activeProjectId);
  const { data: contractorsResp } = useContractors(activeProjectId);
  const { data: milestonesResp } = useMilestones(activeProjectId);

  const projects = projectsResp?.results ?? [];
  const expenses = expensesResp?.results ?? [];
  const tasks = tasksResp?.results ?? [];
  const contractors = contractorsResp?.results ?? [];
  const milestones = milestonesResp?.results ?? [];

  const activeProject = projects.find((p) => p.id === activeProjectId) ?? null;
  const totalBudget = activeProject?.total_budget ? parseFloat(activeProject.total_budget) : null;

  const spentToDate = useMemo(
    () => expenses.reduce((s, e) => s + parseFloat(e.amount), 0),
    [expenses]
  );

  const openTasks = useMemo(() => tasks.filter((t) => t.status !== "done"), [tasks]);

  const tasksDueThisWeek = useMemo(() => {
    const now = new Date();
    const end = addDays(now, 7);
    return openTasks.filter((t) => {
      if (!t.due_date) return false;
      const d = parseISO(t.due_date);
      return isWithinInterval(d, { start: now, end });
    }).length;
  }, [openTasks]);

  const completedMilestones = milestones.filter((m) => m.status === "completed").length;
  const progressPercent =
    milestones.length > 0 ? Math.round((completedMilestones / milestones.length) * 100) : 0;

  const monthlyBudget = totalBudget ? totalBudget / 12 : null;
  const budgetData = useMemo(
    () => computeMonthlySpend(expenses, monthlyBudget),
    [expenses, monthlyBudget]
  );

  const expenseByCategory = useMemo<ExpenseChartDatum[]>(() => {
    const grouped: Record<string, number> = {};
    for (const e of expenses) {
      grouped[e.category] = (grouped[e.category] ?? 0) + parseFloat(e.amount);
    }
    return Object.entries(grouped).map(([cat, amount]) => ({
      category: CATEGORY_LABELS[cat] ?? cat,
      amount: Math.round(amount),
      fill: CHART_COLORS[cat] ?? "var(--chart-1)",
    }));
  }, [expenses]);

  const upcomingTasks = useMemo(
    () =>
      openTasks
        .slice()
        .sort((a, b) => {
          if (!a.due_date) return 1;
          if (!b.due_date) return -1;
          return parseISO(a.due_date).getTime() - parseISO(b.due_date).getTime();
        })
        .slice(0, 5),
    [openTasks]
  );

  const recentExpenses = useMemo(
    () =>
      expenses
        .slice()
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5),
    [expenses]
  );

  const loading = activeProjectId !== null && (loadingExpenses || loadingTasks);

  const descriptionParts: string[] = [];
  if (activeProject) {
    descriptionParts.push(activeProject.name);
    descriptionParts.push(activeProject.city);
    if (milestones.length > 0) descriptionParts.push(`${progressPercent}% complete`);
  } else if (projects.length > 0) {
    descriptionParts.push(
      `${projects.length} project${projects.length > 1 ? "s" : ""} — select one on the Projects page`
    );
  } else {
    descriptionParts.push("Create your first project to get started");
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={getGreeting()}
        description={descriptionParts.join(" · ")}
        actions={
          activeProjectId ? (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/tasks">
                  <ListTodo className="size-4" /> Add task
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/expenses">
                  <Plus className="size-4" /> New expense
                </Link>
              </Button>
            </>
          ) : null
        }
      />

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total budget"
          value={totalBudget ? formatCurrency(totalBudget) : "—"}
          icon={CircleDollarSign}
        />
        <StatCard
          label="Spent to date"
          value={formatCurrency(spentToDate)}
          deltaLabel={
            totalBudget && spentToDate > 0
              ? `${Math.round((spentToDate / totalBudget) * 100)}% of budget`
              : undefined
          }
          icon={CircleDollarSign}
        />
        <StatCard
          label="Open tasks"
          value={loading ? "…" : String(openTasks.length)}
          deltaLabel={tasksDueThisWeek > 0 ? `${tasksDueThisWeek} due this week` : undefined}
          icon={ListTodo}
        />
        <StatCard
          label="Contractors"
          value={loading ? "…" : String(contractors.length)}
          icon={HardHat}
        />
      </div>

      {/* Construction progress */}
      {milestones.length > 0 && (
        <Card>
          <CardHeader className="flex-row items-start justify-between space-y-0">
            <div className="space-y-1.5">
              <CardTitle>Construction progress</CardTitle>
              <p className="text-muted-foreground text-sm">
                {completedMilestones} of {milestones.length} milestones complete
              </p>
            </div>
            {activeProject && (
              <Badge
                variant="outline"
                className={cn(
                  "gap-1.5 capitalize",
                  activeProject.status === "active" && "border-success/30 text-success",
                  activeProject.status === "on_hold" && "border-warning/30 text-warning-foreground",
                  activeProject.status === "completed" && "border-success/30 text-success"
                )}
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    activeProject.status === "active" && "bg-success",
                    activeProject.status === "on_hold" && "bg-warning",
                    activeProject.status === "completed" && "bg-success",
                    activeProject.status === "planning" && "bg-muted-foreground"
                  )}
                />
                {activeProject.status.replace("_", " ")}
              </Badge>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-muted-foreground">Overall completion</span>
                <span className="font-medium tabular-nums">{progressPercent}%</span>
              </div>
              <Progress value={progressPercent} />
            </div>
            <div className="space-y-2">
              {milestones.slice(0, 6).map((m) => (
                <div key={m.id} className="flex items-center gap-3 text-sm">
                  <Milestone className="text-muted-foreground size-4 shrink-0" />
                  <span className="min-w-0 flex-1 truncate font-medium">{m.name}</span>
                  {m.target_date && (
                    <span className="text-muted-foreground text-xs whitespace-nowrap tabular-nums">
                      {format(parseISO(m.target_date), "dd MMM")}
                    </span>
                  )}
                  <Badge
                    variant="outline"
                    className={cn(
                      "border-transparent text-xs capitalize",
                      MILESTONE_TONE[m.status]
                    )}
                  >
                    {m.status.replace("_", " ")}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <BudgetChart data={budgetData} totalBudget={totalBudget} />
        <ExpenseChart data={expenseByCategory} totalSpent={spentToDate} />
      </div>

      {/* Upcoming tasks + Recent expenses */}
      {activeProjectId && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Upcoming tasks</CardTitle>
              <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
                <Link href="/tasks">
                  View all <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-1">
              {upcomingTasks.length === 0 ? (
                <p className="text-muted-foreground py-6 text-center text-sm">No open tasks</p>
              ) : (
                upcomingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="hover:bg-accent/50 -mx-2 flex items-center gap-3 rounded-lg px-2 py-2"
                  >
                    <CalendarClock className="text-muted-foreground size-4 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{task.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {task.due_date
                          ? `Due ${format(parseISO(task.due_date), "MMM d")}`
                          : "No due date"}
                      </p>
                    </div>
                    <Badge className={cn("capitalize", PRIORITY_TONE[task.priority])}>
                      {task.priority}
                    </Badge>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Recent expenses</CardTitle>
              <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
                <Link href="/expenses">
                  View all <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-1">
              {recentExpenses.length === 0 ? (
                <p className="text-muted-foreground py-6 text-center text-sm">No expenses yet</p>
              ) : (
                recentExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="hover:bg-accent/50 -mx-2 flex items-center gap-3 rounded-lg px-2 py-2"
                  >
                    <CircleDollarSign className="text-muted-foreground size-4 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{expense.description}</p>
                      <p className="text-muted-foreground text-xs">
                        {format(parseISO(expense.date), "dd MMM")} ·{" "}
                        {CATEGORY_LABELS[expense.category] ?? expense.category}
                      </p>
                    </div>
                    <span className="text-sm font-medium whitespace-nowrap tabular-nums">
                      {formatCurrency(parseFloat(expense.amount))}
                    </span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* No project selected */}
      {!activeProjectId && projects.length > 0 && (
        <EmptyState
          icon={HardHat}
          title="Select an active project"
          description="Go to the Projects page and click 'Select as active project' to see your project data here."
          action={
            <Button asChild>
              <Link href="/projects">Go to Projects</Link>
            </Button>
          }
        />
      )}
    </div>
  );
}
