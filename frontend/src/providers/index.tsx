"use client";

import { Toaster } from "sonner";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";

/** Composes every global provider; used once in the root layout. */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        {children}
        <Toaster position="bottom-right" richColors closeButton />
      </QueryProvider>
    </ThemeProvider>
  );
}
