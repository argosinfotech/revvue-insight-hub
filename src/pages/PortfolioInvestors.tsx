
import { useState } from "react";
import { Users, Mail, Phone, DollarSign, Search, Filter, MoreVertical, Eye, Edit, Trash2, UserPlus, X, Building2, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";

interface Investor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  hotelsInvested: string[];
  status: "invite_sent" | "active" | "deactivated" | "invite_rejected";
  lastLogin: string;
  appVersion: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

interface Investment {
  hotelName: string;
  ownershipPercentage: number;
  joinDate: string;
}

interface LoginActivity {
  date: string;
  ipAddress: string;
  device: string;
}

interface HotelAssignment {
  hotel: string;
  sharePercentage: number;
}

interface InvestorFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  hotelAssignments: HotelAssignment[];
  status: string;
  sendInvitation: boolean;
  sendSMS: boolean;
}

const PortfolioInvestors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHotelFilter, setSelectedHotelFilter] = useState("all");
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAddEditSheetOpen, setIsAddEditSheetOpen] = useState(false);
  const [editingInvestor, setEditingInvestor] = useState<Investor | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [investorToDelete, setInvestorToDelete] = useState<string | null>(null);

  const form = useForm<InvestorFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      hotelAssignments: [{ hotel: "", sharePercentage: 0 }],
      status: "invite_sent",
      sendInvitation: true,
      sendSMS: false,
    },
  });

  // Mock data
  const investors: Investor[] = [
    {
      id: "1",
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      hotelsInvested: ["Grand Plaza Hotel", "City Center Inn"],
      status: "active",
      lastLogin: "2023-12-15T14:30:00",
      appVersion: "v1.2.4",
      address1: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001"
    },
    {
      id: "2",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 987-6543",
      hotelsInvested: ["Sunset Resort"],
      status: "active",
      lastLogin: "2023-12-14T09:15:00",
      appVersion: "v1.2.4"
    },
    {
      id: "3",
      firstName: "Michael",
      lastName: "Brown",
      email: "michael.brown@email.com",
      phone: "+1 (555) 456-7890",
      hotelsInvested: ["Grand Plaza Hotel"],
      status: "invite_sent",
      lastLogin: "2023-12-10T16:45:00",
      appVersion: "v1.2.3"
    }
  ];

  const hotels = ["Grand Plaza Hotel", "City Center Inn", "Sunset Resort", "Downtown Hotel"];

  const mockInvestments: Investment[] = [
    { hotelName: "Grand Plaza Hotel", ownershipPercentage: 15, joinDate: "2023-10-15" },
    { hotelName: "City Center Inn", ownershipPercentage: 8, joinDate: "2023-11-02" },
  ];

  const mockLoginActivity: LoginActivity[] = [
    { date: "2023-12-15T14:30:00", ipAddress: "192.168.1.101", device: "iPhone 13" },
    { date: "2023-12-12T09:45:00", ipAddress: "192.168.1.101", device: "MacBook Pro" },
    { date: "2023-12-08T16:30:00", ipAddress: "192.168.1.102", device: "iPhone 13" },
  ];

  const filteredInvestors = investors.filter(investor => {
    const matchesSearch = 
      investor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesHotelFilter = selectedHotelFilter === "all" || 
      investor.hotelsInvested.includes(selectedHotelFilter);
    
    return matchesSearch && matchesHotelFilter;
  });

  const totalInvestors = investors.length;
  const activeInvestors = investors.filter(inv => inv.status === "active").length;
  const totalInvestment = 550000; // Mock total investment amount

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "invite_sent": return "bg-blue-100 text-blue-800";
      case "invite_rejected": return "bg-red-100 text-red-800";
      case "deactivated": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active": return "Active";
      case "invite_sent": return "Invite Sent";
      case "invite_rejected": return "Invite Rejected";
      case "deactivated": return "Deactivated";
      default: return status;
    }
  };

  const handleViewInvestor = (investor: Investor) => {
    setSelectedInvestor(investor);
    setIsViewDialogOpen(true);
  };

  const handleEditInvestor = (investor: Investor) => {
    setEditingInvestor(investor);
    const hotelAssignments = investor.hotelsInvested.map(hotel => ({
      hotel,
      sharePercentage: 15, // Mock percentage
    }));
    form.reset({
      firstName: investor.firstName,
      lastName: investor.lastName,
      phone: investor.phone,
      email: investor.email,
      hotelAssignments: hotelAssignments.length > 0 ? hotelAssignments : [{ hotel: "", sharePercentage: 0 }],
      status: investor.status,
      sendInvitation: false,
      sendSMS: false,
    });
    setIsAddEditSheetOpen(true);
  };

  const handleAddInvestor = () => {
    setEditingInvestor(null);
    form.reset({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      hotelAssignments: [{ hotel: "", sharePercentage: 0 }],
      status: "invite_sent",
      sendInvitation: true,
      sendSMS: false,
    });
    setIsAddEditSheetOpen(true);
  };

  const handleDeleteInvestor = (investorId: string) => {
    setInvestorToDelete(investorId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteInvestor = () => {
    toast.success("Investor deleted successfully");
    setIsDeleteDialogOpen(false);
    setInvestorToDelete(null);
  };

  const handleResendInvite = (investorId: string) => {
    toast.success("Invitation resent successfully");
  };

  const addHotelAssignment = () => {
    const currentAssignments = form.getValues("hotelAssignments");
    form.setValue("hotelAssignments", [...currentAssignments, { hotel: "", sharePercentage: 0 }]);
  };

  const removeHotelAssignment = (index: number) => {
    const currentAssignments = form.getValues("hotelAssignments");
    if (currentAssignments.length > 1) {
      const newAssignments = currentAssignments.filter((_, i) => i !== index);
      form.setValue("hotelAssignments", newAssignments);
    }
  };

  const onSubmit = (data: InvestorFormData) => {
    console.log("Form data:", data);
    const validAssignments = data.hotelAssignments.filter(assignment => assignment.hotel && assignment.sharePercentage > 0);
    if (validAssignments.length === 0) {
      toast.error("Please add at least one hotel assignment");
      return;
    }
    toast.success(editingInvestor ? "Investor updated successfully" : "Investor added successfully");
    setIsAddEditSheetOpen(false);
    form.reset();
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Investors</h1>
            <p className="text-muted-foreground">Manage your investor relationships</p>
          </div>
          <Button onClick={handleAddInvestor} className="bg-brand-purple hover:bg-brand-purple-dark">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Investor
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by investor name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedHotelFilter} onValueChange={setSelectedHotelFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by hotel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Hotels</SelectItem>
              {hotels.map((hotel) => (
                <SelectItem key={hotel} value={hotel}>
                  {hotel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Investors Table */}
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
                    <TableHead>Investor Name</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Number of Hotels</TableHead>
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
                                {investor.firstName[0]}{investor.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{investor.firstName} {investor.lastName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{investor.phone}</TableCell>
                        <TableCell>{investor.email}</TableCell>
                        <TableCell>{investor.hotelsInvested.length}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(investor.status)}>
                            {getStatusLabel(investor.status)}
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
                              <DropdownMenuItem onClick={() => handleViewInvestor(investor)}>
                                <Eye size={14} className="mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              {investor.status === "invite_sent" && (
                                <DropdownMenuItem onClick={() => handleResendInvite(investor.id)}>
                                  <Mail size={14} className="mr-2" />
                                  Resend Invite
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => handleEditInvestor(investor)}>
                                <Edit size={14} className="mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeleteInvestor(investor.id)}
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
                        No investors found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

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
                  <TabsTrigger value="investments">Investment</TabsTrigger>
                  <TabsTrigger value="activity">Login Activity</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="space-y-6 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-xl">
                          {selectedInvestor.firstName[0]}{selectedInvestor.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-bold">{selectedInvestor.firstName} {selectedInvestor.lastName}</h3>
                        <Badge className={getStatusColor(selectedInvestor.status)}>
                          {getStatusLabel(selectedInvestor.status)}
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => handleEditInvestor(selectedInvestor)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
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
                      <Label className="text-muted-foreground">Last Login</Label>
                      <p className="text-base">{new Date(selectedInvestor.lastLogin).toLocaleString()}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">App Version</Label>
                      <p className="text-base">{selectedInvestor.appVersion}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Number of Hotels</Label>
                      <p className="text-base">{selectedInvestor.hotelsInvested.length}</p>
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
                      {mockInvestments.map((investment, index) => (
                        <TableRow key={index}>
                          <TableCell>{investment.hotelName}</TableCell>
                          <TableCell>{investment.ownershipPercentage}%</TableCell>
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
                      {mockLoginActivity.map((activity, index) => (
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
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add/Edit Investor Sheet */}
        <Sheet open={isAddEditSheetOpen} onOpenChange={setIsAddEditSheetOpen}>
          <SheetContent className="w-[600px] sm:max-w-[600px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>{editingInvestor ? "Edit Investor" : "Add Investor"}</SheetTitle>
              <SheetDescription>
                {editingInvestor ? "Update investor information" : "Add a new investor to your portfolio"}
              </SheetDescription>
            </SheetHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    rules={{ required: "First name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    rules={{ required: "Last name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  rules={{ required: "Phone number is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  rules={{ 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Invested In Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Invested In *</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addHotelAssignment}
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add More Hotel
                    </Button>
                  </div>

                  {form.watch("hotelAssignments").map((_, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 p-4 border rounded-lg relative">
                      {form.watch("hotelAssignments").length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-6 w-6 p-0"
                          onClick={() => removeHotelAssignment(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                      
                      <FormField
                        control={form.control}
                        name={`hotelAssignments.${index}.hotel`}
                        rules={{ required: "Hotel selection is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hotel {index + 1} *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select hotel" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {hotels.map((hotel) => (
                                  <SelectItem key={hotel} value={hotel}>
                                    {hotel}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`hotelAssignments.${index}.sharePercentage`}
                        rules={{ 
                          required: "Share percentage is required",
                          min: { value: 0.01, message: "Must be greater than 0" },
                          max: { value: 100, message: "Must be less than or equal to 100" }
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Share (%) *</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="Enter percentage" 
                                {...field} 
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>

                <FormField
                  control={form.control}
                  name="status"
                  rules={{ required: "Status is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="deactive">Deactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="sendInvitation"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Send Invitation Email
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sendSMS"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Send Invitation SMS
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsAddEditSheetOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-brand-purple hover:bg-brand-purple-dark">
                    {editingInvestor ? "Update Investor" : "Add Investor"}
                  </Button>
                </div>
              </form>
            </Form>
          </SheetContent>
        </Sheet>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this investor? This action cannot be undone.
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
                onClick={confirmDeleteInvestor}
              >
                Delete Investor
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default PortfolioInvestors;
