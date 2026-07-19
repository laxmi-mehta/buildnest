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
import { historyEntries, historyMonths } from "@/features/timeline/data";
import type { HistoryCategory } from "@/features/timeline/types";

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

export function ProjectHistory() {
  const [filter, setFilter] = useState<Filter>("all");

  const groups = useMemo(() => {
    const visible =
      filter === "all"
        ? historyEntries
        : historyEntries.filter((entry) => entry.category === filter);

    return historyMonths
      .map((month) => ({
        month,
        entries: visible
          .filter((entry) => entry.month === month)
          .map<TimelineEntry>((entry) => ({
            id: entry.id,
            title: entry.title,
            description: entry.description,
            meta: entry.meta,
            tone: categoryTone[entry.category],
          })),
      }))
      .filter((group) => group.entries.length > 0);
  }, [filter]);

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
