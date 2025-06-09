
import {
  BarChartBig,
  Building2,
  Users,
  Settings,
  Bell,
  Package,
  Activity,
  TrendingUp,
  UserCog,
  CreditCard,
  FileText,
  DollarSign,
  UserCheck
} from "lucide-react";

export const adminNavItems = [
  {
    to: "/dashboard",
    icon: BarChartBig,
    label: "Dashboard",
  },
  {
    to: "/portfolio-managers",
    icon: UserCheck,
    label: "Portfolio Manager",
  },
  {
    to: "/billing",
    icon: Package,
    label: "Billing & Packages",
  },
  {
    to: "/notifications",
    icon: Bell,
    label: "Notifications",
  },
  {
    to: "/activity",
    icon: Activity,
    label: "Activity Logs",
  },
  {
    to: "/users",
    icon: UserCog,
    label: "Users Management",
  },
  {
    to: "/settings",
    icon: Settings,
    label: "Settings",
  },
];

export const portfolioManagerNavItems = [
  {
    to: "/portfolio-dashboard",
    icon: TrendingUp,
    label: "Dashboard",
  },
  {
    to: "/portfolio-hotels",
    icon: Building2,
    label: "My Hotels",
  },
  {
    to: "/revenue",
    icon: DollarSign,
    label: "Revenue",
  },
  {
    to: "/portfolio-investors",
    icon: Users,
    label: "My Investors",
  },
  {
    to: "/portfolio-staffs",
    icon: UserCog,
    label: "Hotel Staffs",
  },
  {
    to: "/subscription",
    icon: CreditCard,
    label: "Subscription",
  },
  {
    to: "/portfolio-settings",
    icon: Settings,
    label: "Settings",
  },
];

export const hotelStaffNavItems = [
  {
    to: "/staff-dashboard",
    icon: BarChartBig,
    label: "Dashboard",
  },
  {
    to: "/my-entries",
    icon: FileText,
    label: "My Entries",
  },
];
