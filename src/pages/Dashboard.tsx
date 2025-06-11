import { 
  Building2, 
  Users, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Download,
  UserPlus,
  UserCog,
  Bell,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useState } from "react";

const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 19000 },
  { month: "Mar", revenue: 15000 },
  { month: "Apr", revenue: 21000 },
  { month: "May", revenue: 25000 },
  { month: "Jun", revenue: 18000 },
];

const StatCard = ({ icon, title, value, description }: { 
  icon: React.ReactNode, 
  title: string, 
  value: string, 
  description: string
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
      <p className="text-xs text-gray-600 mt-1">{description}</p>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Mock data for tickets - in real app this would come from API
  const pendingTickets = 5;
  
  const mockReportedIssues = [
    { id: 1, title: "AC not working in Room 205", priority: "High", hotel: "Grand Plaza Hotel", reporter: "John Manager", date: "2024-06-10" },
    { id: 2, title: "WiFi connectivity issues", priority: "Medium", hotel: "Ocean View Resort", reporter: "Sarah Wilson", date: "2024-06-09" },
    { id: 3, title: "Elevator maintenance needed", priority: "High", hotel: "City Center Inn", reporter: "Mike Johnson", date: "2024-06-08" },
    { id: 4, title: "Pool cleaning equipment broken", priority: "Low", hotel: "Seaside Hotel", reporter: "Emma Davis", date: "2024-06-07" },
    { id: 5, title: "Kitchen ventilation system fault", priority: "High", hotel: "Downtown Suites", reporter: "David Chen", date: "2024-06-06" }
  ];

  const handleViewTickets = () => {
    setIsDialogOpen(true);
  };

  const handleViewAllIssues = () => {
    toast.info("Navigating to full issues management page");
    setIsDialogOpen(false);
    // In real app, this would navigate to the full issues page
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "secondary";
      case "Low": return "outline";
      default: return "outline";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-system">Dashboard</h1>
              <p className="text-gray-600 mt-2 font-system">Welcome back! Here's what's happening with your hotels today.</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  onClick={handleViewTickets}
                  className="relative"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Reported Issues
                  {pendingTickets > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {pendingTickets}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl h-[600px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Reported Issues Summary
                  </DialogTitle>
                  <DialogDescription>
                    Quick overview of recent issues reported by Portfolio Managers
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 h-full flex flex-col">
                  {/* Summary Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-red-600">3</div>
                        <div className="text-sm text-gray-600">High Priority</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-yellow-600">1</div>
                        <div className="text-sm text-gray-600">Medium Priority</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600">1</div>
                        <div className="text-sm text-gray-600">Low Priority</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Issues List */}
                  <Card className="flex-1 flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Issues</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Issue</TableHead>
                            <TableHead>Hotel</TableHead>
                            <TableHead>Reporter</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>
                              <Button onClick={handleViewAllIssues} variant="ghost" size="sm">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View All Issues
                              </Button>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockReportedIssues.map((issue) => (
                            <TableRow key={issue.id}>
                              <TableCell className="font-medium">{issue.title}</TableCell>
                              <TableCell>{issue.hotel}</TableCell>
                              <TableCell>{issue.reporter}</TableCell>
                              <TableCell>
                                <Badge variant={getPriorityColor(issue.priority) as any}>
                                  {issue.priority}
                                </Badge>
                              </TableCell>
                              <TableCell>{issue.date}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard 
            icon={<UserPlus className="h-5 w-5" />} 
            title="New Signup"
            value="23"
            description="in Past 30 Days"
          />
          <StatCard 
            icon={<UserCog className="h-5 w-5" />} 
            title="Total Portfolio Managers"
            value="156"
            description="Active portfolio managers"
          />
          <StatCard 
            icon={<Users className="h-5 w-5" />} 
            title="Total Investors"
            value="243"
            description="Across all hotels"
          />
        </div>

        {/* Revenue Chart Section */}
        <div className="grid gap-6 grid-cols-1">
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
