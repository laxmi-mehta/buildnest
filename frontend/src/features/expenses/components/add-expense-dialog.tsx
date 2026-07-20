"use client";

import { useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";
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
import { useCreateExpense } from "@/features/expenses/hooks";
import { useProjectStore } from "@/lib/store/project-store";
import { formatCurrency } from "@/lib/utils";

const CATEGORIES = [
  { value: "materials", label: "Materials" },
  { value: "labor", label: "Labour" },
  { value: "design", label: "Design & Architecture" },
  { value: "permits", label: "Permits & Approvals" },
  { value: "equipment", label: "Equipment" },
  { value: "misc", label: "Miscellaneous" },
] as const;

const PAYMENT_METHODS = [
  { value: "cash", label: "Cash" },
  { value: "upi", label: "UPI" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "cheque", label: "Cheque" },
] as const;

const schema = z.object({
  description: z.string().min(3, "Describe the expense"),
  amount: z
    .string()
    .min(1, "Enter an amount")
    .refine((v) => Number(v) > 0, "Enter a valid amount"),
  category: z.string().min(1, "Pick a category"),
  payee: z.string().optional(),
  payment_method: z.string().min(1),
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
  const { activeProjectId } = useProjectStore();
  const { mutate: create, isPending } = useCreateExpense(activeProjectId);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
      amount: "",
      category: "",
      payee: "",
      payment_method: "cash",
      date: undefined,
    },
  });

  const onSubmit = (values: FormValues) => {
    if (!activeProjectId) {
      toast.error("Select a project first from the Projects page");
      return;
    }
    create(
      {
        project: activeProjectId,
        category: values.category as
          "materials" | "labor" | "design" | "permits" | "equipment" | "misc",
        description: values.description,
        amount: Number(values.amount),
        date: values.date.toISOString().slice(0, 10),
        payee: values.payee,
        payment_method: values.payment_method as "cash" | "cheque" | "bank_transfer" | "upi",
      },
      {
        onSuccess: () => {
          toast.success(`Expense recorded — ${formatCurrency(Number(values.amount))}`, {
            description: values.description,
          });
          reset();
          setOpen(false);
        },
      }
    );
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
          <DialogDescription>
            {activeProjectId
              ? "Record a new expense for the active project."
              : "Select a project first from the Projects page."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`${id}-description`}>Description</Label>
            <Input
              id={`${id}-description`}
              placeholder="e.g. Foundation concrete pour"
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
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.category?.message} />
            </div>
            <div className="space-y-2">
              <Label>Payment method</Label>
              <Controller
                control={control}
                name="payment_method"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {PAYMENT_METHODS.map((m) => (
                        <SelectItem key={m.value} value={m.value}>
                          {m.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${id}-payee`}>Vendor / Payee (optional)</Label>
            <Input id={`${id}-payee`} placeholder="e.g. Sharma Plumbing" {...register("payee")} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !activeProjectId}>
              {isPending && <Loader2 className="size-4 animate-spin" />}
              Add expense
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
