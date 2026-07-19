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
import { categoryComparison } from "@/features/analytics/data";
import { formatCompactNumber } from "@/lib/utils";

const config = {
  allocated: { label: "Allocated", color: "var(--chart-2)" },
  spent: { label: "Spent", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function CategoryComparisonChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Category comparison</CardTitle>
        <CardDescription>Allocated vs spent by category</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-64 w-full">
          <BarChart data={categoryComparison} layout="vertical" barGap={2}>
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(v: number) => `$${formatCompactNumber(v)}`}
            />
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              width={90}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="allocated" fill="var(--color-allocated)" radius={[0, 4, 4, 0]} />
            <Bar dataKey="spent" fill="var(--color-spent)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
