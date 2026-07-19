export type MaterialStatus = "delivered" | "ordered" | "pending" | "backordered";

export type MaterialCategory =
  | "Lumber"
  | "Electrical"
  | "Plumbing"
  | "Finishes"
  | "Masonry"
  | "Roofing"
  | "Drywall"
  | "Hardware"
  | "HVAC";

export interface Material {
  id: string;
  name: string;
  category: MaterialCategory;
  quantity: number;
  unit: string;
  unitCost: number;
  supplier: string;
  status: MaterialStatus;
}
