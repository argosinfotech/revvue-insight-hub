
import { useState } from "react";
import { 
  Package, 
  DollarSign, 
  Save, 
  CreditCard, 
  BarChart, 
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PackageData {
  id: string;
  name: string;
  description: string;
  hotelBaseFee: string;
  investorFee: string;
  isActive: boolean;
  createdAt: string;
}

// Sample billing history
const billingHistory = [
  { id: 1, date: "2024-04-01", amount: "$842.00", hotels: 67, investors: 243, status: "paid" },
  { id: 2, date: "2024-03-01", amount: "$810.00", hotels: 65, investors: 230, status: "paid" },
  { id: 3, date: "2024-02-01", amount: "$780.00", hotels: 63, investors: 220, status: "paid" },
  { id: 4, date: "2024-01-01", amount: "$750.00", hotels: 60, investors: 210, status: "paid" },
  { id: 5, date: "2023-12-01", amount: "$710.00", hotels: 57, investors: 200, status: "paid" },
];

const Billing = () => {
  // Initial packages data
  const [packages, setPackages] = useState<PackageData[]>([
    {
      id: "1",
      name: "Standard Package",
      description: "Basic package for small hotels",
      hotelBaseFee: "10.00",
      investorFee: "2.00",
      isActive: true,
      createdAt: "2024-01-15"
    },
    {
      id: "2", 
      name: "Premium Package",
      description: "Advanced features for growing hotels",
      hotelBaseFee: "25.00",
      investorFee: "3.50",
      isActive: true,
      createdAt: "2024-02-01"
    }
  ]);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PackageData | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    hotelBaseFee: "",
    investorFee: ""
  });
  const [tabValue, setTabValue] = useState("packages");

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      hotelBaseFee: "",
      investorFee: ""
    });
    setEditingPackage(null);
  };

  const handleAddPackage = () => {
    resetForm();
    setIsSheetOpen(true);
  };

  const handleEditPackage = (pkg: PackageData) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      description: pkg.description,
      hotelBaseFee: pkg.hotelBaseFee,
      investorFee: pkg.investorFee
    });
    setIsSheetOpen(true);
  };

  const handleSavePackage = () => {
    if (!formData.name.trim() || !formData.hotelBaseFee || !formData.investorFee) {
      toast.error("Please fill in all required fields");
      return;
    }

    const packageData: PackageData = {
      id: editingPackage?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      hotelBaseFee: formData.hotelBaseFee,
      investorFee: formData.investorFee,
      isActive: true,
      createdAt: editingPackage?.createdAt || new Date().toISOString().split('T')[0]
    };

    if (editingPackage) {
      setPackages(packages.map(pkg => pkg.id === editingPackage.id ? packageData : pkg));
      toast.success("Package updated successfully");
    } else {
      setPackages([...packages, packageData]);
      toast.success("Package created successfully");
    }

    setIsSheetOpen(false);
    resetForm();
  };

  const handleDeletePackage = (id: string) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
    toast.success("Package deleted successfully");
  };

  const togglePackageStatus = (id: string) => {
    setPackages(packages.map(pkg => 
      pkg.id === id ? { ...pkg, isActive: !pkg.isActive } : pkg
    ));
    toast.success("Package status updated");
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing & Packages</h1>
          <p className="text-muted-foreground">
            Manage system pricing and view billing history
          </p>
        </div>
      </div>

      <Tabs defaultValue={tabValue} onValueChange={setTabValue} className="space-y-4">
        <TabsList>
          <TabsTrigger value="packages">
            <Package className="h-4 w-4 mr-2" />
            Package Management
          </TabsTrigger>
          <TabsTrigger value="history">
            <CreditCard className="h-4 w-4 mr-2" />
            Billing History
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart className="h-4 w-4 mr-2" />
            Revenue Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="packages" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Subscription Packages</CardTitle>
                  <CardDescription>
                    Create and manage different pricing packages for hotels
                  </CardDescription>
                </div>
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                    <Button onClick={handleAddPackage} className="bg-brand-purple hover:bg-brand-purple-dark">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Package
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>
                        {editingPackage ? "Edit Package" : "Create New Package"}
                      </SheetTitle>
                      <SheetDescription>
                        {editingPackage ? "Update package details" : "Add a new subscription package"}
                      </SheetDescription>
                    </SheetHeader>
                    
                    <div className="space-y-6 mt-6">
                      <div className="space-y-2">
                        <Label htmlFor="package-name">Package Name *</Label>
                        <Input
                          id="package-name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="e.g., Premium Package"
                          maxLength={100}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="package-description">Description</Label>
                        <Input
                          id="package-description"
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          placeholder="Brief description of the package"
                          maxLength={200}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hotel-fee">Base Fee per Hotel (USD/month) *</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                          <Input
                            id="hotel-fee"
                            type="number"
                            step="0.01"
                            min="0"
                            value={formData.hotelBaseFee}
                            onChange={(e) => setFormData({...formData, hotelBaseFee: e.target.value})}
                            className="pl-8"
                            placeholder="0.00"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="investor-fee">Fee per Investor per Hotel (USD/month) *</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                          <Input
                            id="investor-fee"
                            type="number"
                            step="0.01"
                            min="0"
                            value={formData.investorFee}
                            onChange={(e) => setFormData({...formData, investorFee: e.target.value})}
                            className="pl-8"
                            placeholder="0.00"
                          />
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg bg-muted/50">
                        <h3 className="text-sm font-medium mb-2">Pricing Example</h3>
                        <div className="space-y-2 text-sm">
                          <p>For a hotel with 10 investors:</p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Base Fee: ${formData.hotelBaseFee || "0.00"} per month</li>
                            <li>Investor Fee: ${formData.investorFee || "0.00"} × 10 investors = ${((parseFloat(formData.investorFee) || 0) * 10).toFixed(2)} per month</li>
                            <li>Total: ${((parseFloat(formData.hotelBaseFee) || 0) + (parseFloat(formData.investorFee) || 0) * 10).toFixed(2)} per month</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <SheetClose asChild>
                          <Button variant="outline" onClick={resetForm} className="flex-1">
                            Cancel
                          </Button>
                        </SheetClose>
                        <Button onClick={handleSavePackage} className="flex-1 bg-brand-purple hover:bg-brand-purple-dark">
                          <Save className="h-4 w-4 mr-2" />
                          {editingPackage ? "Update" : "Create"}
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Package Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Hotel Fee</TableHead>
                    <TableHead>Investor Fee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packages.map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell className="font-medium">{pkg.name}</TableCell>
                      <TableCell>{pkg.description}</TableCell>
                      <TableCell>${pkg.hotelBaseFee}/month</TableCell>
                      <TableCell>${pkg.investorFee}/month</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {pkg.isActive ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-green-600">Active</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600">Inactive</span>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{new Date(pkg.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditPackage(pkg)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => togglePackageStatus(pkg.id)}
                          >
                            {pkg.isActive ? "Deactivate" : "Activate"}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeletePackage(pkg.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                View all past billing transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr className="border-b">
                      <th className="h-10 px-4 text-left font-medium">Date</th>
                      <th className="h-10 px-4 text-left font-medium">Amount</th>
                      <th className="h-10 px-4 text-left font-medium">Hotels</th>
                      <th className="h-10 px-4 text-left font-medium">Investors</th>
                      <th className="h-10 px-4 text-left font-medium">Status</th>
                      <th className="h-10 px-4 text-left font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingHistory.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="p-4">{new Date(item.date).toLocaleDateString()}</td>
                        <td className="p-4">{item.amount}</td>
                        <td className="p-4">{item.hotels}</td>
                        <td className="p-4">{item.investors}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            {item.status === "paid" ? (
                              <>
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="capitalize">Paid</span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="h-4 w-4 text-amber-500" />
                                <span className="capitalize">Pending</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm">
                            View Invoice
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Current Month</CardTitle>
                <CardDescription>April 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$842.00</div>
                <p className="text-muted-foreground">Projected revenue</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>YTD Revenue</CardTitle>
                <CardDescription>Jan - Apr 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$3,182.00</div>
                <p className="text-muted-foreground">From subscriptions</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Growth Rate</CardTitle>
                <CardDescription>Compared to last month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">+3.95%</div>
                <p className="text-muted-foreground">Monthly increase</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>
                Distribution of revenue sources
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-80 flex items-center justify-center">
                <p className="text-muted-foreground">Revenue charts will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Billing;
