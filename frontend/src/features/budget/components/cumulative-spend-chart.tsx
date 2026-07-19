"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { cumulativeSpend } from "@/features/budget/data";
import { formatCompactNumber } from "@/lib/utils";

const config = {
  planned: { label: "Planned", color: "var(--chart-1)" },
  actual: { label: "Actual", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function CumulativeSpendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cumulative spend</CardTitle>
        <CardDescription>Planned vs actual, Jan – Jul 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-64 w-full">
          <AreaChart data={cumulativeSpend}>
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
            <Area
              type="monotone"
              dataKey="planned"
              stroke="var(--color-planned)"
              fill="var(--color-planned)"
              fillOpacity={0.12}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="var(--color-actual)"
              fill="var(--color-actual)"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
