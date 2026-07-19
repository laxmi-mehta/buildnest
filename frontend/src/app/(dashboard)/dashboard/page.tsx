import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CircleDollarSign,
  FileText,
  HardHat,
  ListTodo,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Stepper } from "@/components/shared/stepper";
import { Timeline } from "@/components/shared/timeline";
import { BudgetChart } from "@/features/dashboard/components/budget-chart";
import { ExpenseChart } from "@/features/dashboard/components/expense-chart";
import {
  constructionPhases,
  currentPhaseIndex,
  project,
  recentActivity,
  recentDocuments,
  recentPhotos,
  stats,
  upcomingTasks,
} from "@/features/dashboard/data";
import { notifications } from "@/features/notifications/data";
import { currentUser } from "@/features/settings/data";
import { cn, formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

const priorityTone: Record<string, string> = {
  high: "bg-destructive/10 text-destructive border-transparent",
  medium: "bg-warning/15 text-warning-foreground border-transparent text-foreground",
  low: "bg-muted text-muted-foreground border-transparent",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title={`Good morning, ${currentUser.name.split(" ")[0]}`}
        description={`${project.name} · ${project.phase} · ${project.daysRemaining} days to target completion`}
        actions={
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
        }
      />

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total budget"
          value={formatCurrency(stats.totalBudget)}
          icon={CircleDollarSign}
        />
        <StatCard
          label="Spent to date"
          value={formatCurrency(stats.spentToDate)}
          delta={stats.spentDeltaPct}
          deltaLabel="vs last month"
          icon={CircleDollarSign}
        />
        <StatCard
          label="Open tasks"
          value={String(stats.openTasks)}
          deltaLabel={`${stats.tasksDueThisWeek} due this week`}
          icon={ListTodo}
        />
        <StatCard
          label="Active contractors"
          value={String(stats.activeContractors)}
          icon={HardHat}
        />
      </div>

      {/* Construction progress */}
      <Card>
        <CardHeader className="flex-row items-start justify-between space-y-0">
          <div className="space-y-1.5">
            <CardTitle>Construction progress</CardTitle>
            <CardDescription>{project.name} · started Jan 12, target Nov 20</CardDescription>
          </div>
          <Badge variant="outline" className="text-success border-success/30 gap-1.5">
            <span className="bg-success size-1.5 rounded-full" /> {project.status}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-muted-foreground">Overall completion</span>
              <span className="font-medium tabular-nums">{project.progressPercent}%</span>
            </div>
            <Progress value={project.progressPercent} />
          </div>
          <Stepper steps={constructionPhases} current={currentPhaseIndex} />
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <BudgetChart />
        <ExpenseChart />
      </div>

      {/* Activity + tasks */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Recent activity</CardTitle>
            <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
              <Link href="/timeline">
                View all <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Timeline entries={recentActivity} />
          </CardContent>
        </Card>

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
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="hover:bg-accent/50 -mx-2 flex items-center gap-3 rounded-lg px-2 py-2"
              >
                <CalendarClock className="text-muted-foreground size-4 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{task.title}</p>
                  <p className="text-muted-foreground text-xs">
                    Due {task.due} · {task.assignee}
                  </p>
                </div>
                <Badge className={cn("capitalize", priorityTone[task.priority])}>
                  {task.priority}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Documents, photos, notifications */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Recent documents</CardTitle>
            <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
              <Link href="/documents">
                All <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-1">
            {recentDocuments.map((doc) => (
              <div
                key={doc.id}
                className="hover:bg-accent/50 -mx-2 flex items-center gap-3 rounded-lg px-2 py-2"
              >
                <FileText className="text-muted-foreground size-4 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{doc.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {doc.size} · {doc.updated}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Recent photos</CardTitle>
            <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
              <Link href="/photos">
                All <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {recentPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className={cn("flex aspect-square items-end rounded-lg border p-1.5", photo.tone)}
                >
                  <span className="text-muted-foreground line-clamp-2 text-[10px] leading-tight font-medium">
                    {photo.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Notifications</CardTitle>
            <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
              <Link href="/notifications">
                All <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-1">
            {notifications.slice(0, 4).map((n) => (
              <div
                key={n.id}
                className="hover:bg-accent/50 -mx-2 flex items-start gap-2.5 rounded-lg px-2 py-2"
              >
                {!n.read && <span className="bg-brand mt-1.5 size-1.5 shrink-0 rounded-full" />}
                <div className={cn("min-w-0", n.read && "pl-4")}>
                  <p className="truncate text-sm font-medium">{n.title}</p>
                  <p className="text-muted-foreground line-clamp-1 text-xs">{n.body}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
