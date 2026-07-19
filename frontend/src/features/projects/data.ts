export type ProjectStatus = "active" | "planning" | "on hold" | "completed";

export interface ProjectSummary {
  id: string;
  name: string;
  address: string;
  status: ProjectStatus;
  phase: string;
  progressPercent: number;
  budget: number;
  spent: number;
  contractors: string[];
  startedAt: string;
  targetCompletion: string;
  updated: string;
}

export const projects: ProjectSummary[] = [
  {
    id: "prj_01",
    name: "Willow Creek Residence",
    address: "42 Willow Creek Layout, Whitefield, Bengaluru",
    status: "active",
    phase: "Interior finishing",
    progressPercent: 58,
    budget: 4850000,
    spent: 2674000,
    contractors: ["Sharma Plumbing", "Volt Electric", "OakLine Carpentry"],
    startedAt: "2026-01-12",
    targetCompletion: "2026-11-20",
    updated: "2 hours ago",
  },
  {
    id: "prj_02",
    name: "Garage ADU Conversion",
    address: "42 Willow Creek Layout, Whitefield, Bengaluru",
    status: "planning",
    phase: "Design & permits",
    progressPercent: 12,
    budget: 960000,
    spent: 78000,
    contractors: ["StoneWorks Masonry"],
    startedAt: "2026-06-01",
    targetCompletion: "2027-03-15",
    updated: "3 days ago",
  },
  {
    id: "prj_03",
    name: "Lakeside Cabin Renovation",
    address: "18 Pine Shore Road, Madikeri, Coorg",
    status: "completed",
    phase: "Handover complete",
    progressPercent: 100,
    budget: 1520000,
    spent: 1489000,
    contractors: ["Summit Roofing", "Kumar Mechanical"],
    startedAt: "2025-03-10",
    targetCompletion: "2025-12-05",
    updated: "Dec 2025",
  },
];
