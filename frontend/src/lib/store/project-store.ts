"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProjectStore {
  activeProjectId: number | null;
  setActiveProjectId: (id: number | null) => void;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      activeProjectId: null,
      setActiveProjectId: (id) => set({ activeProjectId: id }),
    }),
    { name: "buildnest.active-project" }
  )
);
