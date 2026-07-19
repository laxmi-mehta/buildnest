"use client";

import { useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Plus } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/shared/date-picker";
import { expenseCategories } from "@/features/expenses/data";
import { formatCurrency } from "@/lib/utils";

const schema = z.object({
  description: z.string().min(3, "Describe the expense"),
  amount: z
    .string()
    .min(1, "Enter an amount")
    .refine((v) => Number(v) > 0, "Enter a valid amount"),
  category: z.string().min(1, "Pick a category"),
  vendor: z.string().min(2, "Enter a vendor"),
  date: z.date({ error: "Pick a date" }),
});

type FormValues = z.infer<typeof schema>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-destructive text-xs font-medium">{message}</p>;
}

export function AddExpenseDialog() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { description: "", amount: "", category: "", vendor: "", date: undefined },
  });

  const onSubmit = (values: FormValues) => {
    toast.success(
      `Expense recorded — ${formatCurrency(Number(values.amount))} to ${values.category}`,
      { description: `${values.description} · ${values.vendor}` }
    );
    reset();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="size-4" /> Add expense
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add expense</DialogTitle>
          <DialogDescription>Record a new expense for Willow Creek Residence.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`${id}-description`}>Description</Label>
            <Input
              id={`${id}-description`}
              placeholder="e.g. Kitchen cabinetry deposit"
              {...register("description")}
            />
            <FieldError message={errors.description?.message} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`${id}-amount`}>Amount (INR)</Label>
              <Input
                id={`${id}-amount`}
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                {...register("amount")}
              />
              <FieldError message={errors.amount?.message} />
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Controller
                control={control}
                name="date"
                render={({ field }) => <DatePicker value={field.value} onChange={field.onChange} />}
              />
              <FieldError message={errors.date?.message} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {expenseCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.category?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-vendor`}>Vendor</Label>
              <Input
                id={`${id}-vendor`}
                placeholder="e.g. Sharma Plumbing"
                {...register("vendor")}
              />
              <FieldError message={errors.vendor?.message} />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add expense</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
