"use client";

import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { DataTable, type Column } from "@/components/shared/data-table";
import { expenses } from "@/features/expenses/data";
import type { Expense, ExpenseStatus } from "@/features/expenses/types";
import { cn, formatCurrency } from "@/lib/utils";

const statusTone: Record<ExpenseStatus, string> = {
  paid: "bg-success/10 text-success border-transparent",
  pending: "bg-warning/15 text-foreground border-transparent",
  reimbursed: "bg-muted text-muted-foreground border-transparent",
};

const columns: Column<Expense>[] = [
  {
    key: "date",
    header: "Date",
    cell: (row) => (
      <span className="text-muted-foreground whitespace-nowrap tabular-nums">
        {format(new Date(row.date), "MMM d, yyyy")}
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
      <Badge variant="outline" className="text-muted-foreground font-normal">
        {row.category}
      </Badge>
    ),
  },
  {
    key: "vendor",
    header: "Vendor",
    cell: (row) => <span className="text-muted-foreground">{row.vendor}</span>,
  },
  {
    key: "amount",
    header: "Amount",
    className: "text-right",
    cell: (row) => <span className="font-medium tabular-nums">{formatCurrency(row.amount)}</span>,
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => <Badge className={cn("capitalize", statusTone[row.status])}>{row.status}</Badge>,
  },
];

export function ExpensesTable() {
  return (
    <DataTable
      columns={columns}
      data={expenses}
      searchKeys={["description", "vendor"]}
      searchPlaceholder="Search expenses…"
    />
  );
}
