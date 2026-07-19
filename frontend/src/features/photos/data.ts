/** Realistic dummy data for the photo library. Placeholder tiles until storage lands. */

export interface AlbumPhoto {
  id: string;
  label: string;
  /** Placeholder tile tone — mirrors the dashboard recentPhotos pattern. */
  tone: string;
}

export interface PhotoAlbum {
  id: string;
  title: string;
  dateRange: string;
  photos: AlbumPhoto[];
}

export const albums: PhotoAlbum[] = [
  {
    id: "alb_01",
    title: "Site prep",
    dateRange: "Feb 3 – Feb 21, 2026",
    photos: [
      { id: "ph_101", label: "Lot clearing", tone: "bg-chart-1/20" },
      { id: "ph_102", label: "Grading complete", tone: "bg-chart-2/20" },
      { id: "ph_103", label: "Utility trenching", tone: "bg-chart-3/20" },
      { id: "ph_104", label: "Soil compaction", tone: "bg-chart-4/20" },
      { id: "ph_105", label: "Survey stakes", tone: "bg-chart-5/20" },
      { id: "ph_106", label: "Temporary fencing", tone: "bg-chart-1/20" },
    ],
  },
  {
    id: "alb_02",
    title: "Foundation",
    dateRange: "Feb 24 – Mar 20, 2026",
    photos: [
      { id: "ph_201", label: "Footing forms", tone: "bg-chart-2/20" },
      { id: "ph_202", label: "Rebar layout", tone: "bg-chart-3/20" },
      { id: "ph_203", label: "First pour", tone: "bg-chart-4/20" },
      { id: "ph_204", label: "Slab curing", tone: "bg-chart-5/20" },
      { id: "ph_205", label: "Foundation walls", tone: "bg-chart-1/20" },
      { id: "ph_206", label: "Waterproofing", tone: "bg-chart-2/20" },
      { id: "ph_207", label: "Backfill", tone: "bg-chart-3/20" },
      { id: "ph_208", label: "Anchor bolts", tone: "bg-chart-4/20" },
    ],
  },
  {
    id: "alb_03",
    title: "Framing",
    dateRange: "Mar 24 – May 2, 2026",
    photos: [
      { id: "ph_301", label: "First walls up", tone: "bg-chart-5/20" },
      { id: "ph_302", label: "Second floor joists", tone: "bg-chart-1/20" },
      { id: "ph_303", label: "Roof trusses", tone: "bg-chart-2/20" },
      { id: "ph_304", label: "Sheathing", tone: "bg-chart-3/20" },
      { id: "ph_305", label: "Window openings", tone: "bg-chart-4/20" },
      { id: "ph_306", label: "Garage framing", tone: "bg-chart-5/20" },
      { id: "ph_307", label: "Stair stringers", tone: "bg-chart-1/20" },
    ],
  },
  {
    id: "alb_04",
    title: "Systems rough-in",
    dateRange: "May 5 – Jun 12, 2026",
    photos: [
      { id: "ph_401", label: "Electrical panel", tone: "bg-chart-2/20" },
      { id: "ph_402", label: "Wiring — level 1", tone: "bg-chart-3/20" },
      { id: "ph_403", label: "HVAC trunk lines", tone: "bg-chart-4/20" },
      { id: "ph_404", label: "Plumbing stacks", tone: "bg-chart-5/20" },
      { id: "ph_405", label: "Low-voltage runs", tone: "bg-chart-1/20" },
      { id: "ph_406", label: "Inspection day", tone: "bg-chart-2/20" },
    ],
  },
  {
    id: "alb_05",
    title: "Finishing",
    dateRange: "Jun 16, 2026 – present",
    photos: [
      { id: "ph_501", label: "Drywall — level 2", tone: "bg-chart-3/20" },
      { id: "ph_502", label: "Kitchen rough-in", tone: "bg-chart-4/20" },
      { id: "ph_503", label: "Master bath tile", tone: "bg-chart-5/20" },
      { id: "ph_504", label: "Facade progress", tone: "bg-chart-1/20" },
      { id: "ph_505", label: "Paint samples", tone: "bg-chart-2/20" },
    ],
  },
];

export const totalPhotoCount = albums.reduce((sum, album) => sum + album.photos.length, 0);
