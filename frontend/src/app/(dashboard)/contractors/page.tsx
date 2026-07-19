import type { Metadata } from "next";
import { CircleDollarSign, HardHat, Star } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { AddContractorDialog } from "@/features/contractors/components/add-contractor-dialog";
import { ContractorCard } from "@/features/contractors/components/contractor-card";
import { contractors, contractorStats } from "@/features/contractors/data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Contractors" };

export default function ContractorsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Contractors"
        description="Every trade partner working on Willow Creek Residence."
        actions={<AddContractorDialog />}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Active contractors"
          value={String(contractorStats.active)}
          icon={HardHat}
        />
        <StatCard
          label="Total paid to date"
          value={formatCurrency(contractorStats.totalPaid)}
          icon={CircleDollarSign}
        />
        <StatCard label="Avg rating" value={contractorStats.avgRating.toFixed(1)} icon={Star} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {contractors.map((contractor) => (
          <ContractorCard key={contractor.id} contractor={contractor} />
        ))}
      </div>
    </div>
  );
}
