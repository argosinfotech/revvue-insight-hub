
import { useState } from "react";
import { Users, Search, Plus, MoreVertical, Edit, Trash2, Send } from "lucide-react";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle,
  SheetTrigger 
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Sample data
const staffMembers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Smith",
    name: "John Smith",
    phone: "+1 (555) 123-4567",
    email: "john.smith@hotel.com",
    hotelName: "Grand Hotel Downtown",
    updatedLastAudit: true,
    status: "active",
  },
  {
    id: 2,
    firstName: "Sarah",
    lastName: "Johnson",
    name: "Sarah Johnson",
    phone: "+1 (555) 234-5678",
    email: "sarah.johnson@hotel.com",
    hotelName: "Sunny Beach Resort",
    updatedLastAudit: false,
    status: "active",
  },
  {
    id: 3,
    firstName: "Mike",
    lastName: "Davis",
    name: "Mike Davis",
    phone: "+1 (555) 345-6789",
    email: "mike.davis@hotel.com",
    hotelName: "City Center Hotel",
    updatedLastAudit: true,
    status: "inactive",
  },
];

const hotels = [
  { id: 1, name: "Grand Hotel Downtown" },
  { id: 2, name: "Sunny Beach Resort" },
  { id: 3, name: "City Center Hotel" },
  { id: 4, name: "Mountain View Lodge" },
];

const PortfolioStaffs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    hotel: "",
    sendWelcomeEmail: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredStaffs = staffMembers.filter(staff => 
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.phone.includes(searchQuery) ||
    staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.hotelName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6 || formData.password.length > 15) {
      newErrors.password = "Password must be between 6 and 15 characters";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }
    if (!formData.hotel) {
      newErrors.hotel = "Hotel selection is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      toast.success("Staff member added successfully!");
      setIsAddStaffOpen(false);
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        hotel: "",
        sendWelcomeEmail: false,
      });
      setErrors({});
    }
  };

  const handleSendReminder = (staffId: number) => {
    toast.success(`Reminder sent to staff member #${staffId}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hotel Staffs</h1>
          <p className="text-muted-foreground">
            Manage all hotel staff members
          </p>
        </div>
        <Sheet open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
          <SheetTrigger asChild>
            <Button className="gap-1 bg-brand-purple hover:bg-brand-purple-dark">
              <Plus size={16} />
              Add Staff
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[500px] sm:w-[600px]">
            <SheetHeader>
              <SheetTitle>Add New Staff Member</SheetTitle>
              <SheetDescription>
                Add a new staff member to your hotel team
              </SheetDescription>
            </SheetHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">{errors.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className={errors.password ? "border-red-500" : ""}
                  placeholder="6-15 characters with uppercase, lowercase & number"
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="hotel">Hotel *</Label>
                <Select onValueChange={(value) => setFormData({...formData, hotel: value})}>
                  <SelectTrigger className={errors.hotel ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select a hotel" />
                  </SelectTrigger>
                  <SelectContent>
                    {hotels.map((hotel) => (
                      <SelectItem key={hotel.id} value={hotel.name}>
                        {hotel.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.hotel && (
                  <p className="text-sm text-red-500">{errors.hotel}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="sendWelcomeEmail"
                  checked={formData.sendWelcomeEmail}
                  onCheckedChange={(checked) => 
                    setFormData({...formData, sendWelcomeEmail: !!checked})
                  }
                />
                <Label htmlFor="sendWelcomeEmail">Send Welcome Email</Label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddStaffOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-brand-purple hover:bg-brand-purple-dark">
                  Add Staff Member
                </Button>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex items-center pb-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search staff members..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Staff Members List</CardTitle>
          <CardDescription>
            Showing {filteredStaffs.length} of {staffMembers.length} staff members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff Name</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Hotel Name</TableHead>
                  <TableHead>Updated Last Audit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaffs.length > 0 ? (
                  filteredStaffs.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {staff.firstName[0]}{staff.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{staff.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{staff.phone}</TableCell>
                      <TableCell>{staff.email}</TableCell>
                      <TableCell>{staff.hotelName}</TableCell>
                      <TableCell>
                        <Badge variant={staff.updatedLastAudit ? "default" : "secondary"} 
                               className={staff.updatedLastAudit ? "bg-green-500 hover:bg-green-600" : ""}>
                          {staff.updatedLastAudit ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={staff.status === "active" ? "default" : "secondary"} 
                               className={staff.status === "active" ? "bg-green-500 hover:bg-green-600" : ""}>
                          {staff.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical size={16} />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleSendReminder(staff.id)}>
                              <Send size={14} className="mr-2" />
                              Send Reminder
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit size={14} className="mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
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
                      No staff members found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioStaffs;
