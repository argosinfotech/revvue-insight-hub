
import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
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
}

// Form validation schema
const addPackageSchema = z.object({
  name: z.string().min(1, "Package name is required"),
  price: z.string().min(1, "Price is required").regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  description: z.string().min(1, "Description is required"),
  features: z.string().min(1, "Features are required")
});

type AddPackageFormData = z.infer<typeof addPackageSchema>;

const Billing = () => {
  const [isAddPackageOpen, setIsAddPackageOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<BillingPackage | null>(null);
  const [packages, setPackages] = useState([
    {
      id: "basic",
      name: "Basic Package",
      price: 29,
      features: ["Up to 5 hotels", "Basic analytics", "Email support"]
    },
    {
      id: "pro", 
      name: "Pro Package",
      price: 99,
      features: ["Up to 20 hotels", "Advanced analytics", "Priority support", "API access"]
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 0,
      features: ["Unlimited hotels", "Custom integrations", "Dedicated support", "White label options"]
    }
  ]);

  const form = useForm<AddPackageFormData>({
    resolver: zodResolver(addPackageSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      features: ""
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
        features: data.features.split('\n').filter(feature => feature.trim() !== '')
      };

      setPackages([...packages, newPackage]);
      toast.success("Package added successfully!");
    }

    setIsAddPackageOpen(false);
    setEditingPackage(null);
    form.reset();
  };

  const handleEdit = (pkg: BillingPackage) => {
    console.log("Editing package:", pkg);
    setEditingPackage(pkg);
    
    // Pre-populate form with package data
    form.setValue("name", pkg.name);
    form.setValue("price", pkg.price.toString());
    form.setValue("description", ""); // Description not stored in current data structure
    form.setValue("features", pkg.features.join('\n'));
    
    setIsAddPackageOpen(true);
  };

  const handleDelete = (packageId: string) => {
    console.log("Deleting package:", packageId);
    setPackages(packages.filter(pkg => pkg.id !== packageId));
    toast.success("Package deleted successfully!");
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
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(pkg.id)}
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
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
      </div>
    </DashboardLayout>
  );
};

export default Billing;
