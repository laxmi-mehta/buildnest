"use client";

import { CircleDollarSign, FolderKanban, HardHat } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { StatCard } from "@/components/shared/stat-card";
import { useContractors } from "@/features/contractors/hooks";
import { useProjectStore } from "@/lib/store/project-store";
import { formatCurrency } from "@/lib/utils";
import { ContractorCard } from "./contractor-card";

export function ContractorsView() {
  const { activeProjectId } = useProjectStore();
  const { data, isLoading } = useContractors(activeProjectId);

  if (!activeProjectId) {
    return (
      <EmptyState
        icon={FolderKanban}
        title="No project selected"
        description="Go to Projects, select a project, then come back to manage its contractors."
      />
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const contractors = data?.results ?? [];
  const totalContracted = contractors.reduce(
    (s, c) => s + (c.contract_amount ? parseFloat(c.contract_amount) : 0),
    0
  );

  if (contractors.length === 0) {
    return (
      <EmptyState
        icon={HardHat}
        title="No contractors yet"
        description="Add the trade partners working on your project."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Contractors" value={String(contractors.length)} icon={HardHat} />
        <StatCard
          label="Total contracted"
          value={formatCurrency(totalContracted)}
          icon={CircleDollarSign}
        />
        <StatCard label="Trades" value={String(new Set(contractors.map((c) => c.trade)).size)} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {contractors.map((c) => (
          <ContractorCard key={c.id} contractor={c} />
        ))}
      </div>
    </div>
  );
}
