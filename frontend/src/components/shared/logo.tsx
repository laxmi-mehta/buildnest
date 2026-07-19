import Link from "next/link";
import { Hammer } from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";

export function Logo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <Link
      href="/dashboard"
      className={cn("flex items-center gap-2 outline-none focus-visible:opacity-80", className)}
      aria-label={`${APP_NAME} home`}
    >
      <span className="bg-brand text-brand-foreground flex size-7 shrink-0 items-center justify-center rounded-md">
        <Hammer className="size-4" strokeWidth={2.25} />
      </span>
      {!compact && <span className="text-[15px] font-semibold tracking-tight">{APP_NAME}</span>}
    </Link>
  );
}
