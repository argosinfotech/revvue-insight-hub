
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
    <div className="min-h-screen flex w-full bg-white">
      <Sidebar
        userRole={userRole}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        <Header userRole={userRole} />
        <main className="flex-1 w-full">
          <div className="bg-white min-h-full w-full">
            <div className="p-6 w-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
