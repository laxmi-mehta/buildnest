/** Dummy budget data for Willow Creek Residence. Swaps to the API layer later. */

export interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
}

export interface BudgetAlert {
  id: string;
  title: string;
  description: string;
  meta: string;
  tone: "warning" | "destructive";
}

export const budgetSummary = {
  totalBudget: 4850000,
  allocated: 4365000,
  spentToDate: 2674000,
  remaining: 2176000,
  spentDeltaPct: 6.2,
};

/** Allocation vs actual spend per category (INR). */
export const budgetCategories: BudgetCategory[] = [
  { id: "cat_01", name: "Structure", allocated: 1200000, spent: 982000 },
  { id: "cat_02", name: "Interior", allocated: 1180000, spent: 546000 },
  { id: "cat_03", name: "Electrical", allocated: 485000, spent: 413000 },
  { id: "cat_04", name: "Plumbing", allocated: 375000, spent: 389000 },
  { id: "cat_05", name: "HVAC", allocated: 380000, spent: 168000 },
  { id: "cat_06", name: "Landscaping", allocated: 240000, spent: 42000 },
  { id: "cat_07", name: "Permits & fees", allocated: 145000, spent: 98000 },
  { id: "cat_08", name: "Contingency", allocated: 360000, spent: 36000 },
];

/** Cumulative planned vs actual spend, Jan–Jul 2026 (INR). */
export const cumulativeSpend = [
  { month: "Jan", planned: 320000, actual: 298000 },
  { month: "Feb", planned: 770000, actual: 769000 },
  { month: "Mar", planned: 1290000, actual: 1273000 },
  { month: "Apr", planned: 1770000, actual: 1792000 },
  { month: "May", planned: 2160000, actual: 2154000 },
  { month: "Jun", planned: 2510000, actual: 2490000 },
  { month: "Jul", planned: 2810000, actual: 2674000 },
];

export const budgetAlerts: BudgetAlert[] = [
  {
    id: "alert_01",
    title: "Plumbing is over budget",
    description:
      "Spent ₹3,89,000 of the ₹3,75,000 allocation (104%). Review the fixture upgrade change order or shift from contingency.",
    meta: "2d ago",
    tone: "destructive",
  },
  {
    id: "alert_02",
    title: "Electrical at 85% of allocation",
    description:
      "₹4,13,000 of ₹4,85,000 used with exterior fixtures still to be ordered. Consider a small reallocation before rough-in closeout.",
    meta: "4d ago",
    tone: "warning",
  },
  {
    id: "alert_03",
    title: "Large expense recorded",
    description:
      "₹48,500 kitchen cabinetry deposit posted to Interior — the largest single expense this month.",
    meta: "Yesterday",
    tone: "warning",
  },
];
