import type { Metadata } from "next";
import { CircleDollarSign, PackageCheck, Truck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { AddMaterialDialog } from "@/features/materials/components/add-material-dialog";
import { MaterialsTable } from "@/features/materials/components/materials-table";
import { materialStats } from "@/features/materials/data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Materials" };

export default function MaterialsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Materials"
        description="Orders, deliveries, and costs for every material on the build."
        actions={<AddMaterialDialog />}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Total materials cost"
          value={formatCurrency(materialStats.totalCost)}
          icon={CircleDollarSign}
        />
        <StatCard
          label="Pending deliveries"
          value={String(materialStats.pendingDeliveries)}
          deltaLabel="incl. backordered items"
          icon={Truck}
        />
        <StatCard
          label="Items ordered"
          value={String(materialStats.itemsOrdered)}
          deltaLabel="awaiting shipment"
          icon={PackageCheck}
        />
      </div>

      <MaterialsTable />
    </div>
  );
}
