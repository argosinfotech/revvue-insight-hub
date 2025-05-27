
import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  BarChartBig, 
  Building2, 
  Users, 
  Settings, 
  Bell, 
  Package, 
  LogOut, 
  Menu, 
  X, 
  Activity,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface NavItemProps {
  to: string;
  icon: ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium",
        isActive
          ? "bg-brand-purple text-white"
          : "text-gray-600 hover:bg-gray-100"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Determine if this is a Portfolio Manager based on the current path
  const isPortfolioManager = location.pathname.startsWith('/portfolio');

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // Different navigation items based on user role
  const adminNavItems = [
    {
      to: "/dashboard",
      icon: <BarChartBig size={20} />,
      label: "Dashboard",
    },
    {
      to: "/hotels",
      icon: <Building2 size={20} />,
      label: "Hotels",
    },
    {
      to: "/investors",
      icon: <Users size={20} />,
      label: "Investors",
    },
    {
      to: "/billing",
      icon: <Package size={20} />,
      label: "Billing & Packages",
    },
    {
      to: "/notifications",
      icon: <Bell size={20} />,
      label: "Notifications",
    },
    {
      to: "/activity",
      icon: <Activity size={20} />,
      label: "Activity Logs",
    },
    {
      to: "/settings",
      icon: <Settings size={20} />,
      label: "Settings",
    },
  ];

  const portfolioManagerNavItems = [
    {
      to: "/portfolio-hotels",
      icon: <Building2 size={20} />,
      label: "My Hotels",
    },
    {
      to: "/portfolio-dashboard",
      icon: <TrendingUp size={20} />,
      label: "Revenue Analytics",
    },
    {
      to: "/portfolio-investors",
      icon: <Users size={20} />,
      label: "My Investors",
    },
    {
      to: "/portfolio-settings",
      icon: <Settings size={20} />,
      label: "Settings",
    },
  ];

  const navItems = isPortfolioManager ? portfolioManagerNavItems : adminNavItems;
  const userRole = isPortfolioManager ? "Portfolio Manager" : "Super Admin";
  const userEmail = isPortfolioManager ? "manager@example.com" : "admin@example.com";
  const userInitials = isPortfolioManager ? "PM" : "SA";

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "h-screen bg-white border-r transition-all duration-300 flex flex-col",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-brand-purple rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            {isSidebarOpen && (
              <span className="font-bold text-xl">RevVue</span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.to}
            />
          ))}
        </div>

        <div className="border-t p-4">
          {isSidebarOpen ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{userRole}</span>
                  <span className="text-xs text-gray-500">{userEmail}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut size={18} />
              </Button>
            </div>
          ) : (
            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut size={18} />
              </Button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b flex items-center justify-end px-6 bg-white">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Bell size={16} className="mr-1" /> 
              Notifications
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
