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
  TrendingUp,
  UserCog,
  CreditCard,
  User,
  Lock,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  // Determine user role - for now, we'll use a simple check based on previous navigation
  // In a real app, this would come from authentication context/state management
  const getUserRole = () => {
    // Check sessionStorage or localStorage for user role
    const storedRole = sessionStorage.getItem('userRole') || localStorage.getItem('userRole');
    if (storedRole) {
      return storedRole;
    }
    
    // Fallback: determine based on current path or referrer
    const currentPath = location.pathname;
    if (currentPath.startsWith('/portfolio') || currentPath === '/subscription') {
      sessionStorage.setItem('userRole', 'portfolio-manager');
      return 'portfolio-manager';
    } else if (currentPath.startsWith('/staff')) {
      sessionStorage.setItem('userRole', 'hotel-staff');
      return 'hotel-staff';
    } else if (currentPath.startsWith('/dashboard') || currentPath === '/hotels' || currentPath === '/investors' || currentPath === '/billing' || currentPath === '/activity' || currentPath === '/users' || currentPath === '/settings' || currentPath === '/notifications') {
      sessionStorage.setItem('userRole', 'admin');
      return 'admin';
    }
    
    // For common pages, check browser history or default to portfolio manager
    // You could also check document.referrer or use a more sophisticated method
    return 'portfolio-manager'; // Default to portfolio manager
  };

  const userRole = getUserRole();
  const isPortfolioManager = userRole === 'portfolio-manager';
  const isHotelStaff = userRole === 'hotel-staff';
  const isAdmin = userRole === 'admin';

  const handleLogout = () => {
    // Clear user role on logout
    sessionStorage.removeItem('userRole');
    localStorage.removeItem('userRole');
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
      to: "/users",
      icon: <UserCog size={20} />,
      label: "Users Management",
    },
    {
      to: "/settings",
      icon: <Settings size={20} />,
      label: "Settings",
    },
  ];

  const portfolioManagerNavItems = [
    {
      to: "/portfolio-dashboard",
      icon: <TrendingUp size={20} />,
      label: "Dashboard",
    },
    {
      to: "/portfolio-hotels",
      icon: <Building2 size={20} />,
      label: "My Hotels",
    },
    {
      to: "/portfolio-investors",
      icon: <Users size={20} />,
      label: "My Investors",
    },
    {
      to: "/portfolio-staffs",
      icon: <UserCog size={20} />,
      label: "Hotel Staffs",
    },
    {
      to: "/subscription",
      icon: <CreditCard size={20} />,
      label: "Subscription",
    },
    {
      to: "/portfolio-settings",
      icon: <Settings size={20} />,
      label: "Settings",
    },
  ];

  const hotelStaffNavItems = [
    {
      to: "/staff-dashboard",
      icon: <BarChartBig size={20} />,
      label: "Dashboard",
    },
    {
      to: "/my-entries",
      icon: <FileText size={20} />,
      label: "My Entries",
    },
  ];

  const getNavItems = () => {
    if (isHotelStaff) return hotelStaffNavItems;
    if (isPortfolioManager) return portfolioManagerNavItems;
    return adminNavItems;
  };

  const navItems = getNavItems();
  
  const getRoleDisplayName = () => {
    if (isHotelStaff) return "Hotel Staff";
    if (isPortfolioManager) return "Portfolio Manager";
    return "Super Admin";
  };

  const getUserEmail = () => {
    if (isHotelStaff) return "staff@example.com";
    if (isPortfolioManager) return "manager@example.com";
    return "admin@example.com";
  };

  const getUserInitials = () => {
    if (isHotelStaff) return "HS";
    if (isPortfolioManager) return "PM";
    return "SA";
  };

  const roleDisplayName = getRoleDisplayName();
  const userEmail = getUserEmail();
  const userInitials = getUserInitials();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-white border-r transition-all duration-300 flex flex-col z-50",
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
                  <span className="text-sm font-medium">{roleDisplayName}</span>
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
      <div 
        className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        <header className="h-16 border-b flex items-center justify-end px-6 bg-white sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Bell size={16} className="mr-1" /> 
              Notifications
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-right">
                    <div className="text-sm font-medium">{roleDisplayName}</div>
                    <div className="text-xs text-gray-500">{userEmail}</div>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{roleDisplayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userEmail}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/change-password')}>
                  <Lock className="mr-2 h-4 w-4" />
                  <span>Change Password</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
