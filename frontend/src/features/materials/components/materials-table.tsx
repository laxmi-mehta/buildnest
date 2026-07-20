"use client";

import { Badge } from "@/components/ui/badge";
import { DataTable, type Column } from "@/components/shared/data-table";
import type { ApiMaterial } from "@/lib/api/types";
import { cn, formatCurrency } from "@/lib/utils";

const CATEGORY_LABELS: Record<ApiMaterial["category"], string> = {
  cement: "Cement",
  steel: "Steel",
  bricks: "Bricks",
  sand: "Sand",
  tiles: "Tiles",
  wood: "Wood",
  electrical: "Electrical",
  plumbing: "Plumbing",
  paint: "Paint",
  misc: "Misc",
};

const UNIT_LABELS: Record<ApiMaterial["unit"], string> = {
  bags: "bags",
  kg: "kg",
  tons: "tons",
  sqft: "sq.ft",
  nos: "nos.",
  meters: "m",
  liters: "L",
  cft: "cu.ft",
};

const statusTone: Record<ApiMaterial["delivery_status"], string> = {
  delivered: "bg-success/10 text-success border-transparent",
  ordered: "bg-secondary text-secondary-foreground border-transparent",
  required: "bg-warning/15 text-foreground border-transparent",
  installed: "bg-muted text-muted-foreground border-transparent",
};

const columns: Column<ApiMaterial>[] = [
  {
    key: "name",
    header: "Material",
    cell: (row) => <span className="font-medium">{row.name}</span>,
  },
  {
    key: "category",
    header: "Category",
    cell: (row) => <Badge variant="outline">{CATEGORY_LABELS[row.category]}</Badge>,
  },
  {
    key: "quantity",
    header: "Quantity",
    cell: (row) => (
      <span className="tabular-nums">
        {parseFloat(row.quantity).toLocaleString("en-IN")} {UNIT_LABELS[row.unit]}
      </span>
    ),
  },
  {
    key: "unit_cost",
    header: "Unit cost",
    className: "text-right",
    cell: (row) => (
      <span className="tabular-nums">
        {formatCurrency(parseFloat(row.unit_cost), { maximumFractionDigits: 2 })}
      </span>
    ),
  },
  {
    key: "total_cost",
    header: "Total",
    className: "text-right",
    cell: (row) => (
      <span className="font-medium tabular-nums">{formatCurrency(row.total_cost)}</span>
    ),
  },
  {
    key: "vendor",
    header: "Vendor",
    cell: (row) => <span className="text-muted-foreground">{row.vendor || "—"}</span>,
  },
  {
    key: "delivery_status",
    header: "Status",
    cell: (row) => (
      <Badge className={cn("capitalize", statusTone[row.delivery_status])}>
        {row.delivery_status}
      </Badge>
    ),
  },
];

export function MaterialsTable({ materials }: { materials: ApiMaterial[] }) {
  return (
    <DataTable
      columns={columns}
      data={materials}
      searchKeys={["name", "vendor"]}
      searchPlaceholder="Search materials or vendors…"
    />
  );
}
