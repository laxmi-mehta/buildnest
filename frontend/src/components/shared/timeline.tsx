import { cn } from "@/lib/utils";

export interface TimelineEntry {
  id: string;
  title: string;
  description?: string;
  meta?: string;
  icon?: React.ReactNode;
  /** Dot accent; defaults to the muted ring. */
  tone?: "default" | "brand" | "success" | "warning" | "destructive";
}

const toneClass: Record<NonNullable<TimelineEntry["tone"]>, string> = {
  default: "bg-muted-foreground/40",
  brand: "bg-brand",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
};

/** Vertical activity/timeline list used across dashboard and detail pages. */
export function Timeline({ entries, className }: { entries: TimelineEntry[]; className?: string }) {
  return (
    <ol className={cn("relative space-y-0", className)}>
      {entries.map((entry, i) => (
        <li key={entry.id} className="relative flex gap-3 pb-6 last:pb-0">
          {i < entries.length - 1 && (
            <span className="bg-border absolute top-5 left-[5px] h-full w-px" aria-hidden />
          )}
          <span
            className={cn(
              "ring-background relative mt-1.5 size-[11px] shrink-0 rounded-full ring-4",
              toneClass[entry.tone ?? "default"]
            )}
            aria-hidden
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm font-medium">{entry.title}</p>
              {entry.meta && (
                <span className="text-muted-foreground shrink-0 text-xs">{entry.meta}</span>
              )}
            </div>
            {entry.description && (
              <p className="text-muted-foreground mt-0.5 text-sm">{entry.description}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
