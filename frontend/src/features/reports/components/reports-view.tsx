"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/shared/page-header";
import { useProjectStore } from "@/lib/store/project-store";
import { cn, formatCurrency, formatPercent } from "@/lib/utils";
import { useReports } from "../hooks";
import { GenerateReportButton } from "./generate-report-button";
import { ReportGrid } from "./report-grid";

export function ReportsView() {
  const activeProjectId = useProjectStore((s) => s.activeProjectId);
  const { data, isLoading } = useReports(activeProjectId);

  if (!activeProjectId) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Reports"
          description="Select a project to view reports"
          actions={<GenerateReportButton />}
        />
        <p className="text-muted-foreground text-sm">No project selected.</p>
      </div>
    );
  }

  const summaries = data?.monthly_summaries ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Generated summaries and exports for your project"
        actions={<GenerateReportButton />}
      />

      <ReportGrid />

      <Card>
        <CardHeader>
          <CardTitle>Monthly summaries</CardTitle>
          <CardDescription>Spend and activity by month</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-48 w-full rounded-xl" />
          ) : summaries.length === 0 ? (
            <p className="text-muted-foreground text-sm">No expense data recorded yet.</p>
          ) : (
            <div className="rounded-xl border">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Month</TableHead>
                    <TableHead className="text-right">Spend</TableHead>
                    <TableHead className="text-right">Expenses</TableHead>
                    <TableHead className="text-right">Tasks completed</TableHead>
                    <TableHead className="text-right">Δ vs prior month</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summaries.map((row) => (
                    <TableRow key={`${row.year}-${row.month}`}>
                      <TableCell className="font-medium">{row.label}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatCurrency(Number(row.total_spend))}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{row.expense_count}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {row.tasks_completed}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "text-right font-medium tabular-nums",
                          row.delta_pct === null
                            ? "text-muted-foreground"
                            : row.delta_pct > 0
                              ? "text-destructive"
                              : "text-success"
                        )}
                      >
                        {row.delta_pct === null
                          ? "—"
                          : `${row.delta_pct > 0 ? "+" : ""}${formatPercent(row.delta_pct, 1)}`}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
