import { useState } from "react";
import { User, Bell, Shield, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";
import EmailTemplates from "@/components/email-templates/EmailTemplates";
import EmailSmsTemplates from "@/components/email-sms-templates/EmailSmsTemplates";
import SettingsSubmenu from "@/components/layout/SettingsSubmenu";

const PortfolioSettings = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "Portfolio Manager",
    email: "manager@example.com",
    phone: "+1 (555) 123-4567",
    company: "Hotel Group Inc.",
    address: "123 Business St, City, State 12345"
  });

  const [notifications, setNotifications] = useState({
    emailReports: true,
    investorUpdates: true,
    revenueAlerts: false,
    maintenanceNotifications: true,
    marketingEmails: false
  });

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    sessionTimeout: "30"
  });

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully!");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences updated!");
  };

  const handleSaveSecurity = () => {
    toast.success("Security settings updated!");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and business details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-lg">PM</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">Change Photo</Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={profileData.company}
                    onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Business Address</Label>
                <Input
                  id="address"
                  value={profileData.address}
                  onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                />
              </div>

              <Button onClick={handleSaveProfile} className="bg-brand-purple hover:bg-brand-purple-dark">
                <Save className="h-4 w-4 mr-2" />
                Save Profile
              </Button>
            </CardContent>
          </Card>
        );

      case "notifications":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-reports">Email Reports</Label>
                    <p className="text-sm text-muted-foreground">Weekly revenue and performance reports</p>
                  </div>
                  <Switch
                    id="email-reports"
                    checked={notifications.emailReports}
                    onCheckedChange={(checked) => setNotifications({...notifications, emailReports: checked})}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="investor-updates">Investor Updates</Label>
                    <p className="text-sm text-muted-foreground">Notifications about investor activities</p>
                  </div>
                  <Switch
                    id="investor-updates"
                    checked={notifications.investorUpdates}
                    onCheckedChange={(e) => setNotifications({...notifications, investorUpdates: e.target.checked})}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="revenue-alerts">Revenue Alerts</Label>
                    <p className="text-sm text-muted-foreground">Alerts for significant revenue changes</p>
                  </div>
                  <Switch
                    id="revenue-alerts"
                    checked={notifications.revenueAlerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, revenueAlerts: checked})}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance">Maintenance Notifications</Label>
                    <p className="text-sm text-muted-foreground">System maintenance and updates</p>
                  </div>
                  <Switch
                    id="maintenance"
                    checked={notifications.maintenanceNotifications}
                    onCheckedChange={(checked) => setNotifications({...notifications, maintenanceNotifications: checked})}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketing">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Product updates and promotional content</p>
                  </div>
                  <Switch
                    id="marketing"
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => setNotifications({...notifications, marketingEmails: checked})}
                  />
                </div>
              </div>

              <Button onClick={handleSaveNotifications} className="bg-brand-purple hover:bg-brand-purple-dark">
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        );

      case "security":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage your account security and privacy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    id="two-factor"
                    checked={security.twoFactorEnabled}
                    onCheckedChange={(checked) => setSecurity({...security, twoFactorEnabled: checked})}
                  />
                </div>

                <Separator />

                <div>
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    value={security.sessionTimeout}
                    onChange={(e) => setSecurity({...security, sessionTimeout: e.target.value})}
                    className="w-32 mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Automatically log out after this period of inactivity
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full">
                  Download Account Data
                </Button>
              </div>

              <Button onClick={handleSaveSecurity} className="bg-brand-purple hover:bg-brand-purple-dark">
                <Save className="h-4 w-4 mr-2" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        );

      case "email-templates":
        return <EmailTemplates />;

      case "email-sms-templates":
        return <EmailSmsTemplates />;

      default:
        return (
          <Card>
            <CardContent className="py-8">
              <p className="text-center text-muted-foreground">
                This section is under development.
              </p>
            </CardContent>
          </Card>
        );
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
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and settings</p>
        </div>

        {/* Settings Content */}
        <div className="max-w-4xl">
          {renderContent()}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PortfolioSettings;
