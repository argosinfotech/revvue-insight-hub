
import { useState } from "react";
import { Building2, Plus, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

interface Investor {
  id: string;
  name: string;
  email: string;
  investmentPercentage: number;
}

interface Hotel {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  investors: Investor[];
  totalInvestment: number;
}

const PortfolioManagerHotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isAddHotelOpen, setIsAddHotelOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isInvestorDialogOpen, setIsInvestorDialogOpen] = useState(false);
  
  const [hotelForm, setHotelForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [investorForm, setInvestorForm] = useState({
    name: "",
    email: "",
    investmentPercentage: "",
  });

  const handleAddHotel = () => {
    if (!hotelForm.name || !hotelForm.address || !hotelForm.city || !hotelForm.state || !hotelForm.zipCode) {
      toast.error("All hotel fields are required");
      return;
    }

    const newHotel: Hotel = {
      id: Date.now().toString(),
      name: hotelForm.name,
      address: hotelForm.address,
      city: hotelForm.city,
      state: hotelForm.state,
      zipCode: hotelForm.zipCode,
      investors: [],
      totalInvestment: 0,
    };

    setHotels([...hotels, newHotel]);
    setHotelForm({ name: "", address: "", city: "", state: "", zipCode: "" });
    setIsAddHotelOpen(false);
    toast.success("Hotel added successfully!");
  };

  const handleAddInvestor = () => {
    if (!selectedHotel) return;
    
    if (!investorForm.name || !investorForm.email || !investorForm.investmentPercentage) {
      toast.error("All investor fields are required");
      return;
    }

    const percentage = parseFloat(investorForm.investmentPercentage);
    if (percentage <= 0 || percentage > 100) {
      toast.error("Investment percentage must be between 1 and 100");
      return;
    }

    // Calculate current total percentage
    const currentTotal = selectedHotel.investors.reduce((sum, inv) => sum + inv.investmentPercentage, 0);
    if (currentTotal + percentage > 100) {
      toast.error(`Cannot add ${percentage}%. Only ${100 - currentTotal}% remaining.`);
      return;
    }

    // Check for duplicate email
    if (selectedHotel.investors.some(inv => inv.email === investorForm.email)) {
      toast.error("An investor with this email already exists for this hotel");
      return;
    }

    const newInvestor: Investor = {
      id: Date.now().toString(),
      name: investorForm.name,
      email: investorForm.email,
      investmentPercentage: percentage,
    };

    const updatedHotels = hotels.map(hotel => {
      if (hotel.id === selectedHotel.id) {
        return {
          ...hotel,
          investors: [...hotel.investors, newInvestor],
        };
      }
      return hotel;
    });

    setHotels(updatedHotels);
    setSelectedHotel({ ...selectedHotel, investors: [...selectedHotel.investors, newInvestor] });
    setInvestorForm({ name: "", email: "", investmentPercentage: "" });
    setIsInvestorDialogOpen(false);
    toast.success("Investor added successfully!");
  };

  const handleRemoveInvestor = (hotelId: string, investorId: string) => {
    const updatedHotels = hotels.map(hotel => {
      if (hotel.id === hotelId) {
        return {
          ...hotel,
          investors: hotel.investors.filter(inv => inv.id !== investorId),
        };
      }
      return hotel;
    });

    setHotels(updatedHotels);
    if (selectedHotel && selectedHotel.id === hotelId) {
      setSelectedHotel({
        ...selectedHotel,
        investors: selectedHotel.investors.filter(inv => inv.id !== investorId),
      });
    }
    toast.success("Investor removed successfully!");
  };

  const getTotalInvestmentPercentage = (hotel: Hotel) => {
    return hotel.investors.reduce((sum, inv) => sum + inv.investmentPercentage, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Hotels</h1>
            <p className="text-muted-foreground">Manage your hotel portfolio and investors</p>
          </div>
          <Dialog open={isAddHotelOpen} onOpenChange={setIsAddHotelOpen}>
            <DialogTrigger asChild>
              <Button className="bg-brand-purple hover:bg-brand-purple-dark">
                <Building2 className="h-4 w-4 mr-2" />
                Add Hotel
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Hotel</DialogTitle>
                <DialogDescription>
                  Enter the details for your new hotel property.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="hotelName">Hotel Name *</Label>
                  <Input
                    id="hotelName"
                    value={hotelForm.name}
                    onChange={(e) => setHotelForm({ ...hotelForm, name: e.target.value })}
                    placeholder="Enter hotel name"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={hotelForm.address}
                    onChange={(e) => setHotelForm({ ...hotelForm, address: e.target.value })}
                    placeholder="Enter street address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={hotelForm.city}
                      onChange={(e) => setHotelForm({ ...hotelForm, city: e.target.value })}
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={hotelForm.state}
                      onChange={(e) => setHotelForm({ ...hotelForm, state: e.target.value })}
                      placeholder="Enter state"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="zipCode">Zip Code *</Label>
                  <Input
                    id="zipCode"
                    value={hotelForm.zipCode}
                    onChange={(e) => setHotelForm({ ...hotelForm, zipCode: e.target.value })}
                    placeholder="Enter zip code"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddHotelOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddHotel} className="bg-brand-purple hover:bg-brand-purple-dark">
                  Add Hotel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Hotels Grid */}
        {hotels.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Hotels Yet</h3>
              <p className="text-muted-foreground mb-4">
                Start by adding your first hotel property to begin managing your portfolio.
              </p>
              <Button 
                onClick={() => setIsAddHotelOpen(true)}
                className="bg-brand-purple hover:bg-brand-purple-dark"
              >
                <Building2 className="h-4 w-4 mr-2" />
                Add Your First Hotel
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hotels.map((hotel) => (
              <Card key={hotel.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="truncate">{hotel.name}</span>
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription>
                    {hotel.address}, {hotel.city}, {hotel.state} {hotel.zipCode}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Investors</span>
                    <span className="font-semibold">{hotel.investors.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Investment</span>
                    <span className="font-semibold">{getTotalInvestmentPercentage(hotel)}%</span>
                  </div>
                  
                  {hotel.investors.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Recent Investors:</h4>
                      {hotel.investors.slice(0, 3).map((investor) => (
                        <div key={investor.id} className="flex justify-between text-xs">
                          <span className="truncate mr-2">{investor.name}</span>
                          <span>{investor.investmentPercentage}%</span>
                        </div>
                      ))}
                      {hotel.investors.length > 3 && (
                        <p className="text-xs text-muted-foreground">
                          +{hotel.investors.length - 3} more investors
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => {
                        setSelectedHotel(hotel);
                        setIsInvestorDialogOpen(true);
                      }}
                      className="flex-1"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Investor
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setSelectedHotel(hotel)}
                    >
                      <Users className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Add Investor Dialog */}
        <Dialog open={isInvestorDialogOpen} onOpenChange={setIsInvestorDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Investor</DialogTitle>
              <DialogDescription>
                Add a new investor to {selectedHotel?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="investorName">Investor Name *</Label>
                <Input
                  id="investorName"
                  value={investorForm.name}
                  onChange={(e) => setInvestorForm({ ...investorForm, name: e.target.value })}
                  placeholder="Enter investor name"
                />
              </div>
              <div>
                <Label htmlFor="investorEmail">Email *</Label>
                <Input
                  id="investorEmail"
                  type="email"
                  value={investorForm.email}
                  onChange={(e) => setInvestorForm({ ...investorForm, email: e.target.value })}
                  placeholder="Enter investor email"
                />
              </div>
              <div>
                <Label htmlFor="percentage">Investment Percentage *</Label>
                <Input
                  id="percentage"
                  type="number"
                  min="0.01"
                  max="100"
                  step="0.01"
                  value={investorForm.investmentPercentage}
                  onChange={(e) => setInvestorForm({ ...investorForm, investmentPercentage: e.target.value })}
                  placeholder="Enter percentage (e.g., 25.5)"
                />
                {selectedHotel && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Remaining: {(100 - getTotalInvestmentPercentage(selectedHotel)).toFixed(2)}%
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInvestorDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddInvestor} className="bg-brand-purple hover:bg-brand-purple-dark">
                Add Investor
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Selected Hotel Details */}
        {selectedHotel && !isInvestorDialogOpen && (
          <Card>
            <CardHeader>
              <CardTitle>{selectedHotel.name} - Investor Details</CardTitle>
              <CardDescription>
                Manage investors for this property
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedHotel.investors.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No investors added yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedHotel.investors.map((investor) => (
                    <div key={investor.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{investor.name}</p>
                        <p className="text-sm text-muted-foreground">{investor.email}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">{investor.investmentPercentage}%</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRemoveInvestor(selectedHotel.id, investor.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Investment:</span>
                      <span className="font-bold text-lg">{getTotalInvestmentPercentage(selectedHotel)}%</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PortfolioManagerHotels;
