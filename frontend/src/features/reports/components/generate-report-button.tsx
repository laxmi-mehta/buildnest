"use client";

import { FilePlus2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function GenerateReportButton() {
  return (
    <Button
      size="sm"
      onClick={() =>
        toast.success("Report queued", {
          description: "We'll notify you when your report is ready to download.",
        })
      }
    >
      <FilePlus2 className="size-4" /> Generate report
    </Button>
  );
}
