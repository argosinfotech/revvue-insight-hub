
import { useState } from "react";
import { Search, Eye } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock data
const portfolioManagers = [
  {
    id: 1,
    clientName: "Luxury Hotels Group",
    numberOfHotels: 5,
    numberOfInvestors: 12,
    enrolledDate: "2024-01-15",
    status: "Active",
    organizationDetails: {
      contactPersonName: "John Smith",
      email: "john.smith@luxuryhotels.com",
      phoneNumber: "+1 (555) 123-4567",
      address: "123 Business Ave, New York, NY 10001"
    },
    subscriptionDetails: {
      planName: "Premium Plan",
      planType: "Monthly",
      status: "Active",
      amount: "$99.99",
      nextBillingDate: "2024-06-15",
      subscriptionId: "sub_1234567890",
      expirationDate: "2024-06-15",
      maxHotels: 10,
      maxInvestors: 50
    },
    hotels: [
      {
        hotelName: "Grand Plaza Hotel",
        location: "Manhattan, NY",
        enrolledDate: "2024-01-15",
        status: "Active"
      },
      {
        hotelName: "Seaside Resort",
        location: "Miami, FL",
        enrolledDate: "2024-02-20",
        status: "Active"
      }
    ],
    investors: [
      {
        investorName: "Michael Johnson",
        phoneNumber: "+1 (555) 987-6543",
        shareInHotels: "25%",
        email: "michael.j@email.com",
        status: "Active"
      },
      {
        investorName: "Sarah Wilson",
        phoneNumber: "+1 (555) 456-7890",
        shareInHotels: "30%",
        email: "sarah.w@email.com",
        status: "Active"
      }
    ]
  },
  {
    id: 2,
    clientName: "Boutique Hotels Inc",
    numberOfHotels: 3,
    numberOfInvestors: 8,
    enrolledDate: "2024-02-10",
    status: "Inactive",
    organizationDetails: {
      contactPersonName: "Emily Davis",
      email: "emily.davis@boutiquehotels.com",
      phoneNumber: "+1 (555) 234-5678",
      address: "456 Hotel Street, Los Angeles, CA 90210"
    },
    subscriptionDetails: {
      planName: "Basic Plan",
      planType: "Yearly",
      status: "Expired",
      amount: "$599.99",
      nextBillingDate: "2025-02-10",
      subscriptionId: "sub_0987654321",
      expirationDate: "2024-02-10",
      maxHotels: 5,
      maxInvestors: 20
    },
    hotels: [
      {
        hotelName: "Vintage Inn",
        location: "Beverly Hills, CA",
        enrolledDate: "2024-02-10",
        status: "Active"
      }
    ],
    investors: [
      {
        investorName: "Robert Brown",
        phoneNumber: "+1 (555) 345-6789",
        shareInHotels: "40%",
        email: "robert.b@email.com",
        status: "Active"
      }
    ]
  }
];

const PortfolioManagers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedManager, setSelectedManager] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredManagers = portfolioManagers.filter(manager =>
    manager.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (manager) => {
    setSelectedManager(manager);
    setIsViewDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Portfolio Manager</h1>
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by client name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client Name</TableHead>
                  <TableHead>No. of Hotels</TableHead>
                  <TableHead>No. of Investors</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Subscription Plan</TableHead>
                  <TableHead>Expiration Date</TableHead>
                  <TableHead>Enrolled Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredManagers.map((manager) => (
                  <TableRow key={manager.id}>
                    <TableCell className="font-medium">{manager.clientName}</TableCell>
                    <TableCell>{manager.numberOfHotels}</TableCell>
                    <TableCell>{manager.numberOfInvestors}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={manager.status === "Active" ? "default" : "secondary"}
                        className={manager.status === "Active" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}
                      >
                        {manager.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{manager.subscriptionDetails.planName}</TableCell>
                    <TableCell>{new Date(manager.subscriptionDetails.expirationDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(manager.enrolledDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(manager)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* View Details Dialog with Tabs */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
            <DialogHeader className="pb-4 flex-shrink-0">
              <DialogTitle>Portfolio Manager Details</DialogTitle>
            </DialogHeader>

            {selectedManager && (
              <Tabs defaultValue="organization" className="flex-1 flex flex-col min-h-0">
                <TabsList className="grid w-full grid-cols-3 mb-4 flex-shrink-0">
                  <TabsTrigger value="organization">Organization Details</TabsTrigger>
                  <TabsTrigger value="hotels">Hotel Information</TabsTrigger>
                  <TabsTrigger value="investors">Investors</TabsTrigger>
                </TabsList>

                <TabsContent value="organization" className="flex-1 space-y-4 pb-4">
                  {/* Organization Details */}
                  <Card className="flex-shrink-0">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Organization Details</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 pb-4">
                      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Contact Person Name</label>
                          <p className="text-sm mt-1">{selectedManager.organizationDetails.contactPersonName}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Email</label>
                          <p className="text-sm mt-1">{selectedManager.organizationDetails.email}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                          <p className="text-sm mt-1">{selectedManager.organizationDetails.phoneNumber}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Address</label>
                          <p className="text-sm mt-1">{selectedManager.organizationDetails.address}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Subscription Details */}
                  <Card className="flex-shrink-0">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Subscription Details</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 pb-4">
                      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Plan Name</label>
                          <p className="text-sm font-semibold mt-1">{selectedManager.subscriptionDetails.planName}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Plan Type</label>
                          <p className="text-sm mt-1">{selectedManager.subscriptionDetails.planType}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Status</label>
                          <div className="mt-1">
                            <Badge variant={selectedManager.subscriptionDetails.status === "Active" ? "default" : "secondary"} 
                                   className={selectedManager.subscriptionDetails.status === "Active" ? "bg-green-500 hover:bg-green-600" : ""}>
                              {selectedManager.subscriptionDetails.status}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Amount</label>
                          <p className="text-sm font-semibold text-green-600 mt-1">{selectedManager.subscriptionDetails.amount}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Max Hotels Allowed</label>
                          <p className="text-sm font-semibold mt-1">{selectedManager.subscriptionDetails.maxHotels}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Max Investors Allowed</label>
                          <p className="text-sm font-semibold mt-1">{selectedManager.subscriptionDetails.maxInvestors}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Next Billing Date</label>
                          <p className="text-sm mt-1">{selectedManager.subscriptionDetails.nextBillingDate}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Expiration Date</label>
                          <p className="text-sm mt-1">{selectedManager.subscriptionDetails.expirationDate}</p>
                        </div>
                        <div className="col-span-2">
                          <label className="text-sm font-medium text-muted-foreground">Subscription ID</label>
                          <p className="text-sm font-mono mt-1">{selectedManager.subscriptionDetails.subscriptionId}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="hotels" className="flex-1 min-h-0 overflow-hidden">
                  <Card className="h-full flex flex-col">
                    <CardHeader className="pb-2 flex-shrink-0">
                      <CardTitle className="text-lg">Hotel Information</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 pb-3 flex-1 min-h-0">
                      <div className="h-full">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-xs h-8">Hotel Name</TableHead>
                              <TableHead className="text-xs h-8">Location</TableHead>
                              <TableHead className="text-xs h-8">Enrolled Date</TableHead>
                              <TableHead className="text-xs h-8">Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedManager.hotels.map((hotel, index) => (
                              <TableRow key={index} className="h-10">
                                <TableCell className="text-sm py-2">{hotel.hotelName}</TableCell>
                                <TableCell className="text-sm py-2">{hotel.location}</TableCell>
                                <TableCell className="text-sm py-2">{new Date(hotel.enrolledDate).toLocaleDateString()}</TableCell>
                                <TableCell className="py-2">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    hotel.status === 'Active' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {hotel.status}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="investors" className="flex-1 min-h-0 overflow-hidden">
                  <Card className="h-full flex flex-col">
                    <CardHeader className="pb-2 flex-shrink-0">
                      <CardTitle className="text-lg">Investors</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 pb-3 flex-1 min-h-0">
                      <div className="h-full">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-xs h-8">Investor Name</TableHead>
                              <TableHead className="text-xs h-8">Phone Number</TableHead>
                              <TableHead className="text-xs h-8">Share in Hotels</TableHead>
                              <TableHead className="text-xs h-8">Email</TableHead>
                              <TableHead className="text-xs h-8">Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedManager.investors.map((investor, index) => (
                              <TableRow key={index} className="h-10">
                                <TableCell className="text-sm py-2">{investor.investorName}</TableCell>
                                <TableCell className="text-sm py-2">{investor.phoneNumber}</TableCell>
                                <TableCell className="text-sm py-2">{investor.shareInHotels}</TableCell>
                                <TableCell className="text-sm py-2">{investor.email}</TableCell>
                                <TableCell className="py-2">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    investor.status === 'Active' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {investor.status}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default PortfolioManagers;
