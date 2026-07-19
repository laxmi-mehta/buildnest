/** Realistic dummy data for the dashboard. Swaps to the API layer later. */

export const project = {
  name: "Willow Creek Residence",
  address: "42 Willow Creek Layout, Whitefield, Bengaluru",
  status: "On track" as const,
  phase: "Interior finishing",
  startedAt: "2026-01-12",
  targetCompletion: "2026-11-20",
  daysRemaining: 129,
  progressPercent: 58,
};

export const stats = {
  totalBudget: 4850000,
  spentToDate: 2674000,
  spentDeltaPct: 6.2,
  openTasks: 8,
  tasksDueThisWeek: 3,
  activeContractors: 5,
};

export const constructionPhases = [
  { label: "Planning", description: "Permits & design" },
  { label: "Foundation", description: "Site & concrete" },
  { label: "Framing", description: "Structure & roof" },
  { label: "Systems", description: "MEP rough-in" },
  { label: "Finishing", description: "Interior & exterior" },
  { label: "Handover", description: "Inspection & closeout" },
];
export const currentPhaseIndex = 4;

/** Monthly budget vs actual spend (INR). */
export const budgetVsActual = [
  { month: "Jan", budget: 320000, actual: 298000 },
  { month: "Feb", budget: 450000, actual: 471000 },
  { month: "Mar", budget: 520000, actual: 504000 },
  { month: "Apr", budget: 480000, actual: 519000 },
  { month: "May", budget: 390000, actual: 362000 },
  { month: "Jun", budget: 350000, actual: 336000 },
  { month: "Jul", budget: 300000, actual: 184000 },
];

/** Spend by category (INR). */
export const expenseBreakdown = [
  { category: "Structure", amount: 982000, fill: "var(--chart-1)" },
  { category: "Electrical", amount: 413000, fill: "var(--chart-2)" },
  { category: "Plumbing", amount: 389000, fill: "var(--chart-3)" },
  { category: "Interior", amount: 546000, fill: "var(--chart-4)" },
  { category: "Other", amount: 344000, fill: "var(--chart-5)" },
];

export const upcomingTasks = [
  {
    id: "tsk_01",
    title: "Final plumbing inspection walkthrough",
    due: "Jul 15",
    priority: "high" as const,
    assignee: "Sharma Plumbing",
  },
  {
    id: "tsk_02",
    title: "Choose master bath tile & grout color",
    due: "Jul 16",
    priority: "medium" as const,
    assignee: "You",
  },
  {
    id: "tsk_03",
    title: "Approve kitchen cabinet hardware",
    due: "Jul 18",
    priority: "medium" as const,
    assignee: "You",
  },
  {
    id: "tsk_04",
    title: "Schedule HVAC balancing test",
    due: "Jul 21",
    priority: "low" as const,
    assignee: "Kumar Mechanical",
  },
  {
    id: "tsk_05",
    title: "Order exterior light fixtures",
    due: "Jul 24",
    priority: "low" as const,
    assignee: "You",
  },
];

export const recentActivity = [
  {
    id: "act_01",
    title: "Permit approved",
    description: "Electrical permit E-2094 approved by the city.",
    meta: "2h ago",
    tone: "success" as const,
  },
  {
    id: "act_02",
    title: "Expense recorded",
    description: "₹48,500 — kitchen cabinetry deposit.",
    meta: "Yesterday",
    tone: "brand" as const,
  },
  {
    id: "act_03",
    title: "Photo batch uploaded",
    description: "14 photos added to “Drywall — Level 2”.",
    meta: "Yesterday",
    tone: "default" as const,
  },
  {
    id: "act_04",
    title: "Milestone completed",
    description: "Framing signed off, 4 days ahead of schedule.",
    meta: "3d ago",
    tone: "success" as const,
  },
  {
    id: "act_05",
    title: "Budget alert",
    description: "Electrical at 85% of allocated budget.",
    meta: "4d ago",
    tone: "warning" as const,
  },
];

export const recentDocuments = [
  { id: "doc_01", name: "Electrical permit E-2094.pdf", size: "1.2 MB", updated: "2h ago" },
  { id: "doc_02", name: "Cabinetry contract — signed.pdf", size: "840 KB", updated: "Yesterday" },
  { id: "doc_03", name: "HVAC spec sheet v3.pdf", size: "2.4 MB", updated: "3d ago" },
  { id: "doc_04", name: "Tile selection quote.xlsx", size: "96 KB", updated: "5d ago" },
];

export const recentPhotos = [
  { id: "ph_01", label: "Drywall — L2", tone: "bg-chart-1/20" },
  { id: "ph_02", label: "Kitchen rough-in", tone: "bg-chart-2/20" },
  { id: "ph_03", label: "Master bath", tone: "bg-chart-3/20" },
  { id: "ph_04", label: "Facade progress", tone: "bg-chart-4/20" },
  { id: "ph_05", label: "Site overview", tone: "bg-chart-5/20" },
  { id: "ph_06", label: "Roofing detail", tone: "bg-chart-1/20" },
];
