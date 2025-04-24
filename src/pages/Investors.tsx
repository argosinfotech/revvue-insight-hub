
import { useState } from "react";
import { Users, Search, Filter, MoreVertical, Trash2, Edit, Eye, Download, Mail, UserCog } from "lucide-react";
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
  DialogTitle
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Sample data
const investors = [
  {
    id: 1,
    name: "James Wilson",
    phone: "+1 (555) 123-4567",
    email: "james@example.com",
    hotels: 3,
    status: "active",
    lastLogin: "2024-04-20T14:30:00",
  },
  {
    id: 2,
    name: "Emma Thompson",
    phone: "+1 (555) 234-5678",
    email: "emma@example.com",
    hotels: 2,
    status: "active",
    lastLogin: "2024-04-22T09:15:00",
  },
  {
    id: 3,
    name: "Michael Chen",
    phone: "+1 (555) 345-6789",
    email: "michael@example.com",
    hotels: 1,
    status: "inactive",
    lastLogin: "2024-04-10T16:45:00",
  },
  {
    id: 4,
    name: "Sophia Rodriguez",
    phone: "+1 (555) 456-7890",
    email: "sophia@example.com",
    hotels: 4,
    status: "active",
    lastLogin: "2024-04-23T11:20:00",
  },
  {
    id: 5,
    name: "William Johnson",
    phone: "+1 (555) 567-8901",
    email: "william@example.com",
    hotels: 2,
    status: "active",
    lastLogin: "2024-04-21T13:10:00",
  }
];

// Sample hotel investments
const hotelInvestments = [
  { hotelName: "Grand Hotel", ownership: "15%", joinDate: "2023-10-15" },
  { hotelName: "Sunny Beach Resort", ownership: "8%", joinDate: "2023-11-02" },
  { hotelName: "City Center Hotel", ownership: "12%", joinDate: "2023-12-01" },
];

// Sample login activity
const loginActivity = [
  { date: "2024-04-23T11:20:00", ipAddress: "192.168.1.101", device: "iPhone 13" },
  { date: "2024-04-20T09:45:00", ipAddress: "192.168.1.101", device: "MacBook Pro" },
  { date: "2024-04-15T16:30:00", ipAddress: "192.168.1.102", device: "iPhone 13" },
];

const Investors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvestorId, setSelectedInvestorId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  
  const filteredInvestors = investors.filter(investor => 
    investor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    investor.phone.includes(searchQuery) ||
    investor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteInvestor = () => {
    toast.success(`Investor with ID ${selectedInvestorId} deleted successfully`);
    setIsDeleteDialogOpen(false);
    setSelectedInvestorId(null);
  };

  const handleViewInvestor = (investorId: number) => {
    setSelectedInvestorId(investorId);
    setIsViewDialogOpen(true);
  };

  const handleResetPassword = (investorId: number) => {
    toast.success(`Password reset link sent to investor #${investorId}`);
  };

  const selectedInvestor = investors.find(i => i.id === selectedInvestorId);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investors</h1>
          <p className="text-muted-foreground">
            Manage all investors in the system
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-1">
            <Filter size={16} />
            Filter
          </Button>
          <Button className="gap-1 bg-brand-purple hover:bg-brand-purple-dark">
            <Users size={16} />
            Add Investor
          </Button>
        </div>
      </div>

      <div className="flex items-center pb-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search investors..."
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
          <CardTitle>Investors List</CardTitle>
          <CardDescription>
            Showing {filteredInvestors.length} of {investors.length} investors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Investor</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Hotels Invested In</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvestors.length > 0 ? (
                  filteredInvestors.map((investor) => (
                    <TableRow key={investor.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {investor.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{investor.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{investor.phone}</TableCell>
                      <TableCell>{investor.email}</TableCell>
                      <TableCell>{investor.hotels}</TableCell>
                      <TableCell>
                        <Badge variant={investor.status === "active" ? "default" : "secondary"} className={investor.status === "active" ? "bg-green-500 hover:bg-green-600" : ""}>
                          {investor.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(investor.lastLogin).toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical size={16} />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewInvestor(investor.id)}>
                              <Eye size={14} className="mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit size={14} className="mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleResetPassword(investor.id)}>
                              <UserCog size={14} className="mr-2" />
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail size={14} className="mr-2" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => {
                                setSelectedInvestorId(investor.id);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 size={14} className="mr-2" />
                              Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No investors found.
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
            <DialogTitle>Confirm Deactivation</DialogTitle>
            <DialogDescription>
              Are you sure you want to deactivate this investor? They will lose access to all hotel data.
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
              onClick={handleDeleteInvestor}
            >
              Deactivate Investor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Investor Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Investor Profile</DialogTitle>
            <DialogDescription>
              Complete information about the selected investor
            </DialogDescription>
          </DialogHeader>
          
          {selectedInvestor && (
            <Tabs defaultValue="profile">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="investments">Investments</TabsTrigger>
                <TabsTrigger value="activity">Login Activity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6 mt-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-xl">
                      {selectedInvestor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">{selectedInvestor.name}</h3>
                    <p className="text-muted-foreground">
                      Investor since {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Phone Number</Label>
                    <p className="text-base">{selectedInvestor.phone}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Email Address</Label>
                    <p className="text-base">{selectedInvestor.email}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Status</Label>
                    <p className="text-base capitalize">{selectedInvestor.status}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Last Login</Label>
                    <p className="text-base">{new Date(selectedInvestor.lastLogin).toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Number of Hotels</Label>
                    <p className="text-base">{selectedInvestor.hotels}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">App Version</Label>
                    <p className="text-base">v1.2.4</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="investments" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hotel Name</TableHead>
                      <TableHead>Ownership %</TableHead>
                      <TableHead>Join Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {hotelInvestments.map((investment, index) => (
                      <TableRow key={index}>
                        <TableCell>{investment.hotelName}</TableCell>
                        <TableCell>{investment.ownership}</TableCell>
                        <TableCell>{new Date(investment.joinDate).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="activity" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Device</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loginActivity.map((activity, index) => (
                      <TableRow key={index}>
                        <TableCell>{new Date(activity.date).toLocaleString()}</TableCell>
                        <TableCell>{activity.ipAddress}</TableCell>
                        <TableCell>{activity.device}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsViewDialogOpen(false)}
            >
              Close
            </Button>
            <Button className="bg-brand-purple hover:bg-brand-purple-dark">
              Edit Profile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Investors;
