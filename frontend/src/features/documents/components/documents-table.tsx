"use client";

import {
  Download,
  FileImage,
  FileSpreadsheet,
  FileText,
  MoreHorizontal,
  Trash2,
  type LucideIcon,
} from "lucide-react";
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
import {
  formatFileSize,
  type ApiDocument,
  type DocumentCategory,
} from "@/lib/api/endpoints/documents";
import { cn } from "@/lib/utils";
import { useDeleteDocument } from "../hooks";

const categoryTone: Record<DocumentCategory, string> = {
  permit: "bg-chart-1/20",
  contract: "bg-chart-2/20",
  invoice: "bg-chart-3/20",
  plan: "bg-chart-4/20",
  report: "bg-chart-5/20",
  other: "bg-muted",
};

const categoryLabel: Record<DocumentCategory, string> = {
  permit: "Permit",
  contract: "Contract",
  invoice: "Invoice",
  plan: "Plan",
  report: "Report",
  other: "Other",
};

function typeIcon(name: string): LucideIcon {
  if (/\.(xlsx|xls|csv)$/i.test(name)) return FileSpreadsheet;
  if (/\.(png|jpe?g|gif|webp|svg)$/i.test(name)) return FileImage;
  return FileText;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface RowActionsProps {
  doc: ApiDocument;
  projectId: number | null;
}

function RowActions({ doc, projectId }: RowActionsProps) {
  const { mutate: deleteDoc, isPending } = useDeleteDocument(projectId);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${doc.title}`}>
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => window.open(doc.file_url, "_blank")}>
          <Download className="size-4" /> Download
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          disabled={isPending}
          onClick={() => deleteDoc(doc.id)}
        >
          <Trash2 className="size-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface DocumentsTableProps {
  documents: ApiDocument[];
  projectId: number | null;
}

export function DocumentsTable({ documents, projectId }: DocumentsTableProps) {
  const columns: Column<ApiDocument>[] = [
    {
      key: "title",
      header: "Name",
      className: "max-w-72",
      cell: (row) => {
        const Icon = typeIcon(row.title);
        return (
          <div className="flex items-center gap-2.5">
            <Icon className="text-muted-foreground size-4 shrink-0" />
            <span className="truncate font-medium">{row.title}</span>
          </div>
        );
      },
    },
    {
      key: "category",
      header: "Category",
      cell: (row) => (
        <Badge className={cn("text-foreground border-transparent", categoryTone[row.category])}>
          {categoryLabel[row.category]}
        </Badge>
      ),
    },
    {
      key: "file_size",
      header: "Size",
      className: "text-muted-foreground tabular-nums",
      cell: (row) => formatFileSize(row.file_size),
    },
    {
      key: "uploaded_at",
      header: "Date",
      className: "text-muted-foreground whitespace-nowrap",
      cell: (row) => formatDate(row.uploaded_at),
    },
    {
      key: "id",
      header: "",
      className: "w-10 text-right",
      cell: (row) => <RowActions doc={row} projectId={projectId} />,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={documents}
      searchKeys={["title", "category"]}
      searchPlaceholder="Search documents…"
    />
  );
}
