
import { Plus, Users, Download, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const QuickActions = () => {
  const navigate = useNavigate();

  const handleAddHotel = () => {
    navigate("/portfolio-hotels");
    toast.success("Redirecting to add new hotel");
  };

  const handleAddInvestor = () => {
    navigate("/portfolio-investors");
    toast.success("Redirecting to add new investor");
  };

  const handleExportReport = () => {
    // Mock export functionality
    toast.success("Report exported successfully to Excel");
  };

  const actions = [
    {
      title: "Add New Hotel",
      description: "Register a new property",
      icon: Building2,
      action: handleAddHotel,
      variant: "default" as const
    },
    {
      title: "Add Investor",
      description: "Add new investor to portfolio",
      icon: Users,
      action: handleAddInvestor,
      variant: "outline" as const
    },
    {
      title: "Export Report",
      description: "Download Excel report",
      icon: Download,
      action: handleExportReport,
      variant: "outline" as const
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Frequently used actions for portfolio management
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              onClick={action.action}
              className="flex items-center gap-2"
            >
              <action.icon className="h-4 w-4" />
              {action.title}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
