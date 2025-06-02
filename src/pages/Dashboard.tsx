
import { 
  Building2, 
  Users, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  ArrowRight, 
  FileText, 
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/DashboardLayout";

const hotelSignups = [
  { day: "1", count: 4 },
  { day: "5", count: 2 },
  { day: "10", count: 7 },
  { day: "15", count: 3 },
  { day: "20", count: 6 },
  { day: "25", count: 4 },
  { day: "30", count: 8 },
];

const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 19000 },
  { month: "Mar", revenue: 15000 },
  { month: "Apr", revenue: 21000 },
  { month: "May", revenue: 25000 },
  { month: "Jun", revenue: 18000 },
];

const StatCard = ({ icon, title, value, description, trend }: { 
  icon: React.ReactNode, 
  title: string, 
  value: string, 
  description: string,
  trend?: { value: string, positive: boolean } 
}) => (
  <Card className="stat-card">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent className="p-0">
      <div className="text-3xl font-bold">{value}</div>
      <div className="flex items-center space-x-1 mt-1">
        {trend && (
          <span className={`text-xs ${trend.positive ? 'text-green-500' : 'text-red-500'}`}>
            {trend.value}
          </span>
        )}
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 w-full">
        {/* Header removed since it's now in the Header component */}

        {/* Stats Cards - 4 column layout like the reference */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
          <StatCard 
            icon={<Building2 className="h-5 w-5 text-muted-foreground" />} 
            title="Total Hotels"
            value="67"
            description="Total registered hotels"
            trend={{ value: "+5.2%", positive: true }}
          />
          <StatCard 
            icon={<Users className="h-5 w-5 text-muted-foreground" />} 
            title="Active Investors"
            value="243"
            description="Across all hotels"
            trend={{ value: "+12.5%", positive: true }}
          />
          <StatCard 
            icon={<DollarSign className="h-5 w-5 text-muted-foreground" />} 
            title="Monthly Revenue"
            value="$8,942"
            description="From subscriptions"
            trend={{ value: "+4.3%", positive: true }}
          />
          <StatCard 
            icon={<Calendar className="h-5 w-5 text-muted-foreground" />} 
            title="Revenue Entries"
            value="1,289"
            description="Last 30 days"
            trend={{ value: "+18.7%", positive: true }}
          />
        </div>

        {/* Recent Activity Table */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Timestamp</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Action</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 text-sm text-blue-600">2024-01-20 14:35:00</td>
                    <td className="py-3 px-4 text-sm">John Doe</td>
                    <td className="py-3 px-4 text-sm">
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        HOTEL CREATE
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-blue-600">Created new hotel: Grand Plaza</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 text-sm text-blue-600">2024-01-19 11:22:00</td>
                    <td className="py-3 px-4 text-sm">Alice Smith</td>
                    <td className="py-3 px-4 text-sm">
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        INVESTOR UPDATE
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-blue-600">Updated investor portfolio</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 text-sm text-blue-600">2024-01-18 09:15:00</td>
                    <td className="py-3 px-4 text-sm">John Doe</td>
                    <td className="py-3 px-4 text-sm">USER CREATE</td>
                    <td className="py-3 px-4 text-sm text-blue-600">Created new user: Bob Johnson</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 text-sm text-blue-600">2024-01-17 16:40:00</td>
                    <td className="py-3 px-4 text-sm">Alice Smith</td>
                    <td className="py-3 px-4 text-sm">REVENUE CREATE</td>
                    <td className="py-3 px-4 text-sm text-blue-600">Created revenue entry</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm text-blue-600">2024-01-16 10:30:00</td>
                    <td className="py-3 px-4 text-sm">John Doe</td>
                    <td className="py-3 px-4 text-sm">
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        HOTEL DELETE
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-blue-600">Deleted outdated hotel records</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <div className="grid gap-6 grid-cols-1 xl:grid-cols-2 w-full">
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Hotel Signups</CardTitle>
                  <CardDescription>New hotels registered in the last 30 days</CardDescription>
                </div>
                <Select defaultValue="30">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last quarter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={hotelSignups}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" className="text-sm text-muted-foreground">
                View all data
              </Button>
              <Button variant="ghost" size="icon">
                <Download size={16} />
              </Button>
            </CardFooter>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Subscription Revenue</CardTitle>
                  <CardDescription>Monthly revenue from subscriptions</CardDescription>
                </div>
                <Select defaultValue="6">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">Last 3 months</SelectItem>
                    <SelectItem value="6">Last 6 months</SelectItem>
                    <SelectItem value="12">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={revenueData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
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
            <CardFooter className="flex justify-between">
              <Button variant="ghost" className="text-sm text-muted-foreground">
                View all data
              </Button>
              <Button variant="ghost" size="icon">
                <Download size={16} />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
