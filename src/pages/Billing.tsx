import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Plus, Edit, Trash2, CreditCard, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BillingPackage {
  id: string;
  name: string;
  price: number;
  yearlyPrice?: number;
  features: string[];
  subscriberCount: number;
  maxHotels?: number;
  maxInvestors?: number;
  isActive: boolean;
  effectiveDate?: Date;
}

// Form validation schema
const addPackageSchema = z.object({
  name: z.string().min(1, "Package name is required"),
  price: z.string().min(1, "Monthly price is required").regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  yearlyPrice: z.string().min(1, "Yearly price is required").regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  features: z.string().min(1, "Features are required"),
  maxHotels: z.string().min(1, "Number of hotels is required").regex(/^\d+$/, "Must be a valid number"),
  maxInvestors: z.string().min(1, "Number of investors is required").regex(/^\d+$/, "Must be a valid number"),
  effectiveDate: z.date({
    required_error: "Effective date is required",
  }),
  status: z.enum(["active", "inactive"], {
    required_error: "Status is required",
  }),
});

const paymentSchema = z.object({
  cardNumber: z.string().min(16, "Card number must be 16 digits"),
  expiryDate: z.string().min(5, "Expiry date is required (MM/YY)"),
  cvv: z.string().min(3, "CVV must be 3 digits"),
  cardholderName: z.string().min(1, "Cardholder name is required"),
});

type AddPackageFormData = z.infer<typeof addPackageSchema>;
type PaymentFormData = z.infer<typeof paymentSchema>;

const Billing = () => {
  const location = useLocation();
  const [isAddPackageOpen, setIsAddPackageOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<BillingPackage | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState<BillingPackage | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [packages, setPackages] = useState<BillingPackage[]>([
    {
      id: "basic",
      name: "Basic Package",
      price: 29,
      yearlyPrice: 290,
      features: ["Up to 5 hotels", "Basic analytics", "Email support"],
      subscriberCount: 12,
      maxHotels: 5,
      maxInvestors: 50,
      isActive: true,
      effectiveDate: new Date('2024-01-01')
    },
    {
      id: "pro", 
      name: "Pro Package",
      price: 99,
      yearlyPrice: 990,
      features: ["Up to 20 hotels", "Advanced analytics", "Priority support", "API access"],
      subscriberCount: 8,
      maxHotels: 20,
      maxInvestors: 100,
      isActive: true,
      effectiveDate: new Date('2024-01-15')
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 0,
      yearlyPrice: 0,
      features: ["Unlimited hotels", "Custom integrations", "Dedicated support", "White label options"],
      subscriberCount: 0,
      maxHotels: 999,
      maxInvestors: 999,
      isActive: true,
      effectiveDate: new Date('2024-02-01')
    }
  ]);

  // Check if coming from registration
  const selectedPackageFromRegistration = location.state?.selectedPackage;
  const userInfo = location.state?.userInfo;

  useEffect(() => {
    if (selectedPackageFromRegistration) {
      setShowPaymentForm(true);
    }
  }, [selectedPackageFromRegistration]);

  const selectedPackage = packages.find(pkg => pkg.id === selectedPackageFromRegistration);

  const form = useForm<AddPackageFormData>({
    resolver: zodResolver(addPackageSchema),
    defaultValues: {
      name: "",
      price: "",
      yearlyPrice: "",
      features: "",
      maxHotels: "",
      maxInvestors: "",
      effectiveDate: new Date(),
      status: "active"
    }
  });

  const paymentForm = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
    }
  });

  const onSubmit = (data: AddPackageFormData) => {
    console.log("Submitting package:", data);
    
    if (editingPackage) {
      // Update existing package
      const updatedPackage = {
        ...editingPackage,
        name: data.name,
        price: parseFloat(data.price),
        yearlyPrice: parseFloat(data.yearlyPrice),
        features: data.features.split('\n').filter(feature => feature.trim() !== ''),
        maxHotels: parseInt(data.maxHotels),
        maxInvestors: parseInt(data.maxInvestors),
        effectiveDate: data.effectiveDate,
        isActive: data.status === "active"
      };

      setPackages(packages.map(pkg => 
        pkg.id === editingPackage.id ? updatedPackage : pkg
      ));
      toast.success("Package updated successfully!");
    } else {
      // Add new package
      const newPackage = {
        id: `package_${packages.length + 1}`,
        name: data.name,
        price: parseFloat(data.price),
        yearlyPrice: parseFloat(data.yearlyPrice),
        features: data.features.split('\n').filter(feature => feature.trim() !== ''),
        subscriberCount: 0,
        maxHotels: parseInt(data.maxHotels),
        maxInvestors: parseInt(data.maxInvestors),
        isActive: data.status === "active",
        effectiveDate: data.effectiveDate
      };

      setPackages([...packages, newPackage]);
      toast.success("Package added successfully!");
    }

    setIsAddPackageOpen(false);
    setEditingPackage(null);
    form.reset();
  };

  const onPaymentSubmit = async (data: PaymentFormData) => {
    setIsProcessingPayment(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Payment successful! Your subscription is now active.");
      setShowPaymentForm(false);
      // Here you would typically redirect to dashboard or confirmation page
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleEdit = (pkg: BillingPackage) => {
    console.log("Editing package:", pkg);
    setEditingPackage(pkg);
    
    // Pre-populate form with package data
    form.setValue("name", pkg.name);
    form.setValue("price", pkg.price.toString());
    form.setValue("yearlyPrice", pkg.yearlyPrice?.toString() || "");
    form.setValue("features", pkg.features.join('\n'));
    form.setValue("maxHotels", pkg.maxHotels?.toString() || "");
    form.setValue("maxInvestors", pkg.maxInvestors?.toString() || "");
    form.setValue("effectiveDate", pkg.effectiveDate || new Date());
    form.setValue("status", pkg.isActive ? "active" : "inactive");
    
    setIsAddPackageOpen(true);
  };

  const handleDeleteClick = (pkg: BillingPackage) => {
    toast.error("Package deletion is not allowed");
    return;
  };

  const handleConfirmDelete = () => {
    if (packageToDelete) {
      console.log("Deleting package:", packageToDelete.id);
      setPackages(packages.filter(pkg => pkg.id !== packageToDelete.id));
      toast.success("Package deleted successfully!");
    }
    setDeleteDialogOpen(false);
    setPackageToDelete(null);
  };

  const handleToggleStatus = (pkg: BillingPackage) => {
    if (pkg.subscriberCount > 0 && pkg.isActive) {
      toast.error("Cannot deactivate package with active subscribers");
      return;
    }
    
    const updatedPackage = { ...pkg, isActive: !pkg.isActive };
    setPackages(packages.map(p => p.id === pkg.id ? updatedPackage : p));
    toast.success(`Package ${pkg.isActive ? 'deactivated' : 'activated'} successfully!`);
  };

  const handleCancel = () => {
    setIsAddPackageOpen(false);
    setEditingPackage(null);
    form.reset();
  };

  const handleAddNew = () => {
    setEditingPackage(null);
    form.reset();
    setIsAddPackageOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setPackageToDelete(null);
  };

  const activePackages = packages.filter(pkg => pkg.isActive);
  const inactivePackages = packages.filter(pkg => !pkg.isActive);

  const renderPackageTable = (packageList: BillingPackage[]) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Package Name</TableHead>
            <TableHead>Monthly Price</TableHead>
            <TableHead>Yearly Price</TableHead>
            <TableHead>Max Hotels</TableHead>
            <TableHead>Max Investors</TableHead>
            <TableHead>Effective Date</TableHead>
            <TableHead>No. of Subscribers</TableHead>
            <TableHead>Features</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packageList.length > 0 ? (
            packageList.map((pkg) => (
              <TableRow key={pkg.id}>
                <TableCell className="font-medium">{pkg.name}</TableCell>
                <TableCell>
                  {pkg.price === 0 ? 'Custom' : `$${pkg.price}/month`}
                </TableCell>
                <TableCell>
                  {pkg.yearlyPrice === 0 ? 'Custom' : pkg.yearlyPrice ? `$${pkg.yearlyPrice}/year` : 'N/A'}
                </TableCell>
                <TableCell>
                  {pkg.maxHotels === 999 ? 'Unlimited' : pkg.maxHotels}
                </TableCell>
                <TableCell>
                  {pkg.maxInvestors === 999 ? 'Unlimited' : pkg.maxInvestors}
                </TableCell>
                <TableCell>
                  {pkg.effectiveDate ? format(pkg.effectiveDate, "MMM dd, yyyy") : 'N/A'}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {pkg.subscriberCount}
                  </span>
                </TableCell>
                <TableCell>
                  <ul className="text-sm text-muted-foreground">
                    {pkg.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(pkg)}
                      className="h-8 w-8 p-0"
                      title="Edit package"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center">
                No packages found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Payment Form for New Registration */}
        {showPaymentForm && selectedPackage && (
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Complete Your Payment
              </CardTitle>
              <CardDescription>
                Complete your registration by providing payment details for your selected package.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Payment Summary */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium">{selectedPackage.name}</h4>
                          <p className="text-sm text-muted-foreground">{selectedPackage.features.join(", ")}</p>
                        </div>
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Monthly Subscription:</span>
                            <span className="text-lg font-bold">
                              {selectedPackage.price === 0 ? 'Custom' : `$${selectedPackage.price}.00`}
                            </span>
                          </div>
                          {selectedPackage.yearlyPrice && selectedPackage.yearlyPrice > 0 && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Yearly (billed monthly):</span>
                              <span className="text-sm text-muted-foreground">
                                ${(selectedPackage.yearlyPrice / 12).toFixed(2)}/month
                              </span>
                            </div>
                          )}
                        </div>
                        {userInfo && (
                          <div className="border-t pt-4">
                            <h5 className="font-medium mb-2">Account Details:</h5>
                            <p className="text-sm text-muted-foreground">{userInfo.firstName} {userInfo.lastName}</p>
                            <p className="text-sm text-muted-foreground">{userInfo.email}</p>
                            <p className="text-sm text-muted-foreground">{userInfo.organizationName}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Payment Form */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
                  <Form {...paymentForm}>
                    <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-4">
                      <FormField
                        control={paymentForm.control}
                        name="cardholderName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cardholder Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={paymentForm.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input placeholder="1234 5678 9012 3456" maxLength={19} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={paymentForm.control}
                          name="expiryDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date</FormLabel>
                              <FormControl>
                                <Input placeholder="MM/YY" maxLength={5} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={paymentForm.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV</FormLabel>
                              <FormControl>
                                <Input placeholder="123" maxLength={3} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-brand-purple hover:bg-brand-purple-dark"
                        disabled={isProcessingPayment}
                      >
                        {isProcessingPayment ? "Processing..." : `Pay Now - $${selectedPackage.price}.00`}
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Existing Billing Management */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Billing & Packages</h1>
            <p className="text-muted-foreground">
              Manage billing and subscription packages
            </p>
          </div>
          <Button 
            onClick={handleAddNew}
            className="gap-2 bg-brand-purple hover:bg-brand-purple-dark"
          >
            <Plus size={16} />
            Add Package
          </Button>
        </div>
        
        {/* Packages List with Tabs */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              Packages List
            </CardTitle>
            <CardDescription>
              Showing {packages.length} packages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="active">Active Packages ({activePackages.length})</TabsTrigger>
                <TabsTrigger value="inactive">Inactive Packages ({inactivePackages.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="active" className="mt-4">
                {renderPackageTable(activePackages)}
              </TabsContent>
              <TabsContent value="inactive" className="mt-4">
                {renderPackageTable(inactivePackages)}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Add/Edit Package Panel */}
        <Sheet open={isAddPackageOpen} onOpenChange={setIsAddPackageOpen}>
          <SheetContent className="sm:max-w-md flex flex-col">
            <SheetHeader>
              <SheetTitle>
                {editingPackage ? 'Edit Package' : 'Add New Package'}
              </SheetTitle>
              <SheetDescription>
                {editingPackage 
                  ? 'Update the package details below.' 
                  : 'Create a new billing package with custom pricing and features.'
                }
              </SheetDescription>
            </SheetHeader>
            
            <ScrollArea className="flex-1 px-1">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Package Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter package name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Price</FormLabel>
                          <FormControl>
                            <Input placeholder="29.00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="yearlyPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Yearly Price</FormLabel>
                          <FormControl>
                            <Input placeholder="290.00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="maxHotels"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Hotels</FormLabel>
                          <FormControl>
                            <Input placeholder="5" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="maxInvestors"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Investors</FormLabel>
                          <FormControl>
                            <Input placeholder="50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="effectiveDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Effective Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick an effective date</span>
                                )}
                                <Calendar className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="features"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Features</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter features (one per line)&#10;• Feature 1&#10;• Feature 2&#10;• Feature 3"
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <SheetFooter className="gap-2 pb-6">
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-brand-purple hover:bg-brand-purple-dark">
                      {editingPackage ? 'Update Package' : 'Save Package'}
                    </Button>
                  </SheetFooter>
                </form>
              </Form>
            </ScrollArea>
          </SheetContent>
        </Sheet>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the package 
                "{packageToDelete?.name}" from your billing system.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancelDelete}>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleConfirmDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete Package
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

export default Billing;

}
