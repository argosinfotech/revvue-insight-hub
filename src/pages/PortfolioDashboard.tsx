
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardFilters from "@/components/dashboard/DashboardFilters";
import MetricsCards from "@/components/dashboard/MetricsCards";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import QuickActions from "@/components/dashboard/QuickActions";

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

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header with Quick Actions */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Portfolio Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive overview of your hotel portfolio performance
            </p>
          </div>
          <QuickActions />
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
