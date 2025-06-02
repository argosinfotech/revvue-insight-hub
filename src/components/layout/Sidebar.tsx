
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import NavItem from "./NavItem";
import UserProfile from "./UserProfile";
import { adminNavItems, portfolioManagerNavItems, hotelStaffNavItems } from "./navigationConfig";

interface SidebarProps {
  userRole: string;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ userRole, isOpen, onToggle }: SidebarProps) => {
  const location = useLocation();

  const getNavItems = () => {
    if (userRole === 'hotel-staff') return hotelStaffNavItems;
    if (userRole === 'portfolio-manager') return portfolioManagerNavItems;
    return adminNavItems;
  };

  const navItems = getNavItems();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-white border-r transition-all duration-300 flex flex-col z-50",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-brand-purple rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          {isOpen && (
            <span className="font-bold text-xl">RevVue</span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={<item.icon size={20} />}
            label={item.label}
            isActive={location.pathname === item.to}
            isCollapsed={!isOpen}
          />
        ))}
      </div>

      <div className="border-t p-4">
        <UserProfile userRole={userRole} isCollapsed={!isOpen} />
      </div>
    </aside>
  );
};

export default Sidebar;
