import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/shared/page-header";
import { GenerateReportButton } from "@/features/reports/components/generate-report-button";
import { ReportGrid } from "@/features/reports/components/report-grid";
import { monthlySummaries } from "@/features/reports/data";
import { cn, formatCurrency, formatPercent } from "@/lib/utils";

export const metadata: Metadata = { title: "Reports" };

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Generated summaries and exports for Willow Creek Residence"
        actions={<GenerateReportButton />}
      />

      <ReportGrid />

      <Card>
        <CardHeader>
          <CardTitle>Monthly summaries</CardTitle>
          <CardDescription>Spend and activity by month, 2026</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Month</TableHead>
                  <TableHead className="text-right">Spend</TableHead>
                  <TableHead className="text-right">Tasks completed</TableHead>
                  <TableHead className="text-right">Photos added</TableHead>
                  <TableHead className="text-right">Δ vs prior month</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlySummaries.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.month}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatCurrency(row.spend)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{row.tasksCompleted}</TableCell>
                    <TableCell className="text-right tabular-nums">{row.photosAdded}</TableCell>
                    <TableCell
                      className={cn(
                        "text-right font-medium tabular-nums",
                        row.deltaPct === null
                          ? "text-muted-foreground"
                          : row.deltaPct > 0
                            ? "text-destructive"
                            : "text-success"
                      )}
                    >
                      {row.deltaPct === null
                        ? "—"
                        : `${row.deltaPct > 0 ? "+" : ""}${formatPercent(row.deltaPct, 1)}`}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
