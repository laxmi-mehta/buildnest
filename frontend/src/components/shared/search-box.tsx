"use client";

import { Search } from "lucide-react";
import { useUiStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils";

/** Navbar search affordance — opens the command palette. */
export function SearchBox({ className }: { className?: string }) {
  const setOpen = useUiStore((s) => s.setCommandPaletteOpen);

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cn(
        "border-input bg-background text-muted-foreground hover:bg-accent/50 flex h-8 w-full max-w-64 items-center gap-2 rounded-md border px-3 text-sm transition-colors",
        className
      )}
      aria-label="Search (Ctrl+K)"
    >
      <Search className="size-3.5 shrink-0" />
      <span className="flex-1 truncate text-left">Search…</span>
      <kbd className="bg-muted pointer-events-none hidden rounded border px-1.5 font-mono text-[10px] font-medium sm:inline-block">
        ⌘K
      </kbd>
    </button>
  );
}
