import {
  ChartColumn,
  Clock,
  FolderKanban,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { label: string; href: string; icon: LucideIcon; active?: boolean };

export const navItems: NavItem[] = [
  { label: "Overview", href: "/", icon: LayoutDashboard, active: true },
  { label: "Timesheet", href: "#timesheet", icon: Clock },
  { label: "Projects", href: "#projects", icon: FolderKanban },
  { label: "Reports", href: "#reports", icon: ChartColumn },
  { label: "Team", href: "#team", icon: Users },
  { label: "Messages", href: "#messages", icon: MessageSquare },
  { label: "Settings", href: "#settings", icon: Settings },
];
