"use client";

import { Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { reports } from "@/features/reports/data";

export function ReportGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {reports.map((report) => (
        <Card key={report.id}>
          <CardContent className="flex h-full flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-lg">
                <report.icon className="text-muted-foreground size-5" />
              </div>
              <span className="text-muted-foreground shrink-0 text-xs">{report.fileSize}</span>
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="text-sm font-semibold">{report.title}</h3>
              <p className="text-muted-foreground text-sm">{report.description}</p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground text-xs">Generated {report.generatedAt}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  toast.success(`Downloading "${report.title}"`, {
                    description: `${report.fileSize} · PDF`,
                  })
                }
              >
                <Download className="size-4" /> Download
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
