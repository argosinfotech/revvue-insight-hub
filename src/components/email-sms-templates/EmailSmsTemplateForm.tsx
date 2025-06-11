
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface EmailSmsTemplate {
  id: string;
  notificationType: "Email" | "SMS";
  title: string;
  subject?: string;
  token?: string;
  body: string;
  createdDate: string;
}

interface EmailSmsTemplateFormProps {
  template?: EmailSmsTemplate | null;
  onSave: (data: Omit<EmailSmsTemplate, 'id' | 'createdDate'>) => void;
  onCancel: () => void;
}

const EmailSmsTemplateForm = ({ template, onSave, onCancel }: EmailSmsTemplateFormProps) => {
  const [formData, setFormData] = useState({
    notificationType: "Email" as "Email" | "SMS",
    title: "",
    subject: "",
    token: "",
    body: ""
  });

  useEffect(() => {
    if (template) {
      setFormData({
        notificationType: template.notificationType,
        title: template.title,
        subject: template.subject || "",
        token: template.token || "",
        body: template.body
      });
    } else {
      setFormData({
        notificationType: "Email",
        title: "",
        subject: "",
        token: "",
        body: ""
      });
    }
  }, [template]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData: Omit<EmailSmsTemplate, 'id' | 'createdDate'> = {
      notificationType: formData.notificationType,
      title: formData.title,
      body: formData.body
    };
    
    // Only include subject for Email templates
    if (formData.notificationType === "Email" && formData.subject) {
      submitData.subject = formData.subject;
    }

    // Include token if provided
    if (formData.token) {
      submitData.token = formData.token;
    }
    
    onSave(submitData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="notificationType">Notification Type</Label>
        <Select
          value={formData.notificationType}
          onValueChange={(value: "Email" | "SMS") => handleInputChange('notificationType', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select notification type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Email">Email</SelectItem>
            <SelectItem value="SMS">SMS</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="title">Template Name</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Enter template name"
          required
        />
      </div>

      {formData.notificationType === "Email" && (
        <div>
          <Label htmlFor="subject">Subject (Optional)</Label>
          <Input
            id="subject"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            placeholder="Enter email subject"
          />
        </div>
      )}

      <div>
        <Label htmlFor="token">Token</Label>
        <Input
          id="token"
          value={formData.token}
          onChange={(e) => handleInputChange('token', e.target.value)}
          placeholder="Enter token (e.g., {{user_name}}, {{reset_code}})"
        />
      </div>

      <div>
        <Label htmlFor="body">Body</Label>
        <Textarea
          id="body"
          value={formData.body}
          onChange={(e) => handleInputChange('body', e.target.value)}
          placeholder="Enter template body content"
          className="min-h-32"
          required
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-brand-purple hover:bg-brand-purple-dark">
          Save Template
        </Button>
      </div>
    </form>
  );
};

export default EmailSmsTemplateForm;
