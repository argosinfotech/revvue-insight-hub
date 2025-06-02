import { useState } from "react";
import { Building2, Search, Filter, MoreVertical, Trash2, Edit, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "react-router-dom";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";

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
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);
  const [viewHotelId, setViewHotelId] = useState<number | null>(null);
  const [isAddHotelOpen, setIsAddHotelOpen] = useState(false);
  const [hotelForm, setHotelForm] = useState({
    hotelName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    hotelPicture: null as File | null,
    contactNo: "",
    contactFirstName: "",
    contactLastName: ""
  });

  // Determine if this is a Portfolio Manager based on the current path
  const isPortfolioManager = location.pathname.startsWith('/portfolio');

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

  const handleFormChange = (field: string, value: string) => {
    setHotelForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setHotelForm(prev => ({
      ...prev,
      hotelPicture: file
    }));
  };

  const handleAddHotel = () => {
    // Validation
    if (!hotelForm.hotelName.trim()) {
      toast.error("Hotel Name is required");
      return;
    }
    if (hotelForm.hotelName.length > 100) {
      toast.error("Hotel Name must be 100 characters or less");
      return;
    }
    if (!hotelForm.address1.trim()) {
      toast.error("Address 1 is required");
      return;
    }
    if (hotelForm.address1.length > 100) {
      toast.error("Address 1 must be 100 characters or less");
      return;
    }
    if (hotelForm.address2.length > 50) {
      toast.error("Address 2 must be 50 characters or less");
      return;
    }
    if (!hotelForm.city.trim()) {
      toast.error("City is required");
      return;
    }
    if (!hotelForm.state.trim()) {
      toast.error("State is required");
      return;
    }
    if (!hotelForm.zipCode.trim()) {
      toast.error("Zip Code is required");
      return;
    }
    if (!hotelForm.contactNo.trim()) {
      toast.error("Contact Number is required");
      return;
    }
    if (!hotelForm.contactFirstName.trim()) {
      toast.error("Contact First Name is required");
      return;
    }
    if (!hotelForm.contactLastName.trim()) {
      toast.error("Contact Last Name is required");
      return;
    }

    toast.success("Hotel added successfully!");
    setIsAddHotelOpen(false);
    setHotelForm({
      hotelName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      hotelPicture: null,
      contactNo: "",
      contactFirstName: "",
      contactLastName: ""
    });
  };

  return (
    <DashboardLayout>
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
            {/* Only show Add Hotel button for Portfolio Managers */}
            {isPortfolioManager && (
              <Sheet open={isAddHotelOpen} onOpenChange={setIsAddHotelOpen}>
                <SheetTrigger asChild>
                  <Button className="gap-1 bg-brand-purple hover:bg-brand-purple-dark">
                    <Building2 size={16} />
                    Add Hotel
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle>Add New Hotel</SheetTitle>
                    <SheetDescription>
                      Enter the hotel details to add a new property to the system.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="hotelName">Hotel Name *</Label>
                      <Input
                        id="hotelName"
                        value={hotelForm.hotelName}
                        onChange={(e) => handleFormChange("hotelName", e.target.value)}
                        placeholder="Enter hotel name"
                        maxLength={100}
                      />
                      <p className="text-xs text-muted-foreground">{hotelForm.hotelName.length}/100 characters</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address1">Address 1 *</Label>
                      <Input
                        id="address1"
                        value={hotelForm.address1}
                        onChange={(e) => handleFormChange("address1", e.target.value)}
                        placeholder="Enter street address"
                        maxLength={100}
                      />
                      <p className="text-xs text-muted-foreground">{hotelForm.address1.length}/100 characters</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address2">Address 2</Label>
                      <Input
                        id="address2"
                        value={hotelForm.address2}
                        onChange={(e) => handleFormChange("address2", e.target.value)}
                        placeholder="Apartment, suite, etc. (optional)"
                        maxLength={50}
                      />
                      <p className="text-xs text-muted-foreground">{hotelForm.address2.length}/50 characters</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={hotelForm.city}
                          onChange={(e) => handleFormChange("city", e.target.value)}
                          placeholder="Enter city"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          value={hotelForm.state}
                          onChange={(e) => handleFormChange("state", e.target.value)}
                          placeholder="Enter state"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Zip Code *</Label>
                      <Input
                        id="zipCode"
                        value={hotelForm.zipCode}
                        onChange={(e) => handleFormChange("zipCode", e.target.value)}
                        placeholder="Enter zip code"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hotelPicture">Hotel Picture</Label>
                      <Input
                        id="hotelPicture"
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactNo">Contact Number *</Label>
                      <Input
                        id="contactNo"
                        value={hotelForm.contactNo}
                        onChange={(e) => handleFormChange("contactNo", e.target.value)}
                        placeholder="Enter contact number"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactFirstName">Contact First Name *</Label>
                        <Input
                          id="contactFirstName"
                          value={hotelForm.contactFirstName}
                          onChange={(e) => handleFormChange("contactFirstName", e.target.value)}
                          placeholder="First name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactLastName">Contact Last Name *</Label>
                        <Input
                          id="contactLastName"
                          value={hotelForm.contactLastName}
                          onChange={(e) => handleFormChange("contactLastName", e.target.value)}
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddHotelOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddHotel} className="bg-brand-purple hover:bg-brand-purple-dark">
                      Add Hotel
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            )}
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
    </DashboardLayout>
  );
};

export default Hotels;
