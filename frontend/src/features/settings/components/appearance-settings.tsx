"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Check, Monitor, Moon, Sun, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ThemeOption {
  value: "light" | "dark" | "system";
  label: string;
  icon: LucideIcon;
}

const options: ThemeOption[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

/** Mini UI preview built from semantic tokens only. */
function ThemePreview({ value }: { value: ThemeOption["value"] }) {
  const lightPane = (
    <div className="bg-background flex-1 space-y-1.5 p-2">
      <div className="bg-foreground/80 h-1.5 w-10 rounded-full" />
      <div className="bg-muted-foreground/40 h-1.5 w-14 rounded-full" />
      <div className="bg-muted-foreground/40 h-1.5 w-8 rounded-full" />
    </div>
  );
  const darkPane = (
    <div className="bg-foreground flex-1 space-y-1.5 p-2">
      <div className="bg-background/90 h-1.5 w-10 rounded-full" />
      <div className="bg-background/50 h-1.5 w-14 rounded-full" />
      <div className="bg-background/50 h-1.5 w-8 rounded-full" />
    </div>
  );

  return (
    <div className="flex h-16 overflow-hidden rounded-md border">
      {value === "light" && lightPane}
      {value === "dark" && darkPane}
      {value === "system" && (
        <>
          {lightPane}
          {darkPane}
        </>
      )}
    </div>
  );
}

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Avoid a hydration mismatch: the active theme is unknown on the server.
  const selected = mounted ? theme : undefined;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Choose how BuildNest looks on this device.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-3">
          {options.map((option) => {
            const active = selected === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setTheme(option.value)}
                aria-pressed={active}
                className={cn(
                  "hover:bg-accent/40 rounded-xl border p-2 text-left transition-colors outline-none",
                  "focus-visible:ring-ring/50 focus-visible:ring-2",
                  active && "ring-brand ring-2"
                )}
              >
                <ThemePreview value={option.value} />
                <div className="mt-2 flex items-center justify-between px-0.5">
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    <option.icon className="text-muted-foreground size-3.5" />
                    {option.label}
                  </span>
                  {active && <Check className="text-brand size-4" />}
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
