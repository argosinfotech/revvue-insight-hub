
import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import EmailTemplateForm from "./EmailTemplateForm";

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

const EmailTemplates = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: "1",
      type: "Admin",
      title: "Welcome Email",
      subject: "Welcome to RevVue",
      bccEmail: "admin@revvue.com",
      body: "<p>Welcome to our platform!</p>",
      tokens: "{{user_name}}\n{{email}}\n{{company_name}}",
      createdDate: "2024-01-15"
    },
    {
      id: "2",
      type: "Users",
      title: "Password Reset",
      subject: "Reset Your Password",
      bccEmail: "support@revvue.com",
      body: "<p>Click the link to reset your password.</p>",
      tokens: "{{reset_link}}\n{{user_name}}\n{{expiry_time}}",
      createdDate: "2024-01-10"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);

  const handleAddTemplate = () => {
    setEditingTemplate(null);
    setIsDialogOpen(true);
  };

  const handleEditTemplate = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setIsDialogOpen(true);
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(template => template.id !== id));
    toast.success("Template deleted successfully!");
  };

  const handleSaveTemplate = (templateData: Omit<EmailTemplate, 'id' | 'createdDate'>) => {
    if (editingTemplate) {
      // Update existing template
      setTemplates(templates.map(template => 
        template.id === editingTemplate.id 
          ? { ...template, ...templateData }
          : template
      ));
      toast.success("Template updated successfully!");
    } else {
      // Add new template
      const newTemplate: EmailTemplate = {
        id: Date.now().toString(),
        ...templateData,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setTemplates([...templates, newTemplate]);
      toast.success("Template created successfully!");
    }
    setIsDialogOpen(false);
    setEditingTemplate(null);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Email Templates</CardTitle>
            <CardDescription>
              Manage email templates for different notification types
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddTemplate} className="bg-brand-purple hover:bg-brand-purple-dark">
                <Plus className="h-4 w-4 mr-2" />
                Add New Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingTemplate ? "Edit Email Template" : "Add New Email Template"}
                </DialogTitle>
                <DialogDescription>
                  {editingTemplate ? "Update the email template details below." : "Create a new email template for notifications."}
                </DialogDescription>
              </DialogHeader>
              <EmailTemplateForm
                template={editingTemplate}
                onSave={handleSaveTemplate}
                onCancel={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Subject Line</TableHead>
                <TableHead>BCC Email ID</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      template.type === 'Admin' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {template.type}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{template.title}</TableCell>
                  <TableCell>{template.subject}</TableCell>
                  <TableCell>{template.bccEmail}</TableCell>
                  <TableCell>{new Date(template.createdDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditTemplate(template)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailTemplates;
