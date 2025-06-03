
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
    <header className="h-16 flex items-center justify-end px-6 backdrop-blur-xl bg-white/10 sticky top-0 z-40 w-full border-b border-white/10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-3 cursor-pointer hover:bg-white/10 rounded-xl p-3 transition-all duration-200 backdrop-blur-sm">
            <div className="text-right">
              <div className="text-sm font-medium text-white font-system">{roleDisplayName}</div>
              <div className="text-xs text-white/70">{userEmail}</div>
            </div>
            <Avatar className="h-9 w-9 ring-2 ring-white/20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white font-semibold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 backdrop-blur-xl bg-white/95 border border-white/20 shadow-xl" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none text-gray-900">{roleDisplayName}</p>
              <p className="text-xs leading-none text-gray-600">
                {userEmail}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/20" />
          <DropdownMenuItem onClick={() => navigate('/profile')} className="hover:bg-white/50">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/change-password')} className="hover:bg-white/50">
            <Lock className="mr-2 h-4 w-4" />
            <span>Change Password</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-white/20" />
          <DropdownMenuItem onClick={handleLogout} className="hover:bg-white/50">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
