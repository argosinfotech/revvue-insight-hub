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
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center space-x-1">
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
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome to RevVue Insight Hub admin dashboard
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-1">
              <FileText size={16} />
              Reports
            </Button>
            <Button className="gap-1 bg-brand-purple hover:bg-brand-purple-dark">
              <Download size={16} />
              Export Data
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            icon={<Building2 className="h-4 w-4 text-muted-foreground" />} 
            title="Total Hotels"
            value="67"
            description="Total registered hotels"
            trend={{ value: "+5.2%", positive: true }}
          />
          <StatCard 
            icon={<Users className="h-4 w-4 text-muted-foreground" />} 
            title="Active Investors"
            value="243"
            description="Across all hotels"
            trend={{ value: "+12.5%", positive: true }}
          />
          <StatCard 
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} 
            title="Monthly Revenue"
            value="$8,942"
            description="From subscriptions"
            trend={{ value: "+4.3%", positive: true }}
          />
          <StatCard 
            icon={<Calendar className="h-4 w-4 text-muted-foreground" />} 
            title="Revenue Entries"
            value="1,289"
            description="Last 30 days"
            trend={{ value: "+18.7%", positive: true }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
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
              <div className="h-80">
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

          <Card>
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
              <div className="h-80">
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

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Hotels</CardTitle>
              <CardDescription>Newly registered hotels in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-brand-purple-light flex items-center justify-center">
                        <Building2 size={20} className="text-brand-purple" />
                      </div>
                      <div>
                        <p className="font-medium">Grand Hotel {i}</p>
                        <p className="text-sm text-muted-foreground">Added 2 days ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Hotels</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Investors</CardTitle>
              <CardDescription>Newly added investors in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-brand-purple-light flex items-center justify-center">
                        <Users size={20} className="text-brand-purple" />
                      </div>
                      <div>
                        <p className="font-medium">Investor {i}</p>
                        <p className="text-sm text-muted-foreground">Joined 3 days ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Investors</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
