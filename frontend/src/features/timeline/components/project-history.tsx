"use client";

import { useMemo, useState } from "react";
import { History } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmptyState } from "@/components/shared/empty-state";
import { Timeline, type TimelineEntry } from "@/components/shared/timeline";
import type { ApiHistoryEntry, HistoryCategory } from "@/lib/api/endpoints/timeline";

type Filter = "all" | "milestone" | "expense" | "issue";

const filterOptions: { value: Filter; label: string }[] = [
  { value: "all", label: "All activity" },
  { value: "milestone", label: "Milestones" },
  { value: "expense", label: "Expenses" },
  { value: "issue", label: "Issues" },
];

const categoryTone: Record<HistoryCategory, TimelineEntry["tone"]> = {
  milestone: "success",
  expense: "brand",
  issue: "warning",
  general: "default",
};

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function monthLabel(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

function shortDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return `${MONTH_NAMES[d.getMonth()].slice(0, 3)} ${d.getDate()}`;
}

interface Props {
  history: ApiHistoryEntry[];
}

export function ProjectHistory({ history }: Props) {
  const [filter, setFilter] = useState<Filter>("all");

  const groups = useMemo(() => {
    const visible = filter === "all" ? history : history.filter((e) => e.category === filter);

    const monthOrder: string[] = [];
    const byMonth: Record<string, TimelineEntry[]> = {};
    for (const entry of visible) {
      const ml = monthLabel(entry.date);
      if (!byMonth[ml]) {
        monthOrder.push(ml);
        byMonth[ml] = [];
      }
      byMonth[ml].push({
        id: entry.id,
        title: entry.title,
        description: entry.description,
        meta: shortDate(entry.date),
        tone: categoryTone[entry.category] ?? "default",
      });
    }
    return monthOrder.map((month) => ({ month, entries: byMonth[month] }));
  }, [history, filter]);

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Project history</CardTitle>
        <Select value={filter} onValueChange={(value) => setFilter(value as Filter)}>
          <SelectTrigger size="sm" className="w-40">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="space-y-6">
        {groups.length === 0 ? (
          <EmptyState
            icon={History}
            title="No matching activity"
            description="Try a different filter to see more of the project history."
            className="border-0"
          />
        ) : (
          groups.map((group) => (
            <div key={group.month} className="space-y-3">
              <h3 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                {group.month}
              </h3>
              <Timeline entries={group.entries} />
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
