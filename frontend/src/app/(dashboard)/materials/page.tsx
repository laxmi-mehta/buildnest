import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { AddMaterialDialog } from "@/features/materials/components/add-material-dialog";
import { MaterialsView } from "@/features/materials/components/materials-view";

export const metadata: Metadata = { title: "Materials" };

export default function MaterialsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Materials"
        description="Orders, deliveries, and costs for every material on the build."
        actions={<AddMaterialDialog />}
      />
      <MaterialsView />
    </div>
  );
}
