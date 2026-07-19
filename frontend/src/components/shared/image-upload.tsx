"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PreviewImage {
  file: File;
  url: string;
}

/** Image variant of the upload zone with thumbnail previews. */
export function ImageUpload({
  onFiles,
  className,
}: {
  onFiles?: (files: File[]) => void;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<PreviewImage[]>([]);

  useEffect(() => {
    return () => images.forEach((img) => URL.revokeObjectURL(img.url));
  }, [images]);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const next = [
      ...images,
      ...Array.from(incoming)
        .filter((f) => f.type.startsWith("image/"))
        .map((file) => ({ file, url: URL.createObjectURL(file) })),
    ];
    setImages(next);
    onFiles?.(next.map((i) => i.file));
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
        {images.map((img, i) => (
          <div
            key={img.url}
            className="group relative aspect-square overflow-hidden rounded-lg border"
          >
            {/* Local object URLs — next/image is not applicable here. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.url} alt={img.file.name} className="size-full object-cover" />
            <Button
              variant="secondary"
              size="icon-sm"
              className="absolute top-1 right-1 opacity-0 transition-opacity group-hover:opacity-100"
              aria-label={`Remove ${img.file.name}`}
              onClick={() => setImages(images.filter((_, idx) => idx !== i))}
            >
              <X className="size-3.5" />
            </Button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn(
            "text-muted-foreground hover:bg-accent/40 flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border border-dashed text-xs transition-colors"
          )}
        >
          <ImagePlus className="size-5" />
          Add photos
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => addFiles(e.target.files)}
      />
    </div>
  );
}
