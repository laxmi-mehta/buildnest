"use client";

import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { DataTable, type Column } from "@/components/shared/data-table";
import type { ApiExpense } from "@/lib/api/types";
import { cn, formatCurrency } from "@/lib/utils";

const CATEGORY_LABELS: Record<ApiExpense["category"], string> = {
  materials: "Materials",
  labor: "Labour",
  design: "Design",
  permits: "Permits",
  equipment: "Equipment",
  misc: "Misc",
};

const PAYMENT_LABELS: Record<ApiExpense["payment_method"], string> = {
  cash: "Cash",
  cheque: "Cheque",
  bank_transfer: "Bank Transfer",
  upi: "UPI",
};

const categoryTone: Record<ApiExpense["category"], string> = {
  materials: "bg-chart-1/10 text-chart-1 border-transparent",
  labor: "bg-chart-2/10 text-chart-2 border-transparent",
  design: "bg-chart-3/10 text-chart-3 border-transparent",
  permits: "bg-warning/15 text-foreground border-transparent",
  equipment: "bg-secondary text-secondary-foreground border-transparent",
  misc: "bg-muted text-muted-foreground border-transparent",
};

const columns: Column<ApiExpense>[] = [
  {
    key: "date",
    header: "Date",
    cell: (row) => (
      <span className="text-muted-foreground whitespace-nowrap tabular-nums">
        {format(new Date(row.date), "dd/MM/yyyy")}
      </span>
    ),
  },
  {
    key: "description",
    header: "Description",
    cell: (row) => <span className="font-medium">{row.description}</span>,
  },
  {
    key: "category",
    header: "Category",
    cell: (row) => (
      <Badge className={cn("font-normal", categoryTone[row.category])}>
        {CATEGORY_LABELS[row.category]}
      </Badge>
    ),
  },
  {
    key: "payee",
    header: "Vendor / Payee",
    cell: (row) => <span className="text-muted-foreground">{row.payee || "—"}</span>,
  },
  {
    key: "payment_method",
    header: "Method",
    cell: (row) => (
      <span className="text-muted-foreground text-xs">{PAYMENT_LABELS[row.payment_method]}</span>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    className: "text-right",
    cell: (row) => (
      <span className="font-medium tabular-nums">{formatCurrency(parseFloat(row.amount))}</span>
    ),
  },
];

export function ExpensesTable({ expenses }: { expenses: ApiExpense[] }) {
  return (
    <DataTable
      columns={columns}
      data={expenses}
      searchKeys={["description", "payee"]}
      searchPlaceholder="Search expenses…"
    />
  );
}
