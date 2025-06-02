
import { useNavigate } from "react-router-dom";
import { Bell, User, Lock, LogOut } from "lucide-react";
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
  );
};

export default Header;
