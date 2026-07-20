"use client";

import { CircleDollarSign, FolderKanban, PackageCheck, Truck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { StatCard } from "@/components/shared/stat-card";
import { useMaterials } from "@/features/materials/hooks";
import { useProjectStore } from "@/lib/store/project-store";
import { formatCurrency } from "@/lib/utils";
import { MaterialsTable } from "./materials-table";

export function MaterialsView() {
  const { activeProjectId } = useProjectStore();
  const { data, isLoading } = useMaterials(activeProjectId);

  if (!activeProjectId) {
    return (
      <EmptyState
        icon={FolderKanban}
        title="No project selected"
        description="Go to Projects, select a project, then come back to manage its materials."
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
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  const materials = data?.results ?? [];
  const totalCost = materials.reduce((s, m) => s + m.total_cost, 0);
  const pendingDeliveries = materials.filter(
    (m) => m.delivery_status === "required" || m.delivery_status === "ordered"
  ).length;
  const itemsOrdered = materials.filter((m) => m.delivery_status === "ordered").length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Total materials cost"
          value={formatCurrency(totalCost)}
          icon={CircleDollarSign}
        />
        <StatCard
          label="Pending deliveries"
          value={String(pendingDeliveries)}
          deltaLabel="required + ordered"
          icon={Truck}
        />
        <StatCard
          label="Items ordered"
          value={String(itemsOrdered)}
          deltaLabel="awaiting delivery"
          icon={PackageCheck}
        />
      </div>
      <MaterialsTable materials={materials} />
    </div>
  );
}
