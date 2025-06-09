
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

interface DashboardChartsProps {
  selectedHotel: string;
}

const DashboardCharts = ({ selectedHotel }: DashboardChartsProps) => {
  // Mock data for month by month revenue
  const monthlyRevenueData = [
    { month: "Jan", revenue: selectedHotel === "all" ? 98000 : 38000 },
    { month: "Feb", revenue: selectedHotel === "all" ? 105000 : 42000 },
    { month: "Mar", revenue: selectedHotel === "all" ? 112000 : 45000 },
    { month: "Apr", revenue: selectedHotel === "all" ? 118000 : 46000 },
    { month: "May", revenue: selectedHotel === "all" ? 124500 : 48000 },
    { month: "Jun", revenue: selectedHotel === "all" ? 130000 : 50000 }
  ];

  // Mock data for bookings percentage per week - reduced to 4 weeks
  const weeklyBookingsData = [
    { week: "Week 1", percentage: selectedHotel === "all" ? 85 : 88 },
    { week: "Week 2", percentage: selectedHotel === "all" ? 92 : 95 },
    { week: "Week 3", percentage: selectedHotel === "all" ? 78 : 82 },
    { week: "Week 4", percentage: selectedHotel === "all" ? 96 : 98 }
  ];

  return (
    <div className="grid gap-6 grid-cols-1 xl:grid-cols-2 w-full">
      {/* Monthly Revenue Chart */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Monthly Revenue</CardTitle>
          <CardDescription>
            Revenue trend over the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#9b87f5" 
                  strokeWidth={3} 
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Bookings Percentage Chart */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Weekly Booking Percentage</CardTitle>
          <CardDescription>
            Booking percentage per week for the current month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyBookingsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" />
                <YAxis 
                  tickFormatter={(value) => `${value}%`}
                  domain={[0, 100]}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Booking Percentage']}
                />
                <Bar dataKey="percentage" fill="#9b87f5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;
