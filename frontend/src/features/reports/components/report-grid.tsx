"use client";

import { BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ReportGrid() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <div className="bg-muted flex size-12 items-center justify-center rounded-xl">
          <BarChart3 className="text-muted-foreground size-6" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">Reports coming soon</p>
          <p className="text-muted-foreground text-sm">
            Budget summaries, progress reports, and expense exports will be available here.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
