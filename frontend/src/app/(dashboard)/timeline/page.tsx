import type { Metadata } from "next";
import { TimelineView } from "@/features/timeline/components/timeline-view";

export const metadata: Metadata = { title: "Timeline" };

export default function TimelinePage() {
  return <TimelineView />;
}
