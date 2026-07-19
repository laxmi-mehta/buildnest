import type { Metadata } from "next";
import { FileSignature, Files, HardDrive } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { DocumentsTable } from "@/features/documents/components/documents-table";
import { UploadDocumentDialog } from "@/features/documents/components/upload-document-dialog";
import { documentStats } from "@/features/documents/data";

export const metadata: Metadata = { title: "Documents" };

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Documents"
        description="Permits, contracts, invoices, plans, and reports for Willow Creek Residence."
        actions={<UploadDocumentDialog />}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total documents" value={String(documentStats.total)} icon={Files} />
        <StatCard label="Storage used" value={documentStats.storageUsed} icon={HardDrive} />
        <StatCard
          label="Awaiting signature"
          value={String(documentStats.awaitingSignature)}
          icon={FileSignature}
        />
      </div>

      <DocumentsTable />
    </div>
  );
}
