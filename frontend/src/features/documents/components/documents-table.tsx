"use client";

import {
  Download,
  FileImage,
  FileSpreadsheet,
  FileText,
  MoreHorizontal,
  Pencil,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable, type Column } from "@/components/shared/data-table";
import { documents, type DocumentCategory, type DocumentItem } from "@/features/documents/data";
import { cn } from "@/lib/utils";

const categoryTone: Record<DocumentCategory, string> = {
  Permit: "bg-chart-1/20",
  Contract: "bg-chart-2/20",
  Invoice: "bg-chart-3/20",
  Plan: "bg-chart-4/20",
  Report: "bg-chart-5/20",
};

function typeIcon(name: string): LucideIcon {
  if (/\.(xlsx|xls|csv)$/i.test(name)) return FileSpreadsheet;
  if (/\.(png|jpe?g|gif|webp|svg)$/i.test(name)) return FileImage;
  return FileText;
}

const columns: Column<DocumentItem>[] = [
  {
    key: "name",
    header: "Name",
    className: "max-w-72",
    cell: (row) => {
      const Icon = typeIcon(row.name);
      return (
        <div className="flex items-center gap-2.5">
          <Icon className="text-muted-foreground size-4 shrink-0" />
          <span className="truncate font-medium">{row.name}</span>
        </div>
      );
    },
  },
  {
    key: "category",
    header: "Category",
    cell: (row) => (
      <Badge className={cn("text-foreground border-transparent", categoryTone[row.category])}>
        {row.category}
      </Badge>
    ),
  },
  {
    key: "size",
    header: "Size",
    className: "text-muted-foreground tabular-nums",
  },
  {
    key: "uploadedBy",
    header: "Uploaded by",
    className: "text-muted-foreground",
  },
  {
    key: "date",
    header: "Date",
    className: "text-muted-foreground whitespace-nowrap",
  },
  {
    key: "actions",
    header: "",
    className: "w-10 text-right",
    cell: (row) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${row.name}`}>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => toast.success(`Downloading “${row.name}”`)}>
            <Download className="size-4" /> Download
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toast.success(`Rename requested for “${row.name}”`)}>
            <Pencil className="size-4" /> Rename
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => toast.success(`“${row.name}” deleted`)}
          >
            <Trash2 className="size-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export function DocumentsTable() {
  return (
    <DataTable
      columns={columns}
      data={documents}
      searchKeys={["name", "category"]}
      searchPlaceholder="Search documents…"
    />
  );
}
