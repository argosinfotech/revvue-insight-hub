
import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "sonner";
import EmailSmsTemplateForm from "./EmailSmsTemplateForm";

interface EmailSmsTemplate {
  id: string;
  notificationType: "Email" | "SMS";
  title: string;
  subject?: string;
  body: string;
  createdDate: string;
}

const EmailSmsTemplates = () => {
  const [templates, setTemplates] = useState<EmailSmsTemplate[]>([
    {
      id: "1",
      notificationType: "Email",
      title: "Welcome Email",
      subject: "Welcome to RevVue",
      body: "<p>Welcome to our platform!</p>",
      createdDate: "2024-01-15"
    },
    {
      id: "2",
      notificationType: "SMS",
      title: "Password Reset SMS",
      body: "Your password reset code is: {{reset_code}}",
      createdDate: "2024-01-10"
    }
  ]);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailSmsTemplate | null>(null);

  const handleAddTemplate = () => {
    setEditingTemplate(null);
    setIsSheetOpen(true);
  };

  const handleEditTemplate = (template: EmailSmsTemplate) => {
    setEditingTemplate(template);
    setIsSheetOpen(true);
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(template => template.id !== id));
    toast.success("Template deleted successfully!");
  };

  const handleSaveTemplate = (templateData: Omit<EmailSmsTemplate, 'id' | 'createdDate'>) => {
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
      const newTemplate: EmailSmsTemplate = {
        id: Date.now().toString(),
        ...templateData,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setTemplates([...templates, newTemplate]);
      toast.success("Template created successfully!");
    }
    setIsSheetOpen(false);
    setEditingTemplate(null);
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    setEditingTemplate(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Email/SMS Templates</CardTitle>
              <CardDescription>
                Manage email and SMS templates for different notification types
              </CardDescription>
            </div>
            <Button onClick={handleAddTemplate} className="bg-brand-purple hover:bg-brand-purple-dark">
              <Plus className="h-4 w-4 mr-2" />
              Add New Template
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Notification Type</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Subject Line</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        template.notificationType === 'Email' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {template.notificationType}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">{template.title}</TableCell>
                    <TableCell>{template.subject || "N/A"}</TableCell>
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

      {/* Add/Edit Email/SMS Template Panel */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {editingTemplate ? "Edit Email/SMS Template" : "Add New Email/SMS Template"}
            </SheetTitle>
            <SheetDescription>
              {editingTemplate ? "Update the template details below." : "Create a new email or SMS template for notifications."}
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6">
            <EmailSmsTemplateForm
              template={editingTemplate}
              onSave={handleSaveTemplate}
              onCancel={handleCancel}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EmailSmsTemplates;
