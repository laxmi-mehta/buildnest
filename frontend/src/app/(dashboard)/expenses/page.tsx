import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { AddExpenseDialog } from "@/features/expenses/components/add-expense-dialog";
import { ExpensesView } from "@/features/expenses/components/expenses-view";

export const metadata: Metadata = { title: "Expenses" };

export default function ExpensesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Expenses"
        description="Every rupee spent on your project, in one ledger."
        actions={<AddExpenseDialog />}
      />
      <ExpensesView />
    </div>
  );
}
