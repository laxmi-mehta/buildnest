"use client";

import { useState } from "react";
import { ImagePlus } from "lucide-react";
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
import { ImageUpload } from "@/components/shared/image-upload";
import { useProjectStore } from "@/lib/store/project-store";
import { useUploadPhoto } from "../hooks";

export function UploadPhotosDialog() {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const activeProjectId = useProjectStore((s) => s.activeProjectId);
  const { mutate, isPending } = useUploadPhoto(activeProjectId);

  function reset() {
    setFiles([]);
  }

  function handleUpload() {
    if (!files.length || !activeProjectId) return;
    let completed = 0;
    files.forEach((file) => {
      const fd = new FormData();
      fd.append("project", String(activeProjectId));
      fd.append("caption", file.name.replace(/\.[^.]+$/, ""));
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
          <ImagePlus className="size-4" /> Upload photos
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Upload photos</DialogTitle>
          <DialogDescription>
            Add progress photos from the site. They are grouped by upload month.
          </DialogDescription>
        </DialogHeader>
        <ImageUpload onFiles={setFiles} />
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
