
import { useLocation } from "react-router-dom";

export const useUserRole = () => {
  const location = useLocation();

  const getUserRole = () => {
    // Check sessionStorage or localStorage for user role
    const storedRole = sessionStorage.getItem('userRole') || localStorage.getItem('userRole');
    if (storedRole) {
      return storedRole;
    }
    
    // Fallback: determine based on current path or referrer
    const currentPath = location.pathname;
    if (currentPath.startsWith('/portfolio') || currentPath === '/subscription' || currentPath === '/revenue') {
      sessionStorage.setItem('userRole', 'portfolio-manager');
      return 'portfolio-manager';
    } else if (currentPath.startsWith('/staff')) {
      sessionStorage.setItem('userRole', 'hotel-staff');
      return 'hotel-staff';
    } else if (currentPath.startsWith('/dashboard') || currentPath === '/hotels' || currentPath === '/investors' || currentPath === '/billing' || currentPath === '/activity' || currentPath === '/users' || currentPath === '/settings' || currentPath === '/notifications') {
      sessionStorage.setItem('userRole', 'admin');
      return 'admin';
    }
    
    // Default to portfolio manager
    return 'portfolio-manager';
  };

  return getUserRole();
};
