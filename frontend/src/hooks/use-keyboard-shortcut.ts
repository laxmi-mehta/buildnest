"use client";

import { useEffect } from "react";

/** Registers a global Cmd/Ctrl+key shortcut (e.g. the ⌘K command palette). */
export function useKeyboardShortcut(key: string, handler: () => void) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === key.toLowerCase() && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handler();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [key, handler]);
}
