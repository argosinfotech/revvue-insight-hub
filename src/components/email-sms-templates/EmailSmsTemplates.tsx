
import { useState } from "react";
import { Edit } from "lucide-react";
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

  const handleEditTemplate = (template: EmailSmsTemplate) => {
    setEditingTemplate(template);
    setIsSheetOpen(true);
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditTemplate(template)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Email/SMS Template Panel */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              Edit Email/SMS Template
            </SheetTitle>
            <SheetDescription>
              Update the template details below.
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
