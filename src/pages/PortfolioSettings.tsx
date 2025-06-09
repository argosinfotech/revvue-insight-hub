
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import SettingsSubmenu from "@/components/layout/SettingsSubmenu";
import EmailTemplates from "@/components/email-templates/EmailTemplates";
import EmailSmsTemplates from "@/components/email-sms-templates/EmailSmsTemplates";

const PortfolioSettings = () => {
  const [activeSection, setActiveSection] = useState("email-templates");

  const renderContent = () => {
    switch (activeSection) {
      case "email-templates":
        return <EmailTemplates />;
      case "email-sms-templates":
        return <EmailSmsTemplates />;
      case "help":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Help & Support</CardTitle>
              <CardDescription>
                Get help and support for your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Contact Support</h3>
                  <p className="text-muted-foreground mb-4">
                    Need help? Our support team is here to assist you.
                  </p>
                  <div className="space-y-2">
                    <p><strong>Email:</strong> support@example.com</p>
                    <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                    <p><strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM EST</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Documentation</h3>
                  <p className="text-muted-foreground mb-4">
                    Access our comprehensive documentation and guides.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Getting Started Guide</li>
                    <li>API Documentation</li>
                    <li>Integration Tutorials</li>
                    <li>Best Practices</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">System Status</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">All systems operational</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return <EmailTemplates />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Settings Menu</CardTitle>
              </CardHeader>
              <CardContent>
                <SettingsSubmenu 
                  activeSection={activeSection} 
                  onSectionChange={setActiveSection} 
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PortfolioSettings;
