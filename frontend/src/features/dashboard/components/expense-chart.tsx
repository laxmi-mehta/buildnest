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
import { expenseBreakdown } from "@/features/dashboard/data";
import { formatCurrency } from "@/lib/utils";

const config = {
  amount: { label: "Spent" },
  Structure: { label: "Structure", color: "var(--chart-1)" },
  Electrical: { label: "Electrical", color: "var(--chart-2)" },
  Plumbing: { label: "Plumbing", color: "var(--chart-3)" },
  Interior: { label: "Interior", color: "var(--chart-4)" },
  Other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig;

const total = expenseBreakdown.reduce((sum, item) => sum + item.amount, 0);

export function ExpenseChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses by category</CardTitle>
        <CardDescription>{formatCurrency(total)} spent to date</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="mx-auto h-64 w-full">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="category" />} />
            <Pie
              data={expenseBreakdown}
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
      </CardContent>
    </Card>
  );
}
