
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import { useUserRole } from "@/utils/userRole";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userRole = useUserRole();

  return (
    <div className="min-h-screen bg-white relative">
      <Sidebar
        userRole={userRole}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div 
        className={cn(
          "min-h-screen transition-all duration-300 ease-in-out",
          isSidebarOpen ? "ml-[250px]" : "ml-[70px]"
        )}
      >
        <Header userRole={userRole} />
        <main className="w-full">
          <div className="bg-white min-h-[calc(100vh-64px)] w-full">
            <div className="p-6 w-full max-w-none">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
