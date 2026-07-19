"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { albums, type AlbumPhoto, type PhotoAlbum } from "@/features/photos/data";
import { cn } from "@/lib/utils";

interface SelectedPhoto {
  photo: AlbumPhoto;
  album: PhotoAlbum;
}

/** Album sections with placeholder tiles + a dialog "lightbox" until real storage lands. */
export function PhotoAlbums() {
  const [selected, setSelected] = useState<SelectedPhoto | null>(null);

  return (
    <>
      <div className="space-y-8">
        {albums.map((album) => (
          <section key={album.id} className="space-y-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-base font-semibold tracking-tight">{album.title}</h2>
              <p className="text-muted-foreground text-xs">
                {album.dateRange} · <span className="tabular-nums">{album.photos.length}</span>{" "}
                photos
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {album.photos.map((photo) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setSelected({ photo, album })}
                  className={cn(
                    "hover:ring-ring/50 focus-visible:ring-ring/50 flex aspect-square items-end rounded-lg border p-1.5 text-left transition-shadow outline-none hover:ring-2 focus-visible:ring-2",
                    photo.tone
                  )}
                  aria-label={`View photo: ${photo.label}`}
                >
                  <span className="text-muted-foreground line-clamp-2 text-[10px] leading-tight font-medium">
                    {photo.label}
                  </span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="sm:max-w-2xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.photo.label}</DialogTitle>
                <DialogDescription>
                  {selected.album.title} · {selected.album.dateRange}
                </DialogDescription>
              </DialogHeader>
              <div
                className={cn(
                  "flex aspect-video items-end rounded-xl border p-4",
                  selected.photo.tone
                )}
              >
                <span className="text-muted-foreground text-sm font-medium">
                  {selected.photo.label}
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                Captured during the {selected.album.title.toLowerCase()} phase at Willow Creek
                Residence.
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
