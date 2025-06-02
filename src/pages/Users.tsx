import { useState } from "react";
import { Users as UsersIcon, Search, Plus, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";

// User types
const USER_TYPES = [
  "Super Admin",
  "Backoffice User", 
  "Portfolio Manager",
  "Investor"
] as const;

// Sample companies for Portfolio Manager dropdown
const COMPANIES = [
  "Hotel Group Inc.",
  "Luxury Hotels Corp",
  "City Hotels Ltd",
  "Resort Management Co",
  "Boutique Hotels LLC"
] as const;

// Sample users data
const sampleUsers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    userType: "Super Admin" as const,
    company: null
  },
  {
    id: 2,
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com", 
    userType: "Portfolio Manager" as const,
    company: "Hotel Group Inc."
  },
  {
    id: 3,
    firstName: "Mike",
    lastName: "Wilson",
    email: "mike.wilson@example.com",
    userType: "Backoffice User" as const,
    company: null
  },
  {
    id: 4,
    firstName: "Emma",
    lastName: "Davis",
    email: "emma.davis@example.com",
    userType: "Investor" as const,
    company: null
  }
];

// Form validation schema
const addUserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  userType: z.enum(USER_TYPES, { required_error: "User type is required" }),
  company: z.string().optional()
}).refine((data) => {
  if (data.userType === "Portfolio Manager") {
    return data.company && data.company.length > 0;
  }
  return true;
}, {
  message: "Company is required for Portfolio Manager",
  path: ["company"]
});

type AddUserFormData = z.infer<typeof addUserSchema>;

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [users, setUsers] = useState(sampleUsers);

  const form = useForm<AddUserFormData>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userType: undefined,
      company: ""
    }
  });

  const watchedUserType = form.watch("userType");

  const filteredUsers = users.filter(user => 
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.userType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onSubmit = (data: AddUserFormData) => {
    console.log("Adding user:", data);
    
    const newUser = {
      id: users.length + 1,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      userType: data.userType,
      company: data.userType === "Portfolio Manager" ? data.company : null
    };

    setUsers([...users, newUser]);
    toast.success("User added successfully!");
    setIsAddUserOpen(false);
    form.reset();
  };

  const handleCancel = () => {
    setIsAddUserOpen(false);
    form.reset();
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
            <p className="text-muted-foreground">
              Manage all users in the system
            </p>
          </div>
          <Button 
            onClick={() => setIsAddUserOpen(true)}
            className="gap-2 bg-brand-purple hover:bg-brand-purple-dark"
          >
            <Plus size={16} />
            Add User
          </Button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center pb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Users List */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <UsersIcon size={20} />
              Users List
            </CardTitle>
            <CardDescription>
              Showing {filteredUsers.length} of {users.length} users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>User Type</TableHead>
                    <TableHead>Company</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.firstName}</TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.userType === "Super Admin" 
                              ? "bg-red-100 text-red-800"
                              : user.userType === "Portfolio Manager"
                              ? "bg-blue-100 text-blue-800" 
                              : user.userType === "Backoffice User"
                              ? "bg-green-100 text-green-800"
                              : "bg-purple-100 text-purple-800"
                          }`}>
                            {user.userType}
                          </span>
                        </TableCell>
                        <TableCell>{user.company || "—"}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No users found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Add User Panel */}
        <Sheet open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <SheetContent className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Add New User</SheetTitle>
              <SheetDescription>
                Create a new user account with the specified details and permissions.
              </SheetDescription>
            </SheetHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter password (min 8 chars)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="userType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select user type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {USER_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchedUserType === "Portfolio Manager" && (
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select company" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {COMPANIES.map((company) => (
                              <SelectItem key={company} value={company}>
                                {company}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <SheetFooter className="gap-2">
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-brand-purple hover:bg-brand-purple-dark">
                    Save User
                  </Button>
                </SheetFooter>
              </form>
            </Form>
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
};

export default Users;
