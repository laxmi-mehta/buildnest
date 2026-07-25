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
import type { MonthlySpend } from "@/lib/api/endpoints/budget";
import { formatCompactNumber } from "@/lib/utils";

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const config = {
  cumulative: { label: "Cumulative spend", color: "var(--chart-1)" },
} satisfies ChartConfig;

interface Props {
  data: MonthlySpend[];
}

export function CumulativeSpendChart({ data }: Props) {
  const chartData = data.map((row) => ({
    label: `${MONTH_LABELS[row.month - 1]} '${String(row.year).slice(-2)}`,
    cumulative: Number(row.cumulative),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cumulative spend</CardTitle>
        <CardDescription>Actual spend over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-64 w-full">
          <AreaChart data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(v: number) => `₹${formatCompactNumber(v)}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              type="monotone"
              dataKey="cumulative"
              stroke="var(--color-cumulative)"
              fill="var(--color-cumulative)"
              fillOpacity={0.15}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
