"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { ApiPhoto } from "@/lib/api/endpoints/photos";

function monthLabel(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function groupByMonth(photos: ApiPhoto[]): { label: string; photos: ApiPhoto[] }[] {
  const map = new Map<string, ApiPhoto[]>();
  for (const p of photos) {
    const key = monthLabel(p.uploaded_at);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(p);
  }
  return Array.from(map.entries()).map(([label, photos]) => ({ label, photos }));
}

interface PhotoAlbumsProps {
  photos: ApiPhoto[];
  onDelete?: (id: number) => void;
}

export function PhotoAlbums({ photos, onDelete }: PhotoAlbumsProps) {
  const [selected, setSelected] = useState<ApiPhoto | null>(null);
  const groups = groupByMonth(photos);

  return (
    <>
      <div className="space-y-8">
        {groups.map((group) => (
          <section key={group.label} className="space-y-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-base font-semibold tracking-tight">{group.label}</h2>
              <p className="text-muted-foreground text-xs">
                <span className="tabular-nums">{group.photos.length}</span> photos
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {group.photos.map((photo) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setSelected(photo)}
                  className="hover:ring-ring/50 focus-visible:ring-ring/50 relative aspect-square overflow-hidden rounded-lg border outline-none hover:ring-2 focus-visible:ring-2"
                  aria-label={photo.caption || "View photo"}
                >
                  <img
                    src={photo.file_url}
                    alt={photo.caption || "Project photo"}
                    className="size-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="overflow-hidden p-0 sm:max-w-2xl">
          {selected && (
            <div className="relative">
              <img
                src={selected.file_url}
                alt={selected.caption || "Project photo"}
                className="max-h-[80vh] w-full bg-black object-contain"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                {selected.caption && (
                  <p className="text-sm font-medium text-white">{selected.caption}</p>
                )}
                <p className="mt-0.5 text-xs text-white/70">
                  {new Date(selected.uploaded_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              {onDelete && (
                <div className="absolute top-2 right-10">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      onDelete(selected.id);
                      setSelected(null);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
