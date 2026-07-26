"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { ContractorSpend } from "@/lib/api/endpoints/analytics";
import { formatCompactNumber } from "@/lib/utils";

const config = {
  amount: { label: "Spend", color: "var(--chart-3)" },
} satisfies ChartConfig;

interface Props {
  data: ContractorSpend[];
}

export function ContractorSpendChart({ data }: Props) {
  const chartData = data.map((row) => ({ contractor: row.payee, amount: Number(row.spent) }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contractor spend</CardTitle>
        <CardDescription>Total paid per payee to date</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-64 w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="contractor"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
              tick={{ fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(v: number) => `₹${formatCompactNumber(v)}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="amount" fill="var(--color-amount)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
