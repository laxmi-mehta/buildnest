"use client";

import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatCurrency } from "@/lib/utils";

export interface ExpenseChartDatum {
  category: string;
  amount: number;
  fill: string;
}

export function ExpenseChart({
  data,
  totalSpent,
}: {
  data: ExpenseChartDatum[];
  totalSpent: number;
}) {
  const config = Object.fromEntries(
    data.map((d) => [d.category, { label: d.category, color: d.fill }])
  ) as ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses by category</CardTitle>
        <CardDescription>
          {totalSpent > 0
            ? `${formatCurrency(totalSpent)} spent to date`
            : "No expenses recorded yet"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-muted-foreground flex h-64 items-center justify-center text-sm">
            No expense data yet
          </div>
        ) : (
          <ChartContainer config={config} className="mx-auto h-64 w-full">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="category" />} />
              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
                strokeWidth={0}
              />
              <ChartLegend content={<ChartLegendContent nameKey="category" />} />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
