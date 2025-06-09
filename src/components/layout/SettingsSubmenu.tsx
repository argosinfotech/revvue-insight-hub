
import { Mail, HelpCircle, MessageSquare } from "lucide-react";

interface SettingsSubmenuProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const SettingsSubmenu = ({ activeSection, onSectionChange }: SettingsSubmenuProps) => {
  const menuItems = [
    { id: "email-templates", icon: Mail, label: "Email Templates" },
    { id: "email-sms-templates", icon: MessageSquare, label: "Email/SMS Template" },
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
