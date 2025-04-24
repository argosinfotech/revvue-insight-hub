
import { useState } from "react";
import { Building2, Search, Filter, MoreVertical, Trash2, Edit, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

// Sample data
const hotels = [
  {
    id: 1,
    name: "Grand Hotel",
    location: "New York, NY",
    manager: "John Smith",
    investors: 12,
    status: "active",
    dateAdded: "2023-10-15",
  },
  {
    id: 2,
    name: "Sunny Beach Resort",
    location: "Miami, FL",
    manager: "Lisa Johnson",
    investors: 8,
    status: "active",
    dateAdded: "2023-11-02",
  },
  {
    id: 3,
    name: "Mountain View Lodge",
    location: "Denver, CO",
    manager: "Robert Williams",
    investors: 5,
    status: "inactive",
    dateAdded: "2023-11-20",
  },
  {
    id: 4,
    name: "City Center Hotel",
    location: "Chicago, IL",
    manager: "Sarah Davis",
    investors: 10,
    status: "active",
    dateAdded: "2023-12-01",
  },
  {
    id: 5,
    name: "Oceanfront Inn",
    location: "San Diego, CA",
    manager: "Michael Brown",
    investors: 7,
    status: "active",
    dateAdded: "2023-12-15",
  }
];

const Hotels = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);
  const [viewHotelId, setViewHotelId] = useState<number | null>(null);

  const filteredHotels = hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.manager.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteHotel = () => {
    toast.success(`Hotel with ID ${selectedHotelId} deleted successfully`);
    setIsDeleteDialogOpen(false);
    setSelectedHotelId(null);
  };

  const handleViewHotel = (hotelId: number) => {
    setViewHotelId(hotelId);
  };

  const selectedHotel = hotels.find(h => h.id === viewHotelId);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hotels</h1>
          <p className="text-muted-foreground">
            Manage all hotels in the system
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-1">
            <Filter size={16} />
            Filter
          </Button>
          <Button className="gap-1 bg-brand-purple hover:bg-brand-purple-dark">
            <Building2 size={16} />
            Add Hotel
          </Button>
        </div>
      </div>

      <div className="flex items-center pb-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search hotels..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="ml-2">
          <Download size={16} />
          <span className="sr-only">Download</span>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Hotels List</CardTitle>
          <CardDescription>
            Showing {filteredHotels.length} of {hotels.length} hotels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hotel Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Investors</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHotels.length > 0 ? (
                  filteredHotels.map((hotel) => (
                    <TableRow key={hotel.id}>
                      <TableCell className="font-medium">{hotel.name}</TableCell>
                      <TableCell>{hotel.location}</TableCell>
                      <TableCell>{hotel.manager}</TableCell>
                      <TableCell>{hotel.investors}</TableCell>
                      <TableCell>
                        <Badge variant={hotel.status === "active" ? "default" : "secondary"} className={hotel.status === "active" ? "bg-green-500 hover:bg-green-600" : ""}>
                          {hotel.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(hotel.dateAdded).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical size={16} />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewHotel(hotel.id)}>
                              <Eye size={14} className="mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit size={14} className="mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => {
                                setSelectedHotelId(hotel.id);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 size={14} className="mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No hotels found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this hotel? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteHotel}
            >
              Delete Hotel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Hotel Dialog */}
      <Dialog open={viewHotelId !== null} onOpenChange={() => setViewHotelId(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Hotel Details</DialogTitle>
            <DialogDescription>
              Complete information about the selected hotel
            </DialogDescription>
          </DialogHeader>
          
          {selectedHotel && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Hotel Name</Label>
                  <p className="text-base">{selectedHotel.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Location</Label>
                  <p className="text-base">{selectedHotel.location}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Manager</Label>
                  <p className="text-base">{selectedHotel.manager}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Number of Investors</Label>
                  <p className="text-base">{selectedHotel.investors}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <p className="text-base capitalize">{selectedHotel.status}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Date Added</Label>
                  <p className="text-base">{new Date(selectedHotel.dateAdded).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-base">Recent Activity</h3>
                <div className="text-sm text-muted-foreground">
                  <p>• Revenue entry updated: April 23, 2024</p>
                  <p>• New investor added: April 20, 2024</p>
                  <p>• Staff member added: April 18, 2024</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setViewHotelId(null)}
            >
              Close
            </Button>
            <Button className="bg-brand-purple hover:bg-brand-purple-dark">
              Edit Hotel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Hotels;
