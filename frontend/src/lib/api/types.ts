// API response types — mirrors Django REST Framework serializers exactly.
// Decimal fields come back as strings (DRF default for DecimalField).

export interface ApiProjectList {
  id: number;
  name: string;
  city: string;
  status: "planning" | "active" | "on_hold" | "completed";
  total_budget: string | null;
  start_date: string | null;
  expected_end_date: string | null;
  created_at: string;
}

export interface ApiProject extends ApiProjectList {
  description: string;
  address: string;
  plot_area_sqft: string | null;
  built_area_sqft: string | null;
  total_floors: number;
  updated_at: string;
}

export type CreateProjectInput = {
  name: string;
  city?: string;
  address?: string;
  description?: string;
  total_budget?: number | null;
  total_floors?: number;
  start_date?: string | null;
  expected_end_date?: string | null;
};

export interface ApiExpense {
  id: number;
  project: number;
  category: "materials" | "labor" | "design" | "permits" | "equipment" | "misc";
  description: string;
  amount: string;
  date: string;
  payee: string;
  payment_method: "cash" | "cheque" | "bank_transfer" | "upi";
  notes: string;
  created_at: string;
  updated_at: string;
}

export type CreateExpenseInput = {
  project: number;
  category: ApiExpense["category"];
  description: string;
  amount: number;
  date: string;
  payee?: string;
  payment_method?: ApiExpense["payment_method"];
  notes?: string;
};

export interface ApiTask {
  id: number;
  project: number;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done" | "blocked";
  priority: "low" | "medium" | "high" | "urgent";
  due_date: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export type CreateTaskInput = {
  project: number;
  title: string;
  description?: string;
  status?: ApiTask["status"];
  priority?: ApiTask["priority"];
  due_date?: string | null;
};

export interface ApiMilestone {
  id: number;
  project: number;
  name: string;
  description: string;
  target_date: string | null;
  completed_date: string | null;
  status: "pending" | "in_progress" | "completed" | "delayed";
  created_at: string;
  updated_at: string;
}

export type CreateMilestoneInput = {
  project: number;
  name: string;
  description?: string;
  target_date?: string | null;
  status?: ApiMilestone["status"];
};

export interface ApiMaterial {
  id: number;
  project: number;
  name: string;
  category:
    | "cement"
    | "steel"
    | "bricks"
    | "sand"
    | "tiles"
    | "wood"
    | "electrical"
    | "plumbing"
    | "paint"
    | "misc";
  quantity: string;
  unit: "bags" | "kg" | "tons" | "sqft" | "nos" | "meters" | "liters" | "cft";
  unit_cost: string;
  total_cost: number;
  vendor: string;
  delivery_status: "required" | "ordered" | "delivered" | "installed";
  ordered_date: string | null;
  delivered_date: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

export type CreateMaterialInput = {
  project: number;
  name: string;
  category: ApiMaterial["category"];
  quantity: number;
  unit: ApiMaterial["unit"];
  unit_cost: number;
  vendor?: string;
  delivery_status?: ApiMaterial["delivery_status"];
  notes?: string;
};

export interface ApiContractor {
  id: number;
  project: number;
  name: string;
  trade:
    | "architect"
    | "civil_engineer"
    | "interior_designer"
    | "electrician"
    | "plumber"
    | "carpenter"
    | "painter"
    | "mason"
    | "general";
  phone: string;
  email: string;
  company: string;
  contract_amount: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

export type CreateContractorInput = {
  project: number;
  name: string;
  trade: ApiContractor["trade"];
  phone?: string;
  email?: string;
  company?: string;
  contract_amount?: number | null;
  notes?: string;
};
