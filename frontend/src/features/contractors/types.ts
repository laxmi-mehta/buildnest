export type ContractorStatus = "on-site" | "scheduled" | "completed";

export interface Contractor {
  id: string;
  /** Primary contact person. */
  name: string;
  company: string;
  trade: string;
  rating: number;
  phone: string;
  email: string;
  specialties: string[];
  totalPaid: number;
  status: ContractorStatus;
}
