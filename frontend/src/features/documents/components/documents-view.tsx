"use client";

import { FileSignature, Files, HardDrive } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { useProjectStore } from "@/lib/store/project-store";
import { formatFileSize } from "@/lib/api/endpoints/documents";
import { useDocuments } from "../hooks";
import { DocumentsTable } from "./documents-table";
import { UploadDocumentDialog } from "./upload-document-dialog";

export function DocumentsView() {
  const activeProjectId = useProjectStore((s) => s.activeProjectId);
  const { data, isLoading } = useDocuments(activeProjectId);

  const docs = data?.results ?? [];
  const totalSize = docs.reduce((sum, d) => sum + d.file_size, 0);

  if (!activeProjectId) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Documents"
          description="Select a project to view documents."
          actions={<UploadDocumentDialog />}
        />
        <p className="text-muted-foreground text-sm">No project selected.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Documents"
        description="Permits, contracts, invoices, plans, and reports for this project."
        actions={<UploadDocumentDialog />}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {isLoading ? (
          <>
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
          </>
        ) : (
          <>
            <StatCard label="Total documents" value={String(docs.length)} icon={Files} />
            <StatCard label="Storage used" value={formatFileSize(totalSize)} icon={HardDrive} />
            <StatCard
              label="Contracts & permits"
              value={String(
                docs.filter((d) => d.category === "contract" || d.category === "permit").length
              )}
              icon={FileSignature}
            />
          </>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 rounded-lg" />
          ))}
        </div>
      ) : (
        <DocumentsTable documents={docs} projectId={activeProjectId} />
      )}
    </div>
  );
}
