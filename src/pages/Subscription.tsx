
import { useState } from "react";
import { CreditCard, Download, Calendar, DollarSign, FileText, Settings } from "lucide-react";
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

// Sample data
const latestSubscription = {
  planType: "Premium Plan (5 Hotels, 100 Investors)",
  planAmount: "$99.99",
  nextBillingDate: "2024-06-15",
  subscriptionId: "sub_1234567890",
  planStatus: "active",
  planId: "plan_premium_001",
  contactName: "John Smith",
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

const Subscription = () => {
  const handleUpdateBillingInfo = () => {
    console.log("Update billing info clicked");
  };

  const handleChangePlan = () => {
    console.log("Change plan clicked");
  };

  const handleChangePaymentMethod = () => {
    console.log("Change payment method clicked");
  };

  const handleCancelSubscription = () => {
    console.log("Cancel subscription clicked");
  };

  const handleDownloadReceipt = (paymentId: number) => {
    console.log(`Download receipt for payment ${paymentId}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscription Management</h1>
          <p className="text-muted-foreground">
            Manage your subscription plans and billing information
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleUpdateBillingInfo}>
            <CreditCard size={16} className="mr-2" />
            Update Billing Info
          </Button>
          <Button variant="outline" onClick={handleChangePlan}>
            <Settings size={16} className="mr-2" />
            Change Plan
          </Button>
          <Button variant="outline" onClick={handleChangePaymentMethod}>
            <CreditCard size={16} className="mr-2" />
            Change Payment Method
          </Button>
          <Button variant="destructive" onClick={handleCancelSubscription}>
            Cancel Subscription
          </Button>
        </div>
      </div>

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
              <p className="text-sm font-medium text-muted-foreground">Plan Type</p>
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
              <p className="text-sm font-medium text-muted-foreground">Plan ID</p>
              <p className="text-lg font-mono">{latestSubscription.planId}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Contact Name</p>
              <p className="text-lg font-semibold">{latestSubscription.contactName}</p>
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
    </div>
  );
};

export default Subscription;
