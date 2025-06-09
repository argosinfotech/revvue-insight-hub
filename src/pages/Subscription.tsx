import { useState } from "react";
import { CreditCard, Download, Calendar, DollarSign, FileText, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";

// Sample data
const latestSubscription = {
  planType: "Premium Plan (5 Hotels, 100 Investors)",
  planAmount: "$99.99",
  nextBillingDate: "2024-06-15",
  subscriptionId: "sub_1234567890",
  planStatus: "active",
  planId: "plan_premium_001",
  lastPayedAmount: "$99.99",
  lastPaymentDate: "2024-05-15"
};

const subscriptions = [
  {
    id: 1,
    subscriptionPlan: "Premium Plan",
    subscriptionPeriod: "Monthly",
    planStatus: "active",
    payMode: "Credit Card",
    planAmount: "$99.99"
  },
  {
    id: 2,
    subscriptionPlan: "Basic Plan",
    subscriptionPeriod: "Yearly",
    planStatus: "cancelled",
    payMode: "PayPal",
    planAmount: "$599.99"
  }
];

const payments = [
  {
    id: 1,
    paymentDate: "2024-05-15",
    paymentStatus: "completed",
    planName: "Premium Plan",
    planDuration: "Monthly",
    amount: "$99.99"
  },
  {
    id: 2,
    paymentDate: "2024-04-15",
    paymentStatus: "completed",
    planName: "Premium Plan",
    planDuration: "Monthly",
    amount: "$99.99"
  },
  {
    id: 3,
    paymentDate: "2024-03-15",
    paymentStatus: "failed",
    planName: "Premium Plan",
    planDuration: "Monthly",
    amount: "$99.99"
  }
];

const plans = [
  {
    id: "basic",
    name: "Basic Plan",
    hotels: 2,
    investors: 50,
    monthlyPrice: "$29.99",
    yearlyPrice: "$299.99"
  },
  {
    id: "premium",
    name: "Premium Plan",
    hotels: 5,
    investors: 100,
    monthlyPrice: "$99.99",
    yearlyPrice: "$999.99"
  },
  {
    id: "enterprise",
    name: "Enterprise Plan",
    hotels: "Unlimited",
    investors: "Unlimited",
    monthlyPrice: "$199.99",
    yearlyPrice: "$1999.99"
  }
];

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState("premium");
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const { toast } = useToast();

  const handleUpdateBillingInfo = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Update billing info submitted");
    toast({
      title: "Payment Information Updated",
      description: "Your payment information has been successfully updated.",
    });
  };

  const handleChangePlan = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Change plan submitted", { selectedPlan, billingPeriod });
    toast({
      title: "Plan Changed",
      description: "Your subscription plan has been successfully updated.",
    });
  };

  const handleCancelSubscription = () => {
    console.log("Cancel subscription confirmed");
    toast({
      title: "Subscription Cancelled",
      description: "Your subscription has been cancelled. You will have access until the end of your billing period.",
      variant: "destructive",
    });
  };

  const handleDownloadReceipt = (paymentId: number) => {
    console.log(`Download receipt for payment ${paymentId}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Subscription</h1>
            <p className="text-muted-foreground">
              Manage your subscription plans and billing information
            </p>
          </div>
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <CreditCard size={16} className="mr-2" />
                  Update Payment Info
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Update Payment Information</SheetTitle>
                  <SheetDescription>
                    Update your billing name and payment card details
                  </SheetDescription>
                </SheetHeader>

                {/* Current Billing Information Section */}
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h3 className="text-sm font-medium mb-3">Current Billing Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Billing Name:</span>
                      <span className="font-medium">John Smith</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Card Number:</span>
                      <span className="font-medium">**** **** **** 3456</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expiry:</span>
                      <span className="font-medium">01/2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Card Type:</span>
                      <span className="font-medium">Visa</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleUpdateBillingInfo} className="space-y-6 mt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="billingFullName">Billing Full Name</Label>
                      <Input id="billingFullName" defaultValue="John Smith" />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Credit Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        onChange={(e) => {
                          // Format card number with spaces
                          const value = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
                          e.target.value = value;
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv" 
                          placeholder="123"
                          maxLength={4}
                          onChange={(e) => {
                            // Only allow numbers
                            const value = e.target.value.replace(/\D/g, '');
                            e.target.value = value;
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiryMonth">Expiry Month</Label>
                        <Select defaultValue="01">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="01">01</SelectItem>
                            <SelectItem value="02">02</SelectItem>
                            <SelectItem value="03">03</SelectItem>
                            <SelectItem value="04">04</SelectItem>
                            <SelectItem value="05">05</SelectItem>
                            <SelectItem value="06">06</SelectItem>
                            <SelectItem value="07">07</SelectItem>
                            <SelectItem value="08">08</SelectItem>
                            <SelectItem value="09">09</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="11">11</SelectItem>
                            <SelectItem value="12">12</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiryYear">Expiry Year</Label>
                        <Select defaultValue="2024">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2025">2025</SelectItem>
                            <SelectItem value="2026">2026</SelectItem>
                            <SelectItem value="2027">2027</SelectItem>
                            <SelectItem value="2028">2028</SelectItem>
                            <SelectItem value="2029">2029</SelectItem>
                            <SelectItem value="2030">2030</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Update Payment Information
                  </Button>
                </form>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <Tabs defaultValue="subscription" className="space-y-4">
          <TabsList>
            <TabsTrigger value="subscription">
              <Calendar className="h-4 w-4 mr-2" />
              Subscription
            </TabsTrigger>
            <TabsTrigger value="payments">
              <DollarSign className="h-4 w-4 mr-2" />
              Payments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="subscription" className="space-y-8">
            {/* Latest Subscription Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar size={20} />
                  Latest Subscription
                </CardTitle>
                <CardDescription>
                  Your current active subscription details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Plan Name</p>
                    <p className="text-lg font-semibold">{latestSubscription.planType}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Plan Amount</p>
                    <p className="text-lg font-semibold text-green-600">{latestSubscription.planAmount}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Next Billing Date</p>
                    <p className="text-lg font-semibold">{latestSubscription.nextBillingDate}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Subscription ID</p>
                    <p className="text-lg font-mono">{latestSubscription.subscriptionId}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Plan Status</p>
                    <Badge variant={latestSubscription.planStatus === "active" ? "default" : "secondary"} 
                           className={latestSubscription.planStatus === "active" ? "bg-green-500 hover:bg-green-600" : ""}>
                      {latestSubscription.planStatus === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Last Paid Amount</p>
                    <p className="text-lg font-semibold text-blue-600">{latestSubscription.lastPayedAmount}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Last Payment Date</p>
                    <p className="text-lg font-semibold">{latestSubscription.lastPaymentDate}</p>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 mt-6 pt-6 border-t">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">
                        <Settings size={16} className="mr-2" />
                        Change Plan
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Change Subscription Plan</SheetTitle>
                        <SheetDescription>
                          Choose a different plan that fits your needs
                        </SheetDescription>
                      </SheetHeader>
                      <form onSubmit={handleChangePlan} className="space-y-6 mt-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Select Plan</Label>
                            <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                              {plans.map((plan) => (
                                <div key={plan.id} className="flex items-center space-x-2 p-4 border rounded-lg">
                                  <RadioGroupItem value={plan.id} id={plan.id} />
                                  <div className="flex-1">
                                    <Label htmlFor={plan.id} className="font-medium">
                                      {plan.name}
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                      {plan.hotels} Hotels, {plan.investors} Investors
                                    </p>
                                    <p className="text-sm font-medium">
                                      {billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                                      /{billingPeriod === "monthly" ? "month" : "year"}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                          <div className="space-y-2">
                            <Label>Billing Period</Label>
                            <RadioGroup value={billingPeriod} onValueChange={setBillingPeriod}>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="monthly" id="monthly" />
                                <Label htmlFor="monthly">Monthly</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yearly" id="yearly" />
                                <Label htmlFor="yearly">Yearly (Save 17%)</Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                        <Button type="submit" className="w-full">
                          Change Plan
                        </Button>
                      </form>
                    </SheetContent>
                  </Sheet>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        Cancel Subscription
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to cancel your subscription?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action will cancel your subscription. You will continue to have access to your account until the end of your current billing period ({latestSubscription.nextBillingDate}). This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={handleCancelSubscription}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Yes, Cancel Subscription
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>

            {/* Subscriptions Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText size={20} />
                  Subscriptions
                </CardTitle>
                <CardDescription>
                  All your subscription plans history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subscription Plan</TableHead>
                        <TableHead>Subscription Period</TableHead>
                        <TableHead>Plan Status</TableHead>
                        <TableHead>Pay Mode</TableHead>
                        <TableHead>Plan Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subscriptions.map((subscription) => (
                        <TableRow key={subscription.id}>
                          <TableCell className="font-medium">{subscription.subscriptionPlan}</TableCell>
                          <TableCell>{subscription.subscriptionPeriod}</TableCell>
                          <TableCell>
                            <Badge variant={subscription.planStatus === "active" ? "default" : "secondary"} 
                                   className={subscription.planStatus === "active" ? "bg-green-500 hover:bg-green-600" : ""}>
                              {subscription.planStatus === "active" ? "Active" : "Cancelled"}
                            </Badge>
                          </TableCell>
                          <TableCell>{subscription.payMode}</TableCell>
                          <TableCell className="font-semibold">{subscription.planAmount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            {/* Payments Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign size={20} />
                  Payments
                </CardTitle>
                <CardDescription>
                  Your payment history and receipts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payment Date</TableHead>
                        <TableHead>Payment Status</TableHead>
                        <TableHead>Plan Name</TableHead>
                        <TableHead>Plan Duration</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>{payment.paymentDate}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={payment.paymentStatus === "completed" ? "default" : "destructive"}
                              className={payment.paymentStatus === "completed" ? "bg-green-500 hover:bg-green-600" : ""}
                            >
                              {payment.paymentStatus === "completed" ? "Completed" : payment.paymentStatus === "failed" ? "Failed" : payment.paymentStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>{payment.planName}</TableCell>
                          <TableCell>{payment.planDuration}</TableCell>
                          <TableCell className="font-semibold">{payment.amount}</TableCell>
                          <TableCell className="text-right">
                            {payment.paymentStatus === "completed" && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDownloadReceipt(payment.id)}
                              >
                                <Download size={14} className="mr-1" />
                                Download Receipt
                              </Button>
                            )}
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
      </div>
    </DashboardLayout>
  );
};

export default Subscription;
