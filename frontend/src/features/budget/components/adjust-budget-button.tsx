"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProjectStore } from "@/lib/store/project-store";
import { useUpdateProjectBudget } from "../hooks";

export function AdjustBudgetButton({ currentBudget }: { currentBudget?: number }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const activeProjectId = useProjectStore((s) => s.activeProjectId);
  const { mutate, isPending } = useUpdateProjectBudget(activeProjectId);

  function handleOpen(next: boolean) {
    if (next) setValue(currentBudget ? String(currentBudget) : "");
    setOpen(next);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const amount = Number(value);
    if (!amount || amount <= 0) return;
    mutate(amount, { onSuccess: () => setOpen(false) });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <SlidersHorizontal className="size-4" /> Adjust budget
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adjust total budget</DialogTitle>
          <DialogDescription>Update the total budget for this project (INR).</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="budget-amount">Total budget (₹)</Label>
            <Input
              id="budget-amount"
              type="number"
              min={1}
              placeholder="e.g. 5000000"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
