
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardFilters from "@/components/dashboard/DashboardFilters";
import MetricsCards from "@/components/dashboard/MetricsCards";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import RevenueEntryForm from "@/components/RevenueEntryForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const PortfolioDashboard = () => {
  const [selectedHotel, setSelectedHotel] = useState("all");
  const [showRevenuePanel, setShowRevenuePanel] = useState(false);
  const today = new Date();
  const [dateRange, setDateRange] = useState({
    from: today,
    to: today
  });

  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    setDateRange(range);
    console.log("Date range changed:", range);
  };

  const handleHotelChange = (hotelId: string) => {
    setSelectedHotel(hotelId);
    console.log("Hotel changed:", hotelId);
  };

  const handleAddRevenue = () => {
    setShowRevenuePanel(true);
  };

  const handleCloseRevenuePanel = () => {
    setShowRevenuePanel(false);
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
          <div className="flex gap-2">
            <Button onClick={handleAddRevenue} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Daily Revenue
            </Button>
          </div>
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

        {/* Add Revenue Panel */}
        <Sheet open={showRevenuePanel} onOpenChange={setShowRevenuePanel}>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Add Daily Revenue</SheetTitle>
              <SheetDescription>
                Submit daily revenue data for your portfolio hotels
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <RevenueEntryForm 
                entry={null}
                onClose={handleCloseRevenuePanel}
                showHotelSelector={true}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
};

export default PortfolioDashboard;
