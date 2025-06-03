
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface EmailTemplate {
  id: string;
  type: "Admin" | "Users";
  title: string;
  subject: string;
  bccEmail: string;
  body: string;
  tokens: string;
  createdDate: string;
}

interface EmailTemplateFormProps {
  template?: EmailTemplate | null;
  onSave: (data: Omit<EmailTemplate, 'id' | 'createdDate'>) => void;
  onCancel: () => void;
}

const EmailTemplateForm = ({ template, onSave, onCancel }: EmailTemplateFormProps) => {
  const [formData, setFormData] = useState({
    type: "Admin" as "Admin" | "Users",
    title: "",
    subject: "",
    bccEmail: "",
    body: "",
    tokens: ""
  });

  useEffect(() => {
    if (template) {
      setFormData({
        type: template.type,
        title: template.title,
        subject: template.subject,
        bccEmail: template.bccEmail,
        body: template.body,
        tokens: template.tokens
      });
    } else {
      setFormData({
        type: "Admin",
        title: "",
        subject: "",
        bccEmail: "",
        body: "",
        tokens: ""
      });
    }
  }, [template]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="type">Notification Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value: "Admin" | "Users") => handleInputChange('type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select notification type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Users">Users</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Enter template title"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          value={formData.subject}
          onChange={(e) => handleInputChange('subject', e.target.value)}
          placeholder="Enter email subject"
          required
        />
      </div>

      <div>
        <Label htmlFor="bccEmail">BCC Email ID</Label>
        <Input
          id="bccEmail"
          type="email"
          value={formData.bccEmail}
          onChange={(e) => handleInputChange('bccEmail', e.target.value)}
          placeholder="Enter BCC email address"
          required
        />
      </div>

      <div>
        <Label htmlFor="body">Body</Label>
        <Textarea
          id="body"
          value={formData.body}
          onChange={(e) => handleInputChange('body', e.target.value)}
          placeholder="Enter email body content (HTML supported)"
          className="min-h-32"
          required
        />
        <p className="text-xs text-muted-foreground mt-1">
          You can use HTML tags for formatting
        </p>
      </div>

      <div>
        <Label htmlFor="tokens">Tokens</Label>
        <Textarea
          id="tokens"
          value={formData.tokens}
          onChange={(e) => handleInputChange('tokens', e.target.value)}
          placeholder="Enter available tokens (one per line)&#10;{{user_name}}&#10;{{email}}&#10;{{company_name}}"
          className="min-h-24"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Enter available tokens for this template, one per line. Use double curly braces format: {`{{token_name}}`}
        </p>
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

export default EmailTemplateForm;
