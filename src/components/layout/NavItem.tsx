
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItemProps {
  to: string;
  icon: ReactNode;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const NavItem = ({ to, icon, label, isActive, isCollapsed }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative group",
        isActive
          ? "bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 text-[#667eea] border-l-4 border-[#667eea] shadow-sm"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      )}
      title={isCollapsed ? label : undefined}
    >
      <div className={cn(
        "flex items-center justify-center transition-transform duration-200",
        isActive && "scale-110"
      )}>
        {icon}
      </div>
      {!isCollapsed && (
        <span className="font-system transition-opacity duration-200">{label}</span>
      )}
      
      {/* Active indicator */}
      {isActive && (
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#667eea] to-[#764ba2] rounded-r-full" />
      )}
    </Link>
  );
};

export default NavItem;
