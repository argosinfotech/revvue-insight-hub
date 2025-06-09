import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Plus, Edit, Trash2, CreditCard } from "lucide-react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";

interface BillingPackage {
  id: string;
  name: string;
  price: number;
  features: string[];
  subscriberCount: number;
}

// Form validation schema
const addPackageSchema = z.object({
  name: z.string().min(1, "Package name is required"),
  price: z.string().min(1, "Price is required").regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  description: z.string().min(1, "Description is required"),
  features: z.string().min(1, "Features are required")
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
  const [packages, setPackages] = useState([
    {
      id: "basic",
      name: "Basic Package",
      price: 29,
      features: ["Up to 5 hotels", "Basic analytics", "Email support"],
      subscriberCount: 12
    },
    {
      id: "pro", 
      name: "Pro Package",
      price: 99,
      features: ["Up to 20 hotels", "Advanced analytics", "Priority support", "API access"],
      subscriberCount: 8
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 0,
      features: ["Unlimited hotels", "Custom integrations", "Dedicated support", "White label options"],
      subscriberCount: 0
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
      description: "",
      features: ""
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
        features: data.features.split('\n').filter(feature => feature.trim() !== '')
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
        features: data.features.split('\n').filter(feature => feature.trim() !== ''),
        subscriberCount: 0
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
    if (pkg.subscriberCount > 0) {
      toast.error("Cannot edit package with active subscribers");
      return;
    }
    
    console.log("Editing package:", pkg);
    setEditingPackage(pkg);
    
    // Pre-populate form with package data
    form.setValue("name", pkg.name);
    form.setValue("price", pkg.price.toString());
    form.setValue("description", ""); // Description not stored in current data structure
    form.setValue("features", pkg.features.join('\n'));
    
    setIsAddPackageOpen(true);
  };

  const handleDeleteClick = (pkg: BillingPackage) => {
    if (pkg.subscriberCount > 0) {
      toast.error("Cannot delete package with active subscribers");
      return;
    }
    
    setPackageToDelete(pkg);
    setDeleteDialogOpen(true);
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

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setPackageToDelete(null);
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
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Monthly Subscription:</span>
                            <span className="text-lg font-bold">
                              {selectedPackage.price === 0 ? 'Custom' : `$${selectedPackage.price}.00`}
                            </span>
                          </div>
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
        
        {/* Packages List */}
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
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Package Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>No. of Subscribers</TableHead>
                    <TableHead>Features</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packages.length > 0 ? (
                    packages.map((pkg) => (
                      <TableRow key={pkg.id}>
                        <TableCell className="font-medium">{pkg.name}</TableCell>
                        <TableCell>
                          {pkg.price === 0 ? 'Custom' : `$${pkg.price}/month`}
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
                              disabled={pkg.subscriberCount > 0}
                              className={`h-8 w-8 p-0 ${pkg.subscriberCount > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                              title={pkg.subscriberCount > 0 ? 'Cannot edit package with active subscribers' : 'Edit package'}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteClick(pkg)}
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                              title="Delete package"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No packages found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Add/Edit Package Panel */}
        <Sheet open={isAddPackageOpen} onOpenChange={setIsAddPackageOpen}>
          <SheetContent className="sm:max-w-md">
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

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (Monthly)</FormLabel>
                      <FormControl>
                        <Input placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Brief package description" {...field} />
                      </FormControl>
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

                <SheetFooter className="gap-2">
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-brand-purple hover:bg-brand-purple-dark">
                    {editingPackage ? 'Update Package' : 'Save Package'}
                  </Button>
                </SheetFooter>
              </form>
            </Form>
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
