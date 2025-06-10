import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardFilters from "@/components/dashboard/DashboardFilters";
import MetricsCards from "@/components/dashboard/MetricsCards";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import RevenueEntryForm from "@/components/RevenueEntryForm";
import { Button } from "@/components/ui/button";
import { Plus, Bell } from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const PortfolioDashboard = () => {
  const [selectedHotel, setSelectedHotel] = useState("all");
  const [showRevenuePanel, setShowRevenuePanel] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const today = new Date();
  const [dateRange, setDateRange] = useState({
    from: today,
    to: today
  });

  // Mock data for missing revenue entries
  const missingRevenueEntries = [
    { hotelName: "Grand Plaza Hotel", date: "2024-12-14", daysOverdue: 1 },
    { hotelName: "Sunset Resort", date: "2024-12-13", daysOverdue: 2 },
  ];

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

  const handleNotificationClick = () => {
    setShowNotifications(true);
    if (missingRevenueEntries.length > 0) {
      toast.error(`${missingRevenueEntries.length} hotels have missing revenue entries`);
    } else {
      toast.success("All revenue entries are up to date");
    }
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
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
            <Button 
              variant="outline" 
              onClick={handleNotificationClick}
              className="relative"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              {missingRevenueEntries.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {missingRevenueEntries.length}
                </span>
              )}
            </Button>
            <Button onClick={handleAddRevenue} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Daily Revenue
            </Button>
          </div>
        </div>

        {/* Notifications Alert */}
        {showNotifications && missingRevenueEntries.length > 0 && (
          <Alert className="border-red-200 bg-red-50">
            <Bell className="h-4 w-4" />
            <AlertTitle className="text-red-800">Missing Revenue Entries</AlertTitle>
            <AlertDescription className="text-red-700">
              <div className="mt-2 space-y-2">
                {missingRevenueEntries.map((entry, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{entry.hotelName} - {entry.date}</span>
                    <span className="text-sm font-medium">
                      {entry.daysOverdue} day{entry.daysOverdue > 1 ? 's' : ''} overdue
                    </span>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3"
                onClick={handleCloseNotifications}
              >
                Dismiss
              </Button>
            </AlertDescription>
          </Alert>
        )}

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
