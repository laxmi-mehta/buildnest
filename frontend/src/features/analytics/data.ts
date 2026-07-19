/** Dummy analytics for Willow Creek Residence. Swaps to the API layer later. */

export const insights = {
  avgWeeklySpend: 103000,
  avgWeeklySpendDeltaPct: -8.4,
  budgetEfficiencyPct: 94,
  taskCompletionRatePct: 87,
  taskCompletionDeltaPct: 3.5,
  scheduleVarianceDays: 4,
};

/** Weekly actual spend, last 8 weeks (week starting, INR). */
export const weeklySpend = [
  { week: "May 25", spend: 83000 },
  { week: "Jun 1", spend: 74000 },
  { week: "Jun 8", spend: 89000 },
  { week: "Jun 15", spend: 81000 },
  { week: "Jun 22", spend: 92000 },
  { week: "Jun 29", spend: 62000 },
  { week: "Jul 6", spend: 79000 },
  { week: "Jul 13", spend: 43000 },
];

/** Allocated vs spent per category (INR). */
export const categoryComparison = [
  { category: "Structure", allocated: 1200000, spent: 982000 },
  { category: "Interior", allocated: 1180000, spent: 546000 },
  { category: "Electrical", allocated: 485000, spent: 413000 },
  { category: "Plumbing", allocated: 375000, spent: 389000 },
  { category: "HVAC", allocated: 380000, spent: 168000 },
  { category: "Landscaping", allocated: 240000, spent: 42000 },
];

/** Spend to date per contractor (INR). */
export const contractorSpend = [
  { contractor: "Mehra Framing", amount: 864000 },
  { contractor: "SparkLine Electric", amount: 413000 },
  { contractor: "Sharma Plumbing", amount: 389000 },
  { contractor: "Kumar Mechanical", amount: 326000 },
  { contractor: "WoodCraft Cabinetry", amount: 214000 },
  { contractor: "GreenScape", amount: 68000 },
];

/** Tasks created vs completed per week. */
export const taskThroughput = [
  { week: "May 25", created: 9, completed: 7 },
  { week: "Jun 1", created: 6, completed: 8 },
  { week: "Jun 8", created: 8, completed: 6 },
  { week: "Jun 15", created: 5, completed: 7 },
  { week: "Jun 22", created: 7, completed: 9 },
  { week: "Jun 29", created: 4, completed: 5 },
  { week: "Jul 6", created: 6, completed: 6 },
  { week: "Jul 13", created: 5, completed: 3 },
];
