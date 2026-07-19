"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { budgetVsActual } from "@/features/dashboard/data";
import { formatCompactNumber } from "@/lib/utils";

const config = {
  budget: { label: "Budgeted", color: "var(--chart-1)" },
  actual: { label: "Actual", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function BudgetChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget vs actual</CardTitle>
        <CardDescription>Monthly spend against plan, 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-64 w-full">
          <BarChart data={budgetVsActual} barGap={4}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(v: number) => `$${formatCompactNumber(v)}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="budget" fill="var(--color-budget)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="actual" fill="var(--color-actual)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
