import { useNavigate } from "react-router-dom";
import { User, Lock, LogOut } from "lucide-react";
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

interface HeaderProps {
  userRole: string;
}

const Header = ({ userRole }: HeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('userRole');
    localStorage.removeItem('userRole');
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const getRoleDisplayName = () => {
    if (userRole === 'hotel-staff') return "Hotel Staff";
    if (userRole === 'portfolio-manager') return "Portfolio Manager";
    return "Super Admin";
  };

  const getUserEmail = () => {
    if (userRole === 'hotel-staff') return "staff@example.com";
    if (userRole === 'portfolio-manager') return "manager@example.com";
    return "admin@example.com";
  };

  const getUserInitials = () => {
    if (userRole === 'hotel-staff') return "HS";
    if (userRole === 'portfolio-manager') return "PM";
    return "SA";
  };

  const roleDisplayName = getRoleDisplayName();
  const userEmail = getUserEmail();
  const userInitials = getUserInitials();

  return (
    <header className="h-16 flex items-center justify-end px-6 bg-white sticky top-0 z-40 w-full border-b border-gray-200 relative">
      {/* Extended border that connects to sidebar */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gray-200" />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-xl p-3 transition-all duration-200">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900 font-system">{roleDisplayName}</div>
              <div className="text-xs text-gray-500">{userEmail}</div>
            </div>
            <Avatar className="h-9 w-9 ring-2 ring-gray-200">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white font-semibold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none text-gray-900">{roleDisplayName}</p>
              <p className="text-xs leading-none text-gray-600">
                {userEmail}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-100" />
          <DropdownMenuItem onClick={() => navigate('/profile')} className="hover:bg-gray-50">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/change-password')} className="hover:bg-gray-50">
            <Lock className="mr-2 h-4 w-4" />
            <span>Change Password</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-100" />
          <DropdownMenuItem onClick={handleLogout} className="hover:bg-gray-50">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
