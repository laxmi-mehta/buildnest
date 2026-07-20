"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateContractor } from "@/features/contractors/hooks";
import { useProjectStore } from "@/lib/store/project-store";
import type { ApiContractor } from "@/lib/api/types";

const TRADES: { value: ApiContractor["trade"]; label: string }[] = [
  { value: "architect", label: "Architect" },
  { value: "civil_engineer", label: "Civil Engineer" },
  { value: "interior_designer", label: "Interior Designer" },
  { value: "electrician", label: "Electrician" },
  { value: "plumber", label: "Plumber" },
  { value: "carpenter", label: "Carpenter" },
  { value: "painter", label: "Painter" },
  { value: "mason", label: "Mason" },
  { value: "general", label: "General Contractor" },
];

const schema = z.object({
  name: z.string().min(2, "Enter a contact name"),
  company: z.string().optional(),
  trade: z.string().min(1, "Pick a trade"),
  phone: z.string().optional(),
  email: z.email("Enter a valid email address").or(z.literal("")),
  contract_amount: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function AddContractorDialog() {
  const [open, setOpen] = useState(false);
  const { activeProjectId } = useProjectStore();
  const { mutate: create, isPending } = useCreateContractor(activeProjectId);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", company: "", trade: "", phone: "", email: "", contract_amount: "" },
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
        trade: values.trade as ApiContractor["trade"],
        company: values.company,
        phone: values.phone,
        email: values.email || undefined,
        contract_amount: values.contract_amount ? Number(values.contract_amount) : null,
      },
      {
        onSuccess: () => {
          toast.success(`${values.name} added to contractors`);
          form.reset();
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="size-4" /> Add contractor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add contractor</DialogTitle>
          <DialogDescription>
            {activeProjectId
              ? "Add a trade partner to the active project."
              : "Select a project first from the Projects page."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Rohan Sharma" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Sharma Plumbing" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="trade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trade</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a trade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRADES.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (optional)</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+91 98450 2100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contract_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contract (INR, optional)</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} step={1000} placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (optional)</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="name@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending || !activeProjectId}>
                {isPending && <Loader2 className="size-4 animate-spin" />}
                Add contractor
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
