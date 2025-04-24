
import { useState } from "react";
import { 
  Package, 
  DollarSign, 
  Save, 
  CreditCard, 
  BarChart, 
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

// Sample billing history
const billingHistory = [
  { id: 1, date: "2024-04-01", amount: "$842.00", hotels: 67, investors: 243, status: "paid" },
  { id: 2, date: "2024-03-01", amount: "$810.00", hotels: 65, investors: 230, status: "paid" },
  { id: 3, date: "2024-02-01", amount: "$780.00", hotels: 63, investors: 220, status: "paid" },
  { id: 4, date: "2024-01-01", amount: "$750.00", hotels: 60, investors: 210, status: "paid" },
  { id: 5, date: "2023-12-01", amount: "$710.00", hotels: 57, investors: 200, status: "paid" },
];

const Billing = () => {
  const [hotelBaseFee, setHotelBaseFee] = useState("10.00");
  const [investorFee, setInvestorFee] = useState("2.00");
  const [isEditing, setIsEditing] = useState(false);
  const [tabValue, setTabValue] = useState("pricing");

  const handleSavePricing = () => {
    toast.success("Pricing settings updated successfully");
    setIsEditing(false);
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
          <TabsTrigger value="pricing">
            <Package className="h-4 w-4 mr-2" />
            Pricing Settings
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
        
        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Package Pricing</CardTitle>
              <CardDescription>
                Configure the base fees for hotels and investors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hotel-fee" className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Base Fee per Hotel (USD, monthly)
                    </Label>
                    <div className="flex items-center gap-2 relative">
                      <span className="absolute left-3 text-muted-foreground">$</span>
                      <Input
                        id="hotel-fee"
                        value={hotelBaseFee}
                        onChange={(e) => setHotelBaseFee(e.target.value)}
                        disabled={!isEditing}
                        className="pl-8"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This fee is charged monthly for each hotel in the system.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="investor-fee" className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Fee per Investor per Hotel (USD, monthly)
                    </Label>
                    <div className="flex items-center gap-2 relative">
                      <span className="absolute left-3 text-muted-foreground">$</span>
                      <Input
                        id="investor-fee"
                        value={investorFee}
                        onChange={(e) => setInvestorFee(e.target.value)}
                        disabled={!isEditing}
                        className="pl-8"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This fee is charged monthly for each investor associated with each hotel.
                    </p>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-muted/50">
                  <h3 className="text-sm font-medium mb-2">Pricing Example</h3>
                  <div className="space-y-2 text-sm">
                    <p>For a hotel with 10 investors:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Base Fee: ${hotelBaseFee} per month</li>
                      <li>Investor Fee: ${investorFee} × 10 investors = ${(parseFloat(investorFee) * 10).toFixed(2)} per month</li>
                      <li>Total: ${(parseFloat(hotelBaseFee) + parseFloat(investorFee) * 10).toFixed(2)} per month</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                <Clock className="h-4 w-4 inline mr-1" />
                Last updated: April 15, 2024
              </div>
              {isEditing ? (
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSavePricing}
                    className="bg-brand-purple hover:bg-brand-purple-dark"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  Edit Pricing
                </Button>
              )}
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historical Pricing Log</CardTitle>
              <CardDescription>
                Record of all pricing changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr className="border-b">
                        <th className="h-10 px-4 text-left font-medium">Date</th>
                        <th className="h-10 px-4 text-left font-medium">Changed By</th>
                        <th className="h-10 px-4 text-left font-medium">Hotel Fee</th>
                        <th className="h-10 px-4 text-left font-medium">Investor Fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-4">April 15, 2024</td>
                        <td className="p-4">admin@example.com</td>
                        <td className="p-4">$10.00</td>
                        <td className="p-4">$2.00</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4">January 10, 2024</td>
                        <td className="p-4">admin@example.com</td>
                        <td className="p-4">$8.50</td>
                        <td className="p-4">$1.75</td>
                      </tr>
                      <tr>
                        <td className="p-4">October 2, 2023</td>
                        <td className="p-4">admin@example.com</td>
                        <td className="p-4">$8.00</td>
                        <td className="p-4">$1.50</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
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
