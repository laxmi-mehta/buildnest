import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { AddContractorDialog } from "@/features/contractors/components/add-contractor-dialog";
import { ContractorsView } from "@/features/contractors/components/contractors-view";

export const metadata: Metadata = { title: "Contractors" };

export default function ContractorsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Contractors"
        description="Every trade partner working on your project."
        actions={<AddContractorDialog />}
      />
      <ContractorsView />
    </div>
  );
}
