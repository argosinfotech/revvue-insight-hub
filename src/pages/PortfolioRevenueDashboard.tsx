
import { useState } from "react";
import { TrendingUp, DollarSign, Calendar, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/DashboardLayout";

const PortfolioRevenueDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Mock data for demonstration
  const revenueData = {
    totalRevenue: 124500,
    monthlyGrowth: 8.2,
    averageOccupancy: 78,
    totalBookings: 342
  };

  const hotels = [
    { id: 1, name: "Grand Plaza Hotel", revenue: 45600, occupancy: 82, bookings: 156 },
    { id: 2, name: "Sunset Resort", revenue: 38900, occupancy: 75, bookings: 98 },
    { id: 3, name: "City Center Inn", revenue: 40000, occupancy: 77, bookings: 88 }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Revenue Analytics</h1>
            <p className="text-muted-foreground">Track your hotel portfolio performance</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-brand-purple hover:bg-brand-purple-dark">
              <Calendar className="h-4 w-4 mr-2" />
              Custom Period
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${revenueData.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{revenueData.monthlyGrowth}% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Occupancy</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{revenueData.averageOccupancy}%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{revenueData.totalBookings}</div>
              <p className="text-xs text-muted-foreground">
                +12 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Revenue per Hotel</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${Math.round(revenueData.totalRevenue / hotels.length).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Per property this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Hotel Performance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Hotel Performance</CardTitle>
            <CardDescription>
              Individual hotel metrics for the selected period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{hotel.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {hotel.bookings} bookings • {hotel.occupancy}% occupancy
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">${hotel.revenue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Charts Placeholder */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue over time</CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                <p>Revenue chart will be implemented here</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Occupancy Rate</CardTitle>
              <CardDescription>Occupancy percentage by hotel</CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                <p>Occupancy chart will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PortfolioRevenueDashboard;
