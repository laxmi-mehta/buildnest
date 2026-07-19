"use client";

import { useRef, useState } from "react";
import { File as FileIcon, UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Drag-and-drop upload zone. Files are held in local state only —
 * real uploads arrive with the storage integration.
 */
export function FileUpload({
  accept,
  multiple = true,
  hint = "PDF, images or spreadsheets up to 25MB",
  onFiles,
  className,
}: {
  accept?: string;
  multiple?: boolean;
  hint?: string;
  onFiles?: (files: File[]) => void;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const next = multiple ? [...files, ...Array.from(incoming)] : Array.from(incoming).slice(0, 1);
    setFiles(next);
    onFiles?.(next);
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "hover:bg-accent/40 flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-6 py-10 text-center transition-colors",
          dragging && "border-brand bg-accent/60"
        )}
      >
        <div className="bg-muted flex size-10 items-center justify-center rounded-lg">
          <UploadCloud className="text-muted-foreground size-5" />
        </div>
        <p className="text-sm font-medium">
          Drop files here or <span className="text-brand underline underline-offset-2">browse</span>
        </p>
        <p className="text-muted-foreground text-xs">{hint}</p>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => addFiles(e.target.files)}
      />

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center gap-2 rounded-lg border px-3 py-2"
            >
              <FileIcon className="text-muted-foreground size-4 shrink-0" />
              <span className="min-w-0 flex-1 truncate text-sm">{file.name}</span>
              <span className="text-muted-foreground text-xs">
                {(file.size / 1024 / 1024).toFixed(1)} MB
              </span>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Remove ${file.name}`}
                onClick={() => {
                  const next = files.filter((_, idx) => idx !== i);
                  setFiles(next);
                  onFiles?.(next);
                }}
              >
                <X className="size-3.5" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
