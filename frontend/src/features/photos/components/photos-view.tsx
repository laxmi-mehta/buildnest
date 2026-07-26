"use client";

import { Images } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { useProjectStore } from "@/lib/store/project-store";
import { useDeletePhoto, usePhotos } from "../hooks";
import { PhotoAlbums } from "./photo-albums";
import { UploadPhotosDialog } from "./upload-photos-dialog";

export function PhotosView() {
  const activeProjectId = useProjectStore((s) => s.activeProjectId);
  const { data, isLoading } = usePhotos(activeProjectId);
  const { mutate: deletePhoto } = useDeletePhoto(activeProjectId);

  const photos = data?.results ?? [];

  if (!activeProjectId) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Photos"
          description="Select a project to view photos."
          actions={<UploadPhotosDialog />}
        />
        <p className="text-muted-foreground text-sm">No project selected.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Photos"
        description={`${photos.length} site photos for this project.`}
        actions={<UploadPhotosDialog />}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {isLoading ? (
          <>
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
          </>
        ) : (
          <>
            <StatCard label="Total photos" value={String(photos.length)} icon={Images} />
            <StatCard
              label="This month"
              value={String(
                photos.filter((p) => {
                  const d = new Date(p.uploaded_at);
                  const now = new Date();
                  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
                }).length
              )}
              icon={Images}
            />
          </>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      ) : photos.length === 0 ? (
        <p className="text-muted-foreground text-sm">No photos yet. Upload some to get started.</p>
      ) : (
        <PhotoAlbums photos={photos} onDelete={deletePhoto} />
      )}
    </div>
  );
}
