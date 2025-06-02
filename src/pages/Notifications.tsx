
import { useState } from "react";
import { Bell, Search, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/components/DashboardLayout";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
  timestamp: string;
}

const sampleNotifications: Notification[] = [
  {
    id: "1",
    title: "New Hotel Added",
    message: "Hotel Grand Plaza has been successfully added to the system",
    type: "success",
    isRead: false,
    timestamp: "2024-06-02T10:30:00Z"
  },
  {
    id: "2",
    title: "System Maintenance",
    message: "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM",
    type: "warning",
    isRead: true,
    timestamp: "2024-06-01T14:15:00Z"
  },
  {
    id: "3",
    title: "New User Registration",
    message: "A new portfolio manager has registered and requires approval",
    type: "info",
    isRead: false,
    timestamp: "2024-06-01T09:45:00Z"
  },
  {
    id: "4",
    title: "Payment Failed",
    message: "Payment processing failed for subscription renewal",
    type: "error",
    isRead: true,
    timestamp: "2024-05-31T16:20:00Z"
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || 
                         (filterType === "unread" && !notification.isRead) ||
                         (filterType === "read" && notification.isRead) ||
                         notification.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success": return "bg-green-100 text-green-800";
      case "warning": return "bg-yellow-100 text-yellow-800";
      case "error": return "bg-red-100 text-red-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground">
              Stay updated with system alerts and important messages
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{unreadCount} unread</Badge>
            <Button 
              onClick={markAllAsRead}
              variant="outline"
              disabled={unreadCount === 0}
            >
              Mark all as read
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notifications..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All notifications</SelectItem>
              <SelectItem value="unread">Unread only</SelectItem>
              <SelectItem value="read">Read only</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="info">Info</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell size={20} />
              Recent Notifications
            </CardTitle>
            <CardDescription>
              Showing {filteredNotifications.length} of {notifications.length} notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      !notification.isRead 
                        ? "bg-blue-50 border-blue-200" 
                        : "bg-white hover:bg-gray-50"
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{notification.title}</h3>
                        {!notification.isRead && (
                          <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <Badge className={getTypeColor(notification.type)}>
                        {notification.type}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-2">{notification.message}</p>
                    <p className="text-sm text-gray-500">{formatTimestamp(notification.timestamp)}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
