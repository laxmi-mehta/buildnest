import type { Metadata } from "next";
import { PhotosView } from "@/features/photos/components/photos-view";

export const metadata: Metadata = { title: "Photos" };

export default function PhotosPage() {
  return <PhotosView />;
}
