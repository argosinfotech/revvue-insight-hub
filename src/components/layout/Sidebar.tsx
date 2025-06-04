
import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import NavItem from "./NavItem";
import { adminNavItems, portfolioManagerNavItems, hotelStaffNavItems } from "./navigationConfig";
import { ReactNode } from "react";

interface SidebarProps {
  userRole: string;
  isOpen: boolean;
  onToggle: () => void;
  additionalContent?: ReactNode;
}

const Sidebar = ({ userRole, isOpen, onToggle, additionalContent }: SidebarProps) => {
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
        "fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] flex flex-col z-50 shadow-xl",
        isOpen ? "w-[250px]" : "w-[70px]"
      )}
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          {isOpen && (
            <span className="font-bold text-xl text-gray-900 font-system">RevVue</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
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
        
        {/* Additional Content */}
        {additionalContent && isOpen && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            {additionalContent}
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <div className="absolute -right-4 top-6 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8 rounded-full bg-white hover:bg-gray-50 border border-gray-200 shadow-md transition-all duration-200"
        >
          <Menu size={16} className="text-gray-700" />
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
