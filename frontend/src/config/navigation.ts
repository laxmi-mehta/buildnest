import {
  BarChart3,
  Bell,
  CircleHelp,
  FileText,
  FolderKanban,
  GanttChartSquare,
  HardHat,
  Image,
  LayoutDashboard,
  ListTodo,
  Milestone,
  Package,
  PiggyBank,
  Receipt,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  /** Small badge shown next to the item (e.g. unread count). Dummy for now. */
  badge?: string;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

/**
 * Single source of truth for app navigation — the sidebar, command palette
 * and breadcrumbs all derive from this config.
 */
export const navigation: NavSection[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { title: "Projects", href: "/projects", icon: FolderKanban },
      { title: "Analytics", href: "/analytics", icon: BarChart3 },
      { title: "Reports", href: "/reports", icon: FileText },
    ],
  },
  {
    label: "Money",
    items: [
      { title: "Budget", href: "/budget", icon: PiggyBank },
      { title: "Expenses", href: "/expenses", icon: Receipt },
    ],
  },
  {
    label: "Build",
    items: [
      { title: "Materials", href: "/materials", icon: Package },
      { title: "Contractors", href: "/contractors", icon: HardHat },
      { title: "Timeline", href: "/timeline", icon: GanttChartSquare },
      { title: "Tasks", href: "/tasks", icon: ListTodo, badge: "8" },
      { title: "Milestones", href: "/milestones", icon: Milestone },
    ],
  },
  {
    label: "Records",
    items: [
      { title: "Documents", href: "/documents", icon: FileText },
      { title: "Photos", href: "/photos", icon: Image },
    ],
  },
];

export const secondaryNavigation: NavItem[] = [
  { title: "Notifications", href: "/notifications", icon: Bell, badge: "4" },
  { title: "Settings", href: "/settings", icon: Settings },
  { title: "Help", href: "/help", icon: CircleHelp },
];

/** Flat list used by the command palette and breadcrumb resolution. */
export const allNavItems: NavItem[] = [
  ...navigation.flatMap((s) => s.items),
  ...secondaryNavigation,
];
