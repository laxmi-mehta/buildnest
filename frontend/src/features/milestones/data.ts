/** Realistic dummy data for the milestones page. Swaps to the API layer later. */

import type { Milestone } from "./types";

export const milestones: Milestone[] = [
  {
    id: "mls_01",
    name: "Foundation poured",
    description: "Footings, stem walls, and slab poured, cured, and inspected.",
    targetDate: "2026-02-20",
    completedDate: "2026-02-18",
    earlyNote: "2 days early",
    contractor: "StoneWorks Masonry",
    status: "completed",
  },
  {
    id: "mls_02",
    name: "Framing complete",
    description: "Full structural frame, sheathing, and roof trusses signed off.",
    targetDate: "2026-04-22",
    completedDate: "2026-04-18",
    earlyNote: "4 days early",
    contractor: "OakLine Carpentry",
    status: "completed",
  },
  {
    id: "mls_03",
    name: "Roof watertight",
    description: "Underlayment, architectural shingles, and flashing installed.",
    targetDate: "2026-05-12",
    completedDate: "2026-05-09",
    earlyNote: "3 days early",
    contractor: "Summit Roofing",
    status: "completed",
  },
  {
    id: "mls_04",
    name: "Rough-in inspections passed",
    description: "Plumbing, electrical, and mechanical rough-ins approved on the first visit.",
    targetDate: "2026-06-15",
    completedDate: "2026-06-12",
    earlyNote: "3 days early",
    contractor: "Sharma Plumbing",
    status: "completed",
  },
  {
    id: "mls_05",
    name: "Drywall complete",
    description: "All levels hung, taped, sanded, and ready for paint.",
    targetDate: "2026-06-30",
    completedDate: "2026-06-28",
    earlyNote: "2 days early",
    contractor: "OakLine Carpentry",
    status: "completed",
  },
  {
    id: "mls_06",
    name: "Kitchen installed",
    description: "Cabinetry, quartz countertops, appliances, and fixtures in place.",
    targetDate: "2026-08-07",
    progressPercent: 45,
    contractor: "OakLine Carpentry",
    status: "in-progress",
  },
  {
    id: "mls_07",
    name: "Final inspection",
    description: "City final inspection across all trades and certificate of occupancy.",
    targetDate: "2026-10-28",
    contractor: "Volt Electric",
    status: "upcoming",
  },
  {
    id: "mls_08",
    name: "Move-in ready",
    description: "Punch list closed, deep clean done, and keys handed over.",
    targetDate: "2026-11-20",
    contractor: "OakLine Carpentry",
    status: "upcoming",
  },
];

export const milestoneStats = {
  completed: milestones.filter((m) => m.status === "completed").length,
  inProgress: milestones.filter((m) => m.status === "in-progress").length,
  upcoming: milestones.filter((m) => m.status === "upcoming").length,
};
