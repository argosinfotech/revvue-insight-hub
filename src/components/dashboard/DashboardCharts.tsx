
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

  // Get current date and calculate past 4 weeks
  const today = new Date();
  const getWeekRange = (weeksAgo: number) => {
    const endDate = new Date(today);
    endDate.setDate(today.getDate() - (weeksAgo * 7));
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 6);
    
    const formatDate = (date: Date) => {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    };
    
    return `${formatDate(startDate)}-${formatDate(endDate)}`;
  };

  // Custom tick component for X-axis with date ranges
  const CustomXAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const weekData = weeklyBookingsData.find(item => item.week === payload.value);
    
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" fontSize="12">
          {payload.value}
        </text>
        <text x={0} y={0} dy={32} textAnchor="middle" fill="#999" fontSize="10">
          {weekData?.dateRange}
        </text>
      </g>
    );
  };

  // Mock data for bookings percentage per week with actual date ranges
  const weeklyBookingsData = [
    { 
      week: "Week 1", 
      dateRange: getWeekRange(0),
      percentage: selectedHotel === "all" ? 85 : 88 
    },
    { 
      week: "Week 2", 
      dateRange: getWeekRange(1),
      percentage: selectedHotel === "all" ? 92 : 95 
    },
    { 
      week: "Week 3", 
      dateRange: getWeekRange(2),
      percentage: selectedHotel === "all" ? 78 : 82 
    },
    { 
      week: "Week 4", 
      dateRange: getWeekRange(3),
      percentage: selectedHotel === "all" ? 96 : 98 
    }
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
            Booking percentage per week for the past 4 weeks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyBookingsData} margin={{ bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="week"
                  tick={<CustomXAxisTick />}
                  height={60}
                />
                <YAxis 
                  tickFormatter={(value) => `${value}%`}
                  domain={[0, 100]}
                />
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${value}%`, 
                    'Booking Percentage'
                  ]}
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      return `${payload[0].payload.week} (${payload[0].payload.dateRange})`;
                    }
                    return label;
                  }}
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
