
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
    <div className="min-h-screen flex w-full">
      <Sidebar
        userRole={userRole}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex flex-col min-h-screen w-full">
        <Header userRole={userRole} />
        <main className="flex-1 w-full bg-gray-50 p-6 overflow-x-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
