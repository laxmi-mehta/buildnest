"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/shared/empty-state";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  /** Renders the cell; defaults to the raw value at `key`. */
  cell?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  /** Row fields matched by the search box. Omit to hide search. */
  searchKeys?: (keyof T)[];
  searchPlaceholder?: string;
  pageSize?: number;
  onRowClick?: (row: T) => void;
  toolbar?: React.ReactNode;
}

/**
 * Client-side data table with search + pagination.
 * Deliberately dependency-free; swaps to server-driven pagination when the
 * real API lands without changing call sites.
 */
export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  searchKeys,
  searchPlaceholder = "Search…",
  pageSize = DEFAULT_PAGE_SIZE,
  onRowClick,
  toolbar,
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    if (!query || !searchKeys?.length) return data;
    const q = query.toLowerCase();
    return data.filter((row) =>
      searchKeys.some((key) =>
        String(row[key] ?? "")
          .toLowerCase()
          .includes(q)
      )
    );
  }, [data, query, searchKeys]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount - 1);
  const rows = filtered.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  return (
    <div className="space-y-3">
      {(searchKeys?.length || toolbar) && (
        <div className="flex flex-wrap items-center gap-2">
          {searchKeys?.length ? (
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(0);
              }}
              placeholder={searchPlaceholder}
              className="h-8 max-w-64"
            />
          ) : null}
          {toolbar && <div className="ml-auto flex items-center gap-2">{toolbar}</div>}
        </div>
      )}

      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {columns.map((col) => (
                <TableHead key={col.key} className={col.className}>
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="p-0">
                  <EmptyState
                    icon={SearchX}
                    title="No results"
                    description="Try adjusting your search or filters."
                    className="border-0"
                  />
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={cn(onRowClick && "cursor-pointer")}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key} className={col.className}>
                      {col.cell
                        ? col.cell(row)
                        : String((row as Record<string, unknown>)[col.key] ?? "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {filtered.length > pageSize && (
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-xs">
            {filtered.length} rows · page {currentPage + 1} of {pageCount}
          </p>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              disabled={currentPage === 0}
              onClick={() => setPage(currentPage - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              disabled={currentPage >= pageCount - 1}
              onClick={() => setPage(currentPage + 1)}
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
