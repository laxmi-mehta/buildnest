import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  label: string;
  description?: string;
}

/** Horizontal progress stepper (e.g. construction phases). */
export function Stepper({
  steps,
  current,
  className,
}: {
  steps: Step[];
  /** Index of the active step; everything before it renders as complete. */
  current: number;
  className?: string;
}) {
  return (
    <ol className={cn("flex w-full items-start", className)}>
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={step.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full items-center">
              <div
                className={cn(
                  "h-px flex-1",
                  i === 0 ? "bg-transparent" : done || active ? "bg-brand" : "bg-border"
                )}
              />
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                  done && "bg-brand border-brand text-brand-foreground",
                  active && "border-brand text-brand",
                  !done && !active && "text-muted-foreground"
                )}
                aria-current={active ? "step" : undefined}
              >
                {done ? <Check className="size-3.5" /> : i + 1}
              </span>
              <div
                className={cn(
                  "h-px flex-1",
                  i === steps.length - 1 ? "bg-transparent" : done ? "bg-brand" : "bg-border"
                )}
              />
            </div>
            <div className="px-1 text-center">
              <p className={cn("text-xs font-medium", !done && !active && "text-muted-foreground")}>
                {step.label}
              </p>
              {step.description && (
                <p className="text-muted-foreground mt-0.5 hidden text-[11px] md:block">
                  {step.description}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
