import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { PhotoAlbums } from "@/features/photos/components/photo-albums";
import { UploadPhotosDialog } from "@/features/photos/components/upload-photos-dialog";
import { albums, totalPhotoCount } from "@/features/photos/data";

export const metadata: Metadata = { title: "Photos" };

export default function PhotosPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Photos"
        description={`${totalPhotoCount} photos across ${albums.length} albums, from site prep to finishing.`}
        actions={<UploadPhotosDialog />}
      />
      <PhotoAlbums />
    </div>
  );
}
