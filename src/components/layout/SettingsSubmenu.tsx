
import { User, Bell, Shield, CreditCard, HelpCircle, Mail } from "lucide-react";

interface SettingsSubmenuProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const SettingsSubmenu = ({ activeSection, onSectionChange }: SettingsSubmenuProps) => {
  const menuItems = [
    { id: "profile", icon: User, label: "Profile" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "security", icon: Shield, label: "Security" },
    { id: "billing", icon: CreditCard, label: "Billing" },
    { id: "email-templates", icon: Mail, label: "Email Templates" },
    { id: "help", icon: HelpCircle, label: "Help & Support" }
  ];

  return (
    <div className="space-y-2">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors text-sm ${
            activeSection === item.id
              ? 'bg-brand-purple/10 text-brand-purple'
              : 'hover:bg-gray-100 text-gray-600'
          }`}
          onClick={() => onSectionChange(item.id)}
        >
          <item.icon className="h-4 w-4" />
          <span className="font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default SettingsSubmenu;
