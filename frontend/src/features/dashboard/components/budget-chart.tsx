"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ComposedChart,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatCompactNumber } from "@/lib/utils";

export interface BudgetChartDatum {
  month: string;
  actual: number;
  budget?: number;
}

const config = {
  actual: { label: "Actual spend", color: "var(--chart-3)" },
  budget: { label: "Monthly target", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function BudgetChart({
  data,
  totalBudget,
}: {
  data: BudgetChartDatum[];
  totalBudget: number | null;
}) {
  const hasData = data.some((d) => d.actual > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly spend</CardTitle>
        <CardDescription>
          {totalBudget
            ? `Budget vs actual — monthly target ₹${formatCompactNumber(totalBudget / 12)}`
            : "Actual spend by month"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="text-muted-foreground flex h-64 items-center justify-center text-sm">
            No expense data yet
          </div>
        ) : (
          <ChartContainer config={config} className="h-64 w-full">
            <ComposedChart data={data} barGap={4}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(v: number) => `₹${formatCompactNumber(v)}`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="actual" fill="var(--color-actual)" radius={[4, 4, 0, 0]} />
              {totalBudget && (
                <Line
                  dataKey="budget"
                  stroke="var(--color-budget)"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="4 4"
                />
              )}
            </ComposedChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
