import { 
  Building2, 
  Users, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
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
  <Card className="bg-white border border-gray-100 hover:shadow-md transition-all duration-200 shadow-sm">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-700 font-system">{title}</CardTitle>
      <div className="p-2 rounded-lg bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white">
        {icon}
      </div>
    </CardHeader>
    <CardContent className="p-0">
      <div className="text-3xl font-bold text-gray-900 font-system">{value}</div>
      <div className="flex items-center space-x-1 mt-1">
        {trend && (
          <span className={`text-xs font-medium ${trend.positive ? 'text-green-600' : 'text-red-500'}`}>
            {trend.value}
          </span>
        )}
        <p className="text-xs text-gray-600">{description}</p>
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 font-system">Dashboard</h1>
          <p className="text-gray-600 mt-2 font-system">Welcome back! Here's what's happening with your hotels today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            icon={<Building2 className="h-5 w-5" />} 
            title="Total Hotels"
            value="67"
            description="Total registered hotels"
            trend={{ value: "+5.2%", positive: true }}
          />
          <StatCard 
            icon={<Users className="h-5 w-5" />} 
            title="Active Investors"
            value="243"
            description="Across all hotels"
            trend={{ value: "+12.5%", positive: true }}
          />
          <StatCard 
            icon={<DollarSign className="h-5 w-5" />} 
            title="Monthly Revenue"
            value="$8,942"
            description="From subscriptions"
            trend={{ value: "+4.3%", positive: true }}
          />
          <StatCard 
            icon={<Calendar className="h-5 w-5" />} 
            title="Revenue Entries"
            value="1,289"
            description="Last 30 days"
            trend={{ value: "+18.7%", positive: true }}
          />
        </div>

        {/* Recent Activity Table */}
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 font-system">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 font-system">Timestamp</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 font-system">User</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 font-system">Action</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 font-system">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm text-blue-600 font-system">2024-01-20 14:35:00</td>
                    <td className="py-4 px-6 text-sm text-gray-900 font-system">John Doe</td>
                    <td className="py-4 px-6 text-sm font-system">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                        HOTEL CREATE
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-blue-600 font-system">Created new hotel: Grand Plaza</td>
                  </tr>
                  <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm text-blue-600 font-system">2024-01-19 11:22:00</td>
                    <td className="py-4 px-6 text-sm text-gray-900 font-system">Alice Smith</td>
                    <td className="py-4 px-6 text-sm font-system">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                        INVESTOR UPDATE
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-blue-600 font-system">Updated investor portfolio</td>
                  </tr>
                  <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm text-blue-600 font-system">2024-01-18 09:15:00</td>
                    <td className="py-4 px-6 text-sm text-gray-900 font-system">John Doe</td>
                    <td className="py-4 px-6 text-sm font-system">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-medium">
                        USER CREATE
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-blue-600 font-system">Created new user: Bob Johnson</td>
                  </tr>
                  <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm text-blue-600 font-system">2024-01-17 16:40:00</td>
                    <td className="py-4 px-6 text-sm text-gray-900 font-system">Alice Smith</td>
                    <td className="py-4 px-6 text-sm font-system">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
                        REVENUE CREATE
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-blue-600 font-system">Created revenue entry</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm text-blue-600 font-system">2024-01-16 10:30:00</td>
                    <td className="py-4 px-6 text-sm text-gray-900 font-system">John Doe</td>
                    <td className="py-4 px-6 text-sm font-system">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
                        HOTEL DELETE
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-blue-600 font-system">Deleted outdated hotel records</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-gray-900 font-system">Hotel Signups</CardTitle>
                  <CardDescription className="text-gray-600 font-system">New hotels registered in the last 30 days</CardDescription>
                </div>
                <Select defaultValue="30">
                  <SelectTrigger className="w-full sm:w-[120px] bg-white border-gray-200">
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
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="day" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                      }}
                    />
                    <Bar dataKey="count" fill="url(#gradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#667eea" />
                        <stop offset="100%" stopColor="#764ba2" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
              <Button variant="ghost" className="text-sm text-gray-600 hover:bg-gray-50 font-system">
                View all data
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-50">
                <Download size={16} />
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-gray-900 font-system">Subscription Revenue</CardTitle>
                  <CardDescription className="text-gray-600 font-system">Monthly revenue from subscriptions</CardDescription>
                </div>
                <Select defaultValue="6">
                  <SelectTrigger className="w-full sm:w-[120px] bg-white border-gray-200">
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
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis 
                      stroke="#6b7280"
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                      }}
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#667eea" 
                      strokeWidth={3} 
                      dot={{ fill: '#667eea', strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 7, fill: '#764ba2' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
