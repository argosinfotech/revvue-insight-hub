
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
    <div className="min-h-screen w-full bg-gradient-to-br from-[#667eea] to-[#764ba2] relative">
      <Sidebar
        userRole={userRole}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div 
        className={cn(
          "transition-all duration-300 ease-in-out min-h-screen",
          isSidebarOpen ? "ml-[250px]" : "ml-[70px]"
        )}
      >
        <Header userRole={userRole} />
        <main className="p-6">
          <div className="backdrop-blur-xl bg-white/95 rounded-2xl shadow-xl border border-white/20 min-h-[calc(100vh-140px)]">
            <div className="p-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
