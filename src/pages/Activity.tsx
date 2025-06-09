
import { useState } from "react";
import { Calendar, Search, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/DashboardLayout";

interface ActivityLog {
  id: string;
  timestamp: string;
  userName: string;
  userRole: "Manager" | "Investor" | "Staff" | "Super Admin";
  userId: string;
  actionType: string;
  actionDescription: string;
}

const mockActivityLogs: ActivityLog[] = [
  {
    id: "1",
    timestamp: "2024-01-15 10:30:25",
    userName: "John Smith",
    userRole: "Super Admin",
    userId: "admin001",
    actionType: "Login",
    actionDescription: "User logged into the system"
  },
  {
    id: "2",
    timestamp: "2024-01-15 11:15:42",
    userName: "Sarah Johnson",
    userRole: "Manager",
    userId: "manager001",
    actionType: "Hotel Update",
    actionDescription: "Added hotel: Hilton NYC"
  },
  {
    id: "3",
    timestamp: "2024-01-15 14:22:18",
    userName: "Mike Wilson",
    userRole: "Staff",
    userId: "staff001",
    actionType: "Revenue Entry",
    actionDescription: "Updated revenue data for Q4 2023"
  },
  {
    id: "4",
    timestamp: "2024-01-15 16:45:33",
    userName: "Emily Davis",
    userRole: "Manager",
    userId: "manager002",
    actionType: "Investor Invite",
    actionDescription: "Invited new investor: Robert Brown"
  }
];

const actionTypes = [
  "All Types",
  "Login",
  "Logout",
  "Revenue Entry",
  "Hotel Update",
  "Investor Invite",
  "User Management",
  "System Configuration"
];

const userRoles = [
  "All Roles",
  "Manager",
  "Investor", 
  "Staff",
  "Super Admin"
];

const Activity = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedActionType, setSelectedActionType] = useState("All Types");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [isCST, setIsCST] = useState(true);
  const [filteredLogs, setFilteredLogs] = useState<ActivityLog[]>(mockActivityLogs);

  const clearSearch = () => {
    setSearchTerm("");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedActionType("All Types");
    setSelectedRole("All Roles");
    setDateFrom(undefined);
    setDateTo(undefined);
  };

  const applyFilters = () => {
    let filtered = mockActivityLogs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.actionDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Action type filter
    if (selectedActionType !== "All Types") {
      filtered = filtered.filter(log => log.actionType === selectedActionType);
    }

    // Role filter
    if (selectedRole !== "All Roles") {
      filtered = filtered.filter(log => log.userRole === selectedRole);
    }

    // Date range filter (simplified for demo)
    if (dateFrom || dateTo) {
      filtered = filtered.filter(log => {
        const logDate = new Date(log.timestamp);
        const fromDate = dateFrom || new Date(0);
        const toDate = dateTo || new Date();
        return logDate >= fromDate && logDate <= toDate;
      });
    }

    setFilteredLogs(filtered);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const timeZone = isCST ? "CST" : "Local";
    return `${timestamp} (${timeZone})`;
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Super Admin":
        return "bg-red-100 text-red-800";
      case "Manager":
        return "bg-blue-100 text-blue-800";
      case "Staff":
        return "bg-green-100 text-green-800";
      case "Investor":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Activity Logs</h1>
          <Button onClick={clearFilters} variant="outline">
            <X className="h-4 w-4 mr-2" />
            Clear All Filters
          </Button>
        </div>

        {/* Filters Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by user name, user ID, or action description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Date Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Date From</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateFrom && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date To</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateTo && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Action Type Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Action Type</label>
                <Select value={selectedActionType} onValueChange={setSelectedActionType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {actionTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* User Role Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">User Role</label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {userRoles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Timezone Toggle & Apply Button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Timezone:</label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCST(!isCST)}
                >
                  {isCST ? "CST" : "Local"}
                </Button>
              </div>
              <Button onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Activity Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Logs ({filteredLogs.length} records)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User Name</TableHead>
                    <TableHead>Action Type</TableHead>
                    <TableHead>Action Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        No activity logs found matching your filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-sm">
                          {formatTimestamp(log.timestamp)}
                        </TableCell>
                        <TableCell className="font-medium">{log.userName}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {log.actionType}
                          </span>
                        </TableCell>
                        <TableCell>{log.actionDescription}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Activity;
