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
import { useCreateMaterial } from "@/features/materials/hooks";
import { useProjectStore } from "@/lib/store/project-store";
import { formatCurrency } from "@/lib/utils";

const CATEGORIES = [
  { value: "cement", label: "Cement" },
  { value: "steel", label: "Steel" },
  { value: "bricks", label: "Bricks" },
  { value: "sand", label: "Sand" },
  { value: "tiles", label: "Tiles" },
  { value: "wood", label: "Wood" },
  { value: "electrical", label: "Electrical" },
  { value: "plumbing", label: "Plumbing" },
  { value: "paint", label: "Paint" },
  { value: "misc", label: "Miscellaneous" },
] as const;

const UNITS = [
  { value: "bags", label: "Bags" },
  { value: "kg", label: "Kg" },
  { value: "tons", label: "Tons" },
  { value: "sqft", label: "Sq ft" },
  { value: "nos", label: "Nos" },
  { value: "meters", label: "Meters" },
  { value: "liters", label: "Liters" },
  { value: "cft", label: "Cft" },
] as const;

const schema = z.object({
  name: z.string().min(2, "Enter a material name"),
  category: z.string().min(1, "Pick a category"),
  unit: z.string().min(1, "Pick a unit"),
  quantity: z
    .string()
    .min(1, "Required")
    .refine((v) => Number(v) > 0, "Must be greater than 0"),
  unit_cost: z
    .string()
    .min(1, "Required")
    .refine((v) => Number(v) > 0, "Must be greater than 0"),
  vendor: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-destructive text-xs font-medium">{message}</p>;
}

export function AddMaterialDialog() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const { activeProjectId } = useProjectStore();
  const { mutate: create, isPending } = useCreateMaterial(activeProjectId);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      category: "",
      unit: "",
      quantity: "",
      unit_cost: "",
      vendor: "",
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
        name: values.name,
        category: values.category as
          | "cement"
          | "steel"
          | "bricks"
          | "sand"
          | "tiles"
          | "wood"
          | "electrical"
          | "plumbing"
          | "paint"
          | "misc",
        unit: values.unit as "bags" | "kg" | "tons" | "sqft" | "nos" | "meters" | "liters" | "cft",
        quantity: Number(values.quantity),
        unit_cost: Number(values.unit_cost),
        vendor: values.vendor || undefined,
      },
      {
        onSuccess: () => {
          toast.success(`${values.name} added`, {
            description: `${values.quantity} ${values.unit} @ ${formatCurrency(Number(values.unit_cost))} each`,
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
          <Plus className="size-4" /> Add material
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add material</DialogTitle>
          <DialogDescription>
            {activeProjectId
              ? "Track a new material order for the active project."
              : "Select a project first from the Projects page."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`${id}-name`}>Name</Label>
            <Input
              id={`${id}-name`}
              placeholder="e.g. Oak hardwood flooring"
              {...register("name")}
            />
            <FieldError message={errors.name?.message} />
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
              <Label>Unit</Label>
              <Controller
                control={control}
                name="unit"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {UNITS.map((u) => (
                        <SelectItem key={u.value} value={u.value}>
                          {u.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.unit?.message} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`${id}-quantity`}>Quantity</Label>
              <Input
                id={`${id}-quantity`}
                type="number"
                min="0"
                step="0.01"
                placeholder="0"
                {...register("quantity")}
              />
              <FieldError message={errors.quantity?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-unit_cost`}>Unit cost (INR)</Label>
              <Input
                id={`${id}-unit_cost`}
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                {...register("unit_cost")}
              />
              <FieldError message={errors.unit_cost?.message} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${id}-vendor`}>Vendor / Supplier (optional)</Label>
            <Input
              id={`${id}-vendor`}
              placeholder="e.g. Bengaluru Timber Co."
              {...register("vendor")}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !activeProjectId}>
              {isPending && <Loader2 className="size-4 animate-spin" />}
              Add material
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
