import type { Metadata } from "next";
import { BudgetView } from "@/features/budget/components/budget-view";

export const metadata: Metadata = { title: "Budget" };

export default function BudgetPage() {
  return <BudgetView />;
}
