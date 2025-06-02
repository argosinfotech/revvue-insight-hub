import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Filter, Plus, FileDown, Edit, Eye, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import RevenueEntryForm from "@/components/RevenueEntryForm";

interface RevenueEntry {
  id: string;
  date: Date;
  totalRevenue: number;
  occupancyPercent: number;
  adr: number;
  otherRevenue: number;
  notes: string;
  revenueSubmitted: boolean;
}

const MyEntries = () => {
  const [showRevenuePanel, setShowRevenuePanel] = useState(false);
  const [editingEntry, setEditingEntry] = useState<RevenueEntry | null>(null);

  // Mock data - in real app this would come from API
  const entries: RevenueEntry[] = [
    {
      id: "1",
      date: new Date(2024, 11, 15),
      totalRevenue: 12450,
      occupancyPercent: 87,
      adr: 185,
      otherRevenue: 350,
      notes: "High occupancy weekend",
      revenueSubmitted: true,
    },
    {
      id: "2", 
      date: new Date(2024, 11, 14),
      totalRevenue: 9800,
      occupancyPercent: 72,
      adr: 165,
      otherRevenue: 280,
      notes: "Regular weekday",
      revenueSubmitted: true,
    },
    {
      id: "3",
      date: new Date(2024, 11, 13),
      totalRevenue: 11200,
      occupancyPercent: 81,
      adr: 175,
      otherRevenue: 320,
      notes: "Conference group booking",
      revenueSubmitted: false,
    },
  ];

  const handleAddTodaysRevenue = () => {
    setEditingEntry(null);
    setShowRevenuePanel(true);
  };

  const handleEdit = (entry: RevenueEntry) => {
    // Check if within permitted timeframe (e.g., within 24 hours)
    const now = new Date();
    const entryDate = new Date(entry.date);
    const timeDiff = now.getTime() - entryDate.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);
    
    if (hoursDiff <= 24) {
      setEditingEntry(entry);
      setShowRevenuePanel(true);
    } else {
      alert("Entry can only be edited within 24 hours of creation.");
    }
  };

  const handleViewDetails = (entry: RevenueEntry) => {
    // Implementation for viewing details
    console.log("View details for entry:", entry);
  };

  const handleFilter = () => {
    // Implementation for date range filter
    console.log("Filter entries");
  };

  const handleExport = () => {
    // Implementation for export
    console.log("Export entries");
  };

  const handleClosePanel = () => {
    setShowRevenuePanel(false);
    setEditingEntry(null);
  };

  const resetForm = () => {
    setEditingEntry(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Entries</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleFilter}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <FileDown className="h-4 w-4 mr-2" />
            Export Entries
          </Button>
          <Sheet open={showRevenuePanel} onOpenChange={setShowRevenuePanel}>
            <SheetTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Today's Revenue
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>{editingEntry ? "Edit Revenue Entry" : "Add Today's Revenue"}</SheetTitle>
                <SheetDescription>
                  {editingEntry ? "Update your revenue entry" : "Submit your daily revenue data"}
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <RevenueEntryForm 
                  entry={editingEntry}
                  onClose={handleClosePanel}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Entries</CardTitle>
          <CardDescription>
            Track and manage your daily revenue submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Total Revenue</TableHead>
                <TableHead>Occupancy %</TableHead>
                <TableHead>ADR</TableHead>
                <TableHead>Other Revenue</TableHead>
                <TableHead>Revenue Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{format(entry.date, "MMM dd, yyyy")}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    ${entry.totalRevenue.toLocaleString()}
                  </TableCell>
                  <TableCell>{entry.occupancyPercent}%</TableCell>
                  <TableCell>${entry.adr}</TableCell>
                  <TableCell>${entry.otherRevenue.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={entry.revenueSubmitted ? "default" : "secondary"}>
                      {entry.revenueSubmitted ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(entry)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(entry)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyEntries;
