import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  label: string;
  value: string;
  /** Percentage change vs. previous period; negative renders red. */
  delta?: number;
  deltaLabel?: string;
  icon?: LucideIcon;
  className?: string;
}

export function StatCard({
  label,
  value,
  delta,
  deltaLabel,
  icon: Icon,
  className,
}: StatCardProps) {
  const positive = delta !== undefined && delta >= 0;

  return (
    <Card className={cn("py-5", className)}>
      <CardContent className="px-5">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm font-medium">{label}</p>
          {Icon && <Icon className="text-muted-foreground size-4" />}
        </div>
        <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
        {(delta !== undefined || deltaLabel) && (
          <p className="mt-1 flex items-center gap-1 text-xs">
            {delta !== undefined && (
              <span
                className={cn(
                  "flex items-center gap-0.5 font-medium",
                  positive ? "text-success" : "text-destructive"
                )}
              >
                {positive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                {positive ? "+" : ""}
                {delta}%
              </span>
            )}
            {deltaLabel && <span className="text-muted-foreground">{deltaLabel}</span>}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
