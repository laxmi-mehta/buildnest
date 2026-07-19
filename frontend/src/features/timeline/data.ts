/** Realistic dummy data for the timeline page. Swaps to the API layer later. */

import type { HistoryEntry } from "./types";

export const timelinePhases = [
  { label: "Planning", description: "Permits & design" },
  { label: "Foundation", description: "Site & concrete" },
  { label: "Framing", description: "Structure & roof" },
  { label: "Systems", description: "MEP rough-in" },
  { label: "Finishing", description: "Interior & exterior" },
  { label: "Handover", description: "Inspection & closeout" },
];
export const currentPhaseIndex = 4;
export const overallProgress = 58;

/** Ordered month headings for grouping (newest first). */
export const historyMonths = ["July 2026", "June 2026", "May 2026", "April 2026"];

export const historyEntries: HistoryEntry[] = [
  // July 2026
  {
    id: "hist_01",
    month: "July 2026",
    title: "Electrical permit approved",
    description: "Permit E-2094 approved by BBMP.",
    meta: "Jul 15",
    category: "milestone",
  },
  {
    id: "hist_02",
    month: "July 2026",
    title: "Expense recorded",
    description: "₹48,500 — kitchen cabinetry deposit to OakLine Carpentry.",
    meta: "Jul 14",
    category: "expense",
  },
  {
    id: "hist_03",
    month: "July 2026",
    title: "Photo batch uploaded",
    description: "14 photos added to “Drywall — Level 2”.",
    meta: "Jul 12",
    category: "general",
  },
  {
    id: "hist_04",
    month: "July 2026",
    title: "Fixture set backordered",
    description: "Master bath fixtures delayed 2 weeks by Sharma Plumbing's supplier.",
    meta: "Jul 10",
    category: "issue",
  },
  {
    id: "hist_05",
    month: "July 2026",
    title: "Paint delivered on site",
    description: "22 gallons of Swiss Coffee interior paint received.",
    meta: "Jul 8",
    category: "general",
  },
  {
    id: "hist_06",
    month: "July 2026",
    title: "Expense recorded",
    description: "₹21,400 — paint and finishing supplies.",
    meta: "Jul 3",
    category: "expense",
  },

  // June 2026
  {
    id: "hist_07",
    month: "June 2026",
    title: "Milestone: Drywall complete",
    description: "All levels hung, taped, and sanded — signed off 2 days early.",
    meta: "Jun 28",
    category: "milestone",
  },
  {
    id: "hist_08",
    month: "June 2026",
    title: "Expense recorded",
    description: "₹1,26,000 — drywall and insulation materials.",
    meta: "Jun 24",
    category: "expense",
  },
  {
    id: "hist_09",
    month: "June 2026",
    title: "HVAC balancing delayed",
    description: "Kumar Mechanical rescheduled the balancing test to late July.",
    meta: "Jun 18",
    category: "issue",
  },
  {
    id: "hist_10",
    month: "June 2026",
    title: "Milestone: Rough-in inspections passed",
    description: "Plumbing, electrical, and mechanical rough-ins approved on the first visit.",
    meta: "Jun 12",
    category: "milestone",
  },
  {
    id: "hist_11",
    month: "June 2026",
    title: "Expense recorded",
    description: "₹83,000 — HVAC ductwork installation, Level 2.",
    meta: "Jun 5",
    category: "expense",
  },

  // May 2026
  {
    id: "hist_12",
    month: "May 2026",
    title: "Insulation installed",
    description: "Spray foam completed in walls and attic assemblies.",
    meta: "May 30",
    category: "general",
  },
  {
    id: "hist_13",
    month: "May 2026",
    title: "Lumber price increase",
    description: "Trim package quote up 8% — supplier locked pricing for 30 days.",
    meta: "May 22",
    category: "issue",
  },
  {
    id: "hist_14",
    month: "May 2026",
    title: "Expense recorded",
    description: "₹94,500 — electrical rough-in labor, Volt Electric.",
    meta: "May 16",
    category: "expense",
  },
  {
    id: "hist_15",
    month: "May 2026",
    title: "Milestone: Roof watertight",
    description: "Summit Roofing finished shingles and flashing 3 days early.",
    meta: "May 9",
    category: "milestone",
  },
  {
    id: "hist_16",
    month: "May 2026",
    title: "Shingle installation started",
    description: "Summit Roofing crew began the architectural shingle install.",
    meta: "May 2",
    category: "general",
  },

  // April 2026
  {
    id: "hist_17",
    month: "April 2026",
    title: "Expense recorded",
    description: "₹1,68,000 — roofing materials and underlayment.",
    meta: "Apr 25",
    category: "expense",
  },
  {
    id: "hist_18",
    month: "April 2026",
    title: "Milestone: Framing complete",
    description: "OakLine Carpentry signed off framing 4 days ahead of schedule.",
    meta: "Apr 18",
    category: "milestone",
  },
  {
    id: "hist_19",
    month: "April 2026",
    title: "Weather delay",
    description: "Three days of rain paused exterior framing work.",
    meta: "Apr 10",
    category: "issue",
  },
  {
    id: "hist_20",
    month: "April 2026",
    title: "Second-story framing started",
    description: "Wall panels and floor joists set for Level 2.",
    meta: "Apr 3",
    category: "general",
  },
];
