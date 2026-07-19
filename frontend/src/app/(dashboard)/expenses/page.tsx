import type { Metadata } from "next";
import { CircleDollarSign, Clock4, Receipt } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { AddExpenseDialog } from "@/features/expenses/components/add-expense-dialog";
import { ExpensesTable } from "@/features/expenses/components/expenses-table";
import { expenseStats } from "@/features/expenses/data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Expenses" };

export default function ExpensesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Expenses"
        description="Every rupee spent on Willow Creek Residence, in one ledger"
        actions={<AddExpenseDialog />}
      />

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="This month"
          value={formatCurrency(expenseStats.thisMonth)}
          deltaLabel="July, month to date"
          icon={CircleDollarSign}
        />
        <StatCard
          label="Pending approvals"
          value={String(expenseStats.pendingCount)}
          deltaLabel={`${formatCurrency(expenseStats.pendingTotal)} awaiting review`}
          icon={Clock4}
        />
        <StatCard
          label="Largest expense"
          value={formatCurrency(expenseStats.largestExpense)}
          deltaLabel={expenseStats.largestExpenseLabel}
          icon={Receipt}
        />
      </div>

      <ExpensesTable />
    </div>
  );
}
