export type ExpenseStatus = "paid" | "pending" | "reimbursed";

export type ExpenseCategory =
  | "Structure"
  | "Electrical"
  | "Plumbing"
  | "Interior"
  | "HVAC"
  | "Landscaping"
  | "Permits & fees"
  | "Contingency";

export interface Expense {
  id: string;
  /** ISO date the expense was incurred. */
  date: string;
  description: string;
  category: ExpenseCategory;
  vendor: string;
  amount: number;
  status: ExpenseStatus;
}
