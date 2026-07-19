import { CalendarRange, FileBarChart, HardHat, Scale, type LucideIcon } from "lucide-react";

/** Dummy generated reports for Willow Creek Residence. Swaps to the API layer later. */

export interface Report {
  id: string;
  title: string;
  description: string;
  generatedAt: string;
  fileSize: string;
  icon: LucideIcon;
}

export interface MonthlySummary {
  id: string;
  month: string;
  spend: number;
  tasksCompleted: number;
  photosAdded: number;
  /** Spend change vs the previous month, in percent. Null for the first month. */
  deltaPct: number | null;
}

export const reports: Report[] = [
  {
    id: "rep_01",
    title: "Weekly progress report",
    description:
      "Jul 6–12 · Site activity, task completions, and photo highlights from the finishing phase.",
    generatedAt: "Jul 13, 2026",
    fileSize: "2.1 MB",
    icon: CalendarRange,
  },
  {
    id: "rep_02",
    title: "Monthly financial summary",
    description:
      "June 2026 · Spend by category, invoice status, and cash-flow outlook against plan.",
    generatedAt: "Jul 2, 2026",
    fileSize: "1.4 MB",
    icon: FileBarChart,
  },
  {
    id: "rep_03",
    title: "Contractor performance",
    description:
      "Q2 2026 · On-time delivery, change orders, and spend per contractor across 5 active crews.",
    generatedAt: "Jul 5, 2026",
    fileSize: "980 KB",
    icon: HardHat,
  },
  {
    id: "rep_04",
    title: "Budget variance analysis",
    description:
      "H1 2026 · Planned vs actual spend per category with variance drivers and reallocation options.",
    generatedAt: "Jul 8, 2026",
    fileSize: "1.7 MB",
    icon: Scale,
  },
];

export const monthlySummaries: MonthlySummary[] = [
  {
    id: "sum_01",
    month: "January",
    spend: 298000,
    tasksCompleted: 14,
    photosAdded: 32,
    deltaPct: null,
  },
  {
    id: "sum_02",
    month: "February",
    spend: 471000,
    tasksCompleted: 19,
    photosAdded: 48,
    deltaPct: 58.1,
  },
  {
    id: "sum_03",
    month: "March",
    spend: 504000,
    tasksCompleted: 23,
    photosAdded: 61,
    deltaPct: 7.0,
  },
  {
    id: "sum_04",
    month: "April",
    spend: 519000,
    tasksCompleted: 21,
    photosAdded: 57,
    deltaPct: 3.0,
  },
  {
    id: "sum_05",
    month: "May",
    spend: 362000,
    tasksCompleted: 17,
    photosAdded: 44,
    deltaPct: -30.3,
  },
  {
    id: "sum_06",
    month: "June",
    spend: 336000,
    tasksCompleted: 20,
    photosAdded: 52,
    deltaPct: -7.2,
  },
];
