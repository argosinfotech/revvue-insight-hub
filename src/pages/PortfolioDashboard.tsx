
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardFilters from "@/components/dashboard/DashboardFilters";
import MetricsCards from "@/components/dashboard/MetricsCards";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { toast } from "sonner";

const PortfolioDashboard = () => {
  const [selectedHotel, setSelectedHotel] = useState("all");
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date()
  });

  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    setDateRange(range);
    console.log("Date range changed:", range);
  };

  const handleHotelChange = (hotelId: string) => {
    setSelectedHotel(hotelId);
    console.log("Hotel changed:", hotelId);
  };

  const handleExportToExcel = () => {
    // Mock export functionality - in real app this would call an API
    console.log("Exporting data to Excel...", {
      selectedHotel,
      dateRange,
      timestamp: new Date().toISOString()
    });
    
    // Simulate export process
    toast.success("Portfolio data exported to Excel successfully!");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Portfolio Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive overview of your hotel portfolio performance
            </p>
          </div>
          <Button onClick={handleExportToExcel} className="bg-green-600 hover:bg-green-700">
            <FileDown className="h-4 w-4 mr-2" />
            Export to Excel
          </Button>
        </div>

        {/* Filters */}
        <DashboardFilters
          onDateRangeChange={handleDateRangeChange}
          onHotelChange={handleHotelChange}
          selectedHotel={selectedHotel}
        />

        {/* Metrics Cards */}
        <MetricsCards selectedHotel={selectedHotel} />

        {/* Charts */}
        <DashboardCharts selectedHotel={selectedHotel} />
      </div>
    </DashboardLayout>
  );
};

export default PortfolioDashboard;
