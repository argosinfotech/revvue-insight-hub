
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Send, Filter, Search, Calendar } from "lucide-react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";

interface RevenueEntry {
  id: string;
  date: Date;
  hotelName: string;
  staffName: string;
  totalRevenue: number;
  occupancyPercent: number;
  adr: number;
  otherRevenue: number;
  status: "Updated" | "Pending";
  notes: string;
}

const Revenue = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHotel, setSelectedHotel] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [dateRange, setDateRange] = useState("30");
  const [selectedEntry, setSelectedEntry] = useState<RevenueEntry | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  // Mock data - in real app this would come from API
  const revenueEntries: RevenueEntry[] = [
    {
      id: "1",
      date: new Date(2024, 11, 15),
      hotelName: "Grand Plaza Hotel",
      staffName: "John Smith",
      totalRevenue: 12450,
      occupancyPercent: 87,
      adr: 185,
      otherRevenue: 350,
      status: "Updated",
      notes: "High occupancy weekend with conference bookings",
    },
    {
      id: "2", 
      date: new Date(2024, 11, 14),
      hotelName: "Ocean View Resort",
      staffName: "Sarah Johnson",
      totalRevenue: 9800,
      occupancyPercent: 72,
      adr: 165,
      otherRevenue: 280,
      status: "Pending",
      notes: "Regular weekday operations",
    },
    {
      id: "3",
      date: new Date(2024, 11, 13),
      hotelName: "City Center Inn",
      staffName: "Mike Davis",
      totalRevenue: 11200,
      occupancyPercent: 81,
      adr: 175,
      otherRevenue: 320,
      status: "Updated",
      notes: "Business traveler surge mid-week",
    },
    {
      id: "4",
      date: new Date(2024, 11, 12),
      hotelName: "Grand Plaza Hotel",
      staffName: "Emily Wilson",
      totalRevenue: 8900,
      occupancyPercent: 65,
      adr: 155,
      otherRevenue: 200,
      status: "Pending",
      notes: "Slower midweek period",
    },
  ];

  const hotels = [
    { value: "all", label: "All Hotels" },
    { value: "grand-plaza", label: "Grand Plaza Hotel" },
    { value: "ocean-view", label: "Ocean View Resort" },
    { value: "city-center", label: "City Center Inn" },
  ];

  const filteredEntries = revenueEntries.filter(entry => {
    const matchesSearch = entry.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.hotelName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHotel = selectedHotel === "all" || entry.hotelName.toLowerCase().includes(selectedHotel.replace("-", " "));
    const matchesStatus = selectedStatus === "all" || entry.status.toLowerCase() === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesHotel && matchesStatus;
  });

  const handleViewDetails = (entry: RevenueEntry) => {
    setSelectedEntry(entry);
    setShowDetailDialog(true);
  };

  const handleSendReminder = (entry: RevenueEntry) => {
    console.log("Sending reminder for entry:", entry.id);
    toast.success(`Reminder sent to ${entry.staffName} for ${entry.hotelName}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Revenue Management</h1>
            <p className="text-muted-foreground">
              Monitor and manage revenue entries from hotel staff
            </p>
          </div>
        </div>

        {/* Compact Filters */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="h-4 w-4" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Staff, hotel name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 h-9"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Date Range</label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Hotel</label>
                <Select value={selectedHotel} onValueChange={setSelectedHotel}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {hotels.map((hotel) => (
                      <SelectItem key={hotel.value} value={hotel.value}>
                        {hotel.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Status</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="updated">Updated</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Entries Table */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Entries</CardTitle>
            <CardDescription>
              Latest revenue submissions from hotel staff ({filteredEntries.length} entries)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Hotel Name</TableHead>
                  <TableHead>Staff Name</TableHead>
                  <TableHead>Total Revenue</TableHead>
                  <TableHead>Occupancy %</TableHead>
                  <TableHead>ADR ($)</TableHead>
                  <TableHead>Other Revenue ($)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div>{format(entry.date, "MMM dd, yyyy")}</div>
                          <div className="text-xs text-muted-foreground">
                            {format(entry.date, "hh:mm a")}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{entry.hotelName}</TableCell>
                    <TableCell>{entry.staffName}</TableCell>
                    <TableCell className="font-medium">
                      ${entry.totalRevenue.toLocaleString()}
                    </TableCell>
                    <TableCell>{entry.occupancyPercent}%</TableCell>
                    <TableCell>${entry.adr}</TableCell>
                    <TableCell>${entry.otherRevenue.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={entry.status === "Updated" ? "default" : "secondary"}>
                        {entry.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(entry)}
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {entry.status === "Pending" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSendReminder(entry)}
                            title="Send Reminder"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Detail View Dialog */}
        <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Revenue Entry Details</DialogTitle>
              <DialogDescription>
                Detailed view of the revenue entry
              </DialogDescription>
            </DialogHeader>
            {selectedEntry && (
              <div className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Date & Time:</span>
                    <span>{format(selectedEntry.date, "MMM dd, yyyy 'at' hh:mm a")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Hotel Name:</span>
                    <span>{selectedEntry.hotelName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Staff Name:</span>
                    <span>{selectedEntry.staffName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Total Revenue:</span>
                    <span className="font-semibold">${selectedEntry.totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Occupancy (%):</span>
                    <span>{selectedEntry.occupancyPercent}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">ADR ($):</span>
                    <span>${selectedEntry.adr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Other Revenue ($):</span>
                    <span>${selectedEntry.otherRevenue.toLocaleString()}</span>
                  </div>
                </div>
                
                {selectedEntry.notes && (
                  <div className="space-y-2">
                    <span className="font-medium">Notes:</span>
                    <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-md">
                      {selectedEntry.notes}
                    </p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Revenue;
