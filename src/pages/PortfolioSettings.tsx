
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import SettingsSubmenu from "@/components/layout/SettingsSubmenu";
import { useUserRole } from "@/utils/userRole";

// Settings section components
import Profile from "./Profile";
import Notifications from "./Notifications";
import Billing from "./Billing";
import ChangePassword from "./ChangePassword";
import EmailTemplates from "@/components/email-templates/EmailTemplates";

const PortfolioSettings = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const userRole = useUserRole();

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <Profile />;
      case "notifications":
        return <Notifications />;
      case "security":
        return <ChangePassword />;
      case "billing":
        return <Billing />;
      case "email-templates":
        return <EmailTemplates />;
      case "help":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Help & Support</h3>
              <p className="text-sm text-gray-600">Get help and support for your account.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border">
              <p>Help content will be available here.</p>
            </div>
          </div>
        );
      default:
        return <Profile />;
    }
  };

  const sidebarContent = (
    <SettingsSubmenu 
      activeSection={activeSection} 
      onSectionChange={setActiveSection} 
    />
  );

  return (
    <DashboardLayout sidebarContent={sidebarContent}>
      <div className="space-y-6">
        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

export default PortfolioSettings;
