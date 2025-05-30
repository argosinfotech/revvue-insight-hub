
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, DollarSign, TrendingUp, Plus, CheckCircle, Clock, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const StaffDashboard = () => {
  const navigate = useNavigate();

  // Mock data - in real app this would come from API
  const hotelInfo = {
    name: "Grand Luxury Hotel",
    todaySubmissionStatus: "pending", // "pending" or "completed"
  };

  const last7DaysEntries = [
    { date: new Date(2024, 11, 15), revenue: 12450, submitted: true },
    { date: new Date(2024, 11, 14), revenue: 9800, submitted: true },
    { date: new Date(2024, 11, 13), revenue: 11200, submitted: false },
    { date: new Date(2024, 11, 12), revenue: 10500, submitted: true },
    { date: new Date(2024, 11, 11), revenue: 13200, submitted: true },
    { date: new Date(2024, 11, 10), revenue: 8900, submitted: true },
    { date: new Date(2024, 11, 9), revenue: 9600, submitted: true },
  ];

  const todaysDate = new Date();

  const handleAddRevenue = () => {
    navigate('/my-entries');
  };

  const getHeatmapColor = (entry: typeof last7DaysEntries[0]) => {
    if (!entry.submitted) {
      return "bg-red-100 border-red-200 text-red-600";
    }
    
    // Color code based on revenue level
    if (entry.revenue >= 13000) {
      return "bg-green-100 border-green-200 text-green-700";
    } else if (entry.revenue >= 10000) {
      return "bg-blue-100 border-blue-200 text-blue-700";
    } else {
      return "bg-yellow-100 border-yellow-200 text-yellow-700";
    }
  };

  const getStatusIcon = (submitted: boolean) => {
    return submitted ? CheckCircle : XCircle;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Hotel Staff Dashboard</h1>
        <Button onClick={handleAddRevenue} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Today's Revenue
        </Button>
      </div>

      {/* Quick Stats - Moved to top */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-muted-foreground">
              +8% from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              +2% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookings Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              +4 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$185</div>
            <p className="text-xs text-muted-foreground">
              +$12 from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Hotel Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>Hotel Information</CardTitle>
          <CardDescription>
            Current hotel details and submission status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Hotel Name</p>
              <p className="text-lg font-semibold">{hotelInfo.name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Today's Date</p>
              <p className="text-lg font-semibold">{format(todaysDate, "MMM dd, yyyy")}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Today's Submission Status</p>
              <div className="flex items-center gap-2">
                {hotelInfo.todaySubmissionStatus === "pending" ? (
                  <>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Pending
                    </Badge>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={handleAddRevenue}>
                      Add Now
                    </Button>
                  </>
                ) : (
                  <Badge variant="default" className="flex items-center gap-1 bg-green-600">
                    <CheckCircle className="h-3 w-3" />
                    Updated
                  </Badge>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Last 7 Days Summary</p>
              <p className="text-lg font-semibold">
                {last7DaysEntries.filter(entry => entry.submitted).length}/7 Submitted
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Last 7 Days Entry Summary - Heatmap View */}
      <Card>
        <CardHeader>
          <CardTitle>Last 7 Days Entry Summary</CardTitle>
          <CardDescription>
            Color-coded heatmap view of recent revenue entries and submission status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-3">
            {last7DaysEntries.map((entry, index) => {
              const StatusIcon = getStatusIcon(entry.submitted);
              return (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border-2 text-center space-y-2 transition-all hover:scale-105 ${getHeatmapColor(entry)}`}
                >
                  <div className="flex justify-center">
                    <StatusIcon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium">
                      {format(entry.date, "MMM dd")}
                    </p>
                    <p className="text-xs font-semibold">
                      ${entry.revenue.toLocaleString()}
                    </p>
                    <p className="text-xs">
                      {entry.submitted ? "Submitted" : "Missing"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="mt-6 pt-4 border-t">
            <p className="text-sm font-medium text-muted-foreground mb-3">Legend:</p>
            <div className="flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
                <span>High Revenue (≥$13k)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
                <span>Good Revenue ($10k-$12.9k)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
                <span>Low Revenue (<$10k)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
                <span>Not Submitted</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities - Updated content */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>
            Your recent hotel management activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Reminder from Manager to enter daily report</p>
                <p className="text-xs text-muted-foreground">5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Missed entry for December 13th</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Revenue report updated for December 14th</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Daily report submitted successfully</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffDashboard;
