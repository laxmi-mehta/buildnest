"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { weeklySpend } from "@/features/analytics/data";
import { formatCompactNumber } from "@/lib/utils";

const config = {
  spend: { label: "Spend", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function SpendTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spend trend</CardTitle>
        <CardDescription>Weekly spend, last 8 weeks</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-64 w-full">
          <AreaChart data={weeklySpend}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(v: number) => `$${formatCompactNumber(v)}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="spend"
              stroke="var(--color-spend)"
              fill="var(--color-spend)"
              fillOpacity={0.15}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
