"use client";

import { FilePlus2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function GenerateReportButton() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span>
          <Button size="sm" disabled>
            <FilePlus2 className="size-4" /> Generate report
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>Reports coming soon</TooltipContent>
    </Tooltip>
  );
}
