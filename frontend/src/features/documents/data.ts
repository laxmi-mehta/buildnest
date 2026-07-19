/** Realistic dummy data for the documents library. Swaps to the API layer later. */

export type DocumentCategory = "Permit" | "Contract" | "Invoice" | "Plan" | "Report";

export interface DocumentItem {
  id: string;
  name: string;
  category: DocumentCategory;
  size: string;
  uploadedBy: string;
  date: string;
  awaitingSignature?: boolean;
}

export const documents: DocumentItem[] = [
  {
    id: "doc_01",
    name: "Electrical permit E-2094.pdf",
    category: "Permit",
    size: "1.2 MB",
    uploadedBy: "BBMP",
    date: "Jul 14, 2026",
  },
  {
    id: "doc_02",
    name: "Cabinetry contract — signed.pdf",
    category: "Contract",
    size: "840 KB",
    uploadedBy: "Arjun Mehta",
    date: "Jul 13, 2026",
  },
  {
    id: "doc_03",
    name: "HVAC spec sheet v3.pdf",
    category: "Report",
    size: "2.4 MB",
    uploadedBy: "Kumar Mechanical",
    date: "Jul 11, 2026",
  },
  {
    id: "doc_04",
    name: "Tile selection quote.xlsx",
    category: "Invoice",
    size: "96 KB",
    uploadedBy: "Stone & Tile Co.",
    date: "Jul 9, 2026",
  },
  {
    id: "doc_05",
    name: "Change order #7 — kitchen island.pdf",
    category: "Contract",
    size: "640 KB",
    uploadedBy: "Arjun Mehta",
    date: "Jul 8, 2026",
    awaitingSignature: true,
  },
  {
    id: "doc_06",
    name: "Foundation inspection report.pdf",
    category: "Report",
    size: "3.1 MB",
    uploadedBy: "BBMP",
    date: "Jul 2, 2026",
  },
  {
    id: "doc_07",
    name: "Floor plan — level 1 rev C.pdf",
    category: "Plan",
    size: "5.8 MB",
    uploadedBy: "Hartley Design Studio",
    date: "Jun 28, 2026",
  },
  {
    id: "doc_08",
    name: "Floor plan — level 2 rev C.pdf",
    category: "Plan",
    size: "5.4 MB",
    uploadedBy: "Hartley Design Studio",
    date: "Jun 28, 2026",
  },
  {
    id: "doc_09",
    name: "Plumbing rough-in invoice #1042.pdf",
    category: "Invoice",
    size: "210 KB",
    uploadedBy: "Sharma Plumbing",
    date: "Jun 24, 2026",
  },
  {
    id: "doc_10",
    name: "Framing lumber invoice #2210.xlsx",
    category: "Invoice",
    size: "132 KB",
    uploadedBy: "Beam & Board Supply",
    date: "Jun 18, 2026",
  },
  {
    id: "doc_11",
    name: "Roofing contract — pending.pdf",
    category: "Contract",
    size: "760 KB",
    uploadedBy: "Summit Roofing",
    date: "Jun 15, 2026",
    awaitingSignature: true,
  },
  {
    id: "doc_12",
    name: "Landscape concept sketch.png",
    category: "Plan",
    size: "4.2 MB",
    uploadedBy: "Hartley Design Studio",
    date: "Jun 10, 2026",
  },
  {
    id: "doc_13",
    name: "Building permit B-1187.pdf",
    category: "Permit",
    size: "1.5 MB",
    uploadedBy: "BBMP",
    date: "May 30, 2026",
  },
  {
    id: "doc_14",
    name: "Facade elevation render.jpg",
    category: "Plan",
    size: "6.3 MB",
    uploadedBy: "Hartley Design Studio",
    date: "May 22, 2026",
  },
];

export const documentStats = {
  total: documents.length,
  storageUsed: "32.6 MB",
  awaitingSignature: documents.filter((d) => d.awaitingSignature).length,
};
