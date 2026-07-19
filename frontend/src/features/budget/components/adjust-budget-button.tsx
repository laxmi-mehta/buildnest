"use client";

import { SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function AdjustBudgetButton() {
  return (
    <Button
      size="sm"
      onClick={() =>
        toast.success("Budget adjustment drafted", {
          description: "Your changes were saved and sent to the project owner for review.",
        })
      }
    >
      <SlidersHorizontal className="size-4" /> Adjust budget
    </Button>
  );
}
