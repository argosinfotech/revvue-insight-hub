import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import SettingsSubmenu from "@/components/layout/SettingsSubmenu";
import EmailSmsTemplates from "@/components/email-sms-templates/EmailSmsTemplates";

const PortfolioSettings = () => {
  const [activeSection, setActiveSection] = useState("email-sms-templates");

  const renderContent = () => {
    switch (activeSection) {
      case "email-sms-templates":
        return <EmailSmsTemplates />;
      case "help":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Helpdesk</CardTitle>
              <CardDescription>
                Get help and support for your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Button 
                    className="mb-6"
                    onClick={() => window.open('https://argos-helpdesk.com', '_blank')}
                  >
                    Go to Argos Helpdesk
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return <EmailSmsTemplates />;
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
