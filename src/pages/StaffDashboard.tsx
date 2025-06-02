
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react";

const StaffDashboard = () => {
  const [recentEntries] = useState([
    {
      id: 1,
      type: "Revenue",
      date: "2024-01-15",
      amount: "$12,500",
      status: "completed",
      time: "09:30 AM"
    },
    {
      id: 2,
      type: "Audit",
      date: "2024-01-14",
      department: "Housekeeping",
      status: "pending",
      time: "02:15 PM"
    },
    {
      id: 3,
      type: "Revenue",
      date: "2024-01-13",
      amount: "$8,750",
      status: "completed",
      time: "11:45 AM"
    }
  ]);

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's your recent activity and pending tasks.
            </p>
          </div>
          <Button className="bg-brand-purple hover:bg-brand-purple-dark">
            <Plus className="h-4 w-4 mr-2" />
            New Entry
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Entries This Week
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Reviews
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Awaiting approval
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed Today
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                Great progress!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Overdue Items
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">
                Needs attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Entries */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Entries</CardTitle>
            <CardDescription>
              Your latest revenue and audit entries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                      <span className="font-medium">{entry.type} Entry</span>
                      <span className="text-sm text-muted-foreground">
                        {entry.date} at {entry.time}
                      </span>
                      {entry.amount && (
                        <span className="text-sm font-semibold text-green-600">
                          {entry.amount}
                        </span>
                      )}
                      {entry.department && (
                        <span className="text-sm text-muted-foreground">
                          Department: {entry.department}
                        </span>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant={entry.status === "completed" ? "default" : "secondary"}
                  >
                    {entry.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Entry</CardTitle>
              <CardDescription>
                Submit daily revenue figures for your assigned areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Add Revenue Entry
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hotel Audit</CardTitle>
              <CardDescription>
                Complete quality audits for hotel departments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Start New Audit
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
