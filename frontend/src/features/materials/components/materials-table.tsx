"use client";

import { Badge } from "@/components/ui/badge";
import { DataTable, type Column } from "@/components/shared/data-table";
import { materials } from "@/features/materials/data";
import type { Material, MaterialStatus } from "@/features/materials/types";
import { cn, formatCurrency } from "@/lib/utils";

const statusTone: Record<MaterialStatus, string> = {
  delivered: "bg-success/10 text-success border-transparent",
  ordered: "bg-secondary text-secondary-foreground border-transparent",
  pending: "bg-warning/15 text-foreground border-transparent",
  backordered: "bg-destructive/10 text-destructive border-transparent",
};

const columns: Column<Material>[] = [
  {
    key: "name",
    header: "Material",
    cell: (row) => <span className="font-medium">{row.name}</span>,
  },
  {
    key: "category",
    header: "Category",
    cell: (row) => <Badge variant="outline">{row.category}</Badge>,
  },
  {
    key: "quantity",
    header: "Quantity",
    cell: (row) => (
      <span className="tabular-nums">
        {row.quantity.toLocaleString("en-US")} {row.unit}
      </span>
    ),
  },
  {
    key: "unitCost",
    header: "Unit cost",
    className: "text-right",
    cell: (row) => (
      <span className="tabular-nums">
        {formatCurrency(row.unitCost, { maximumFractionDigits: 2 })}
      </span>
    ),
  },
  {
    key: "total",
    header: "Total",
    className: "text-right",
    cell: (row) => (
      <span className="font-medium tabular-nums">
        {formatCurrency(row.quantity * row.unitCost)}
      </span>
    ),
  },
  { key: "supplier", header: "Supplier" },
  {
    key: "status",
    header: "Status",
    cell: (row) => <Badge className={cn("capitalize", statusTone[row.status])}>{row.status}</Badge>,
  },
];

export function MaterialsTable() {
  return (
    <DataTable
      columns={columns}
      data={materials}
      searchKeys={["name", "supplier"]}
      searchPlaceholder="Search materials or suppliers…"
    />
  );
}
