"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { CategoryBreakdown } from "@/lib/api/endpoints/analytics";
import { formatCompactNumber } from "@/lib/utils";

const config = {
  spent: { label: "Spent", color: "var(--chart-1)" },
} satisfies ChartConfig;

interface Props {
  data: CategoryBreakdown[];
}

export function CategoryComparisonChart({ data }: Props) {
  const chartData = data.map((row) => ({ category: row.label, spent: Number(row.spent) }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spend by category</CardTitle>
        <CardDescription>Actual spend per expense category</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-64 w-full">
          <BarChart data={chartData} layout="vertical" barGap={2}>
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(v: number) => `₹${formatCompactNumber(v)}`}
            />
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              width={110}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="spent" fill="var(--color-spent)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
