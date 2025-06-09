import { useState } from "react";
import { Building2, Plus, Trash2, Users, Search, Eye, Edit, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/components/DashboardLayout";

interface Investor {
  id: string;
  name: string;
  email: string;
  investmentPercentage: number;
}

interface Hotel {
  id: string;
  name: string;
  managerName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  area: string;
  zipCode: string;
  status: "active" | "inactive";
  dateAdded: string;
  investors: Investor[];
  recentActivity: string[];
}

const PortfolioManagerHotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([
    {
      id: "1",
      name: "Grand Plaza Hotel",
      managerName: "John Smith",
      address1: "123 Main Street",
      address2: "Suite 100",
      city: "New York",
      state: "NY",
      area: "Manhattan",
      zipCode: "10001",
      status: "active",
      dateAdded: "2023-10-15",
      investors: [
        { id: "1", name: "Alice Johnson", email: "alice@example.com", investmentPercentage: 30 },
        { id: "2", name: "Bob Wilson", email: "bob@example.com", investmentPercentage: 25 }
      ],
      recentActivity: [
        "Revenue entry updated: April 23, 2024",
        "New investor added: April 20, 2024",
        "Staff member added: April 18, 2024"
      ]
    },
    {
      id: "2",
      name: "Ocean View Resort",
      managerName: "Sarah Davis",
      address1: "456 Beach Road",
      city: "Miami",
      state: "FL",
      area: "South Beach",
      zipCode: "33139",
      status: "active",
      dateAdded: "2023-11-02",
      investors: [
        { id: "3", name: "Carol Brown", email: "carol@example.com", investmentPercentage: 40 }
      ],
      recentActivity: [
        "Monthly report generated: April 25, 2024",
        "Maintenance scheduled: April 22, 2024"
      ]
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isAddHotelOpen, setIsAddHotelOpen] = useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  
  const [hotelForm, setHotelForm] = useState({
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    area: "",
    zipCode: "",
    status: "active" as "active" | "inactive",
  });

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => {
    setHotelForm({
      name: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      area: "",
      zipCode: "",
      status: "active",
    });
    setEditingHotel(null);
  };

  const handleAddHotel = () => {
    if (!hotelForm.name || !hotelForm.address1 || 
        !hotelForm.city || !hotelForm.state || !hotelForm.area || !hotelForm.zipCode) {
      toast.error("All required fields must be filled");
      return;
    }

    const newHotel: Hotel = {
      id: Date.now().toString(),
      name: hotelForm.name,
      managerName: "To be assigned", // Default value since manager name removed from form
      address1: hotelForm.address1,
      address2: hotelForm.address2,
      city: hotelForm.city,
      state: hotelForm.state,
      area: hotelForm.area,
      zipCode: hotelForm.zipCode,
      status: hotelForm.status,
      dateAdded: new Date().toISOString().split('T')[0],
      investors: [],
      recentActivity: ["Hotel created"],
    };

    setHotels([...hotels, newHotel]);
    resetForm();
    setIsAddHotelOpen(false);
    toast.success("Hotel added successfully!");
  };

  const handleEditHotel = () => {
    if (!editingHotel) return;
    
    if (!hotelForm.name || !hotelForm.address1 || 
        !hotelForm.city || !hotelForm.state || !hotelForm.area || !hotelForm.zipCode) {
      toast.error("All required fields must be filled");
      return;
    }

    const updatedHotels = hotels.map(hotel => {
      if (hotel.id === editingHotel.id) {
        return {
          ...hotel,
          name: hotelForm.name,
          address1: hotelForm.address1,
          address2: hotelForm.address2,
          city: hotelForm.city,
          state: hotelForm.state,
          area: hotelForm.area,
          zipCode: hotelForm.zipCode,
          status: hotelForm.status,
        };
      }
      return hotel;
    });

    setHotels(updatedHotels);
    resetForm();
    setIsAddHotelOpen(false);
    setIsViewDetailsOpen(false);
    toast.success("Hotel updated successfully!");
  };

  const handleDeleteHotel = (hotelId: string) => {
    setHotels(hotels.filter(hotel => hotel.id !== hotelId));
    toast.success("Hotel deleted successfully!");
  };

  const openViewDetails = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsViewDetailsOpen(true);
  };

  const openEditForm = (hotel: Hotel) => {
    setEditingHotel(hotel);
    setHotelForm({
      name: hotel.name,
      address1: hotel.address1,
      address2: hotel.address2 || "",
      city: hotel.city,
      state: hotel.state,
      area: hotel.area,
      zipCode: hotel.zipCode,
      status: hotel.status,
    });
    setIsViewDetailsOpen(false);
    setIsAddHotelOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Hotels</h1>
            <p className="text-muted-foreground">Manage your hotel portfolio</p>
          </div>
          <Sheet open={isAddHotelOpen} onOpenChange={setIsAddHotelOpen}>
            <SheetTrigger asChild>
              <Button className="bg-brand-purple hover:bg-brand-purple-dark" onClick={resetForm}>
                <Building2 className="h-4 w-4 mr-2" />
                Add Hotel
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>{editingHotel ? "Edit Hotel" : "Add New Hotel"}</SheetTitle>
                <SheetDescription>
                  {editingHotel ? "Update hotel details" : "Enter the hotel details to add a new property"}
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="hotelName">Hotel Name *</Label>
                  <Input
                    id="hotelName"
                    value={hotelForm.name}
                    onChange={(e) => setHotelForm({ ...hotelForm, name: e.target.value })}
                    placeholder="Enter hotel name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address1">Address 1 *</Label>
                  <Input
                    id="address1"
                    value={hotelForm.address1}
                    onChange={(e) => setHotelForm({ ...hotelForm, address1: e.target.value })}
                    placeholder="Enter street address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address2">Address 2</Label>
                  <Input
                    id="address2"
                    value={hotelForm.address2}
                    onChange={(e) => setHotelForm({ ...hotelForm, address2: e.target.value })}
                    placeholder="Apartment, suite, etc. (optional)"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={hotelForm.city}
                      onChange={(e) => setHotelForm({ ...hotelForm, city: e.target.value })}
                      placeholder="Enter city"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={hotelForm.state}
                      onChange={(e) => setHotelForm({ ...hotelForm, state: e.target.value })}
                      placeholder="Enter state"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="area">Area *</Label>
                    <Input
                      id="area"
                      value={hotelForm.area}
                      onChange={(e) => setHotelForm({ ...hotelForm, area: e.target.value })}
                      placeholder="Enter area"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip Code *</Label>
                    <Input
                      id="zipCode"
                      value={hotelForm.zipCode}
                      onChange={(e) => setHotelForm({ ...hotelForm, zipCode: e.target.value })}
                      placeholder="Enter zip code"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select value={hotelForm.status} onValueChange={(value: "active" | "inactive") => setHotelForm({ ...hotelForm, status: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => { resetForm(); setIsAddHotelOpen(false); }}>
                  Cancel
                </Button>
                <Button 
                  onClick={editingHotel ? handleEditHotel : handleAddHotel} 
                  className="bg-brand-purple hover:bg-brand-purple-dark"
                >
                  {editingHotel ? "Update Hotel" : "Add Hotel"}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search hotel name..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Hotels Table */}
        <Card>
          <CardHeader>
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
                    <TableHead>Address</TableHead>
                    <TableHead>Staff Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead>No. of Investors</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHotels.length > 0 ? (
                    filteredHotels.map((hotel) => (
                      <TableRow key={hotel.id}>
                        <TableCell className="font-medium">{hotel.name}</TableCell>
                        <TableCell>
                          {hotel.address1}, {hotel.city}, {hotel.state} {hotel.zipCode}
                        </TableCell>
                        <TableCell>{hotel.managerName}</TableCell>
                        <TableCell>
                          <Badge variant={hotel.status === "active" ? "default" : "secondary"} 
                                 className={hotel.status === "active" ? "bg-green-500 hover:bg-green-600" : ""}>
                            {hotel.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(hotel.dateAdded).toLocaleDateString()}</TableCell>
                        <TableCell>{hotel.investors.length}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical size={16} />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openViewDetails(hotel)}>
                                <Eye size={14} className="mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openEditForm(hotel)}>
                                <Edit size={14} className="mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeleteHotel(hotel.id)}
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

        {/* View Details Dialog */}
        <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                Hotel Details
              </DialogTitle>
              <DialogDescription>
                Complete information about the selected hotel
              </DialogDescription>
            </DialogHeader>
            
            {selectedHotel && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Hotel Name</Label>
                    <p className="text-base font-medium">{selectedHotel.name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Staff Name</Label>
                    <p className="text-base">{selectedHotel.managerName}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Address</Label>
                    <p className="text-base">
                      {selectedHotel.address1}
                      {selectedHotel.address2 && `, ${selectedHotel.address2}`}
                      <br />
                      {selectedHotel.city}, {selectedHotel.state} {selectedHotel.zipCode}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Number of Investors</Label>
                    <p className="text-base">{selectedHotel.investors.length}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Date Added</Label>
                    <p className="text-base">{new Date(selectedHotel.dateAdded).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Status</Label>
                    <Badge variant={selectedHotel.status === "active" ? "default" : "secondary"} 
                           className={selectedHotel.status === "active" ? "bg-green-500" : ""}>
                      {selectedHotel.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Recent Activity</Label>
                  <div className="text-sm space-y-1">
                    {selectedHotel.recentActivity.map((activity, index) => (
                      <p key={index} className="text-muted-foreground">• {activity}</p>
                    ))}
                  </div>
                </div>

                {selectedHotel.investors.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Investors</Label>
                    <div className="space-y-2">
                      {selectedHotel.investors.map((investor) => (
                        <div key={investor.id} className="flex justify-between items-center p-2 border rounded">
                          <div>
                            <p className="font-medium">{investor.name}</p>
                            <p className="text-sm text-muted-foreground">{investor.email}</p>
                          </div>
                          <span className="font-semibold">{investor.investmentPercentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDetailsOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default PortfolioManagerHotels;
