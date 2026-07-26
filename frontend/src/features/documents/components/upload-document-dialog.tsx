"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "@/components/shared/file-upload";
import { useProjectStore } from "@/lib/store/project-store";
import type { DocumentCategory } from "@/lib/api/endpoints/documents";
import { useUploadDocument } from "../hooks";

const CATEGORIES: { value: DocumentCategory; label: string }[] = [
  { value: "permit", label: "Permit" },
  { value: "contract", label: "Contract" },
  { value: "invoice", label: "Invoice" },
  { value: "plan", label: "Plan" },
  { value: "report", label: "Report" },
  { value: "other", label: "Other" },
];

export function UploadDocumentDialog() {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [category, setCategory] = useState<DocumentCategory>("other");
  const activeProjectId = useProjectStore((s) => s.activeProjectId);
  const { mutate, isPending } = useUploadDocument(activeProjectId);

  function reset() {
    setFiles([]);
    setCategory("other");
  }

  function handleUpload() {
    if (!files.length || !activeProjectId) return;
    let completed = 0;
    files.forEach((file) => {
      const fd = new FormData();
      fd.append("project", String(activeProjectId));
      fd.append("title", file.name);
      fd.append("category", category);
      fd.append("file", file);
      mutate(fd, {
        onSuccess: () => {
          completed++;
          if (completed === files.length) {
            setOpen(false);
            reset();
          }
        },
      });
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm" disabled={!activeProjectId}>
          <Upload className="size-4" /> Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Upload documents</DialogTitle>
          <DialogDescription>
            Add permits, contracts, invoices, plans, or reports to the project library.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as DocumentCategory)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <FileUpload onFiles={setFiles} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={files.length === 0 || isPending} onClick={handleUpload}>
            {isPending ? "Uploading…" : `Upload${files.length > 0 ? ` (${files.length})` : ""}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
