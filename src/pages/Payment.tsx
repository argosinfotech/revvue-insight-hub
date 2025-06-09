
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { CreditCard, User, Building2, Mail, Phone } from "lucide-react";

const paymentSchema = z.object({
  cardNumber: z.string().min(16, "Card number must be 16 digits"),
  expiryDate: z.string().min(5, "Expiry date is required (MM/YY)"),
  cvv: z.string().min(3, "CVV must be 3 digits"),
  cardholderName: z.string().min(1, "Cardholder name is required"),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PackageData {
  id: string;
  name: string;
  description: string;
  hotelBaseFee: string;
  investorFee: string;
}

// Sample packages data
const availablePackages: PackageData[] = [
  {
    id: "1",
    name: "Standard Package",
    description: "Basic package for small hotels",
    hotelBaseFee: "10.00",
    investorFee: "2.00",
  },
  {
    id: "2", 
    name: "Premium Package",
    description: "Advanced features for growing hotels",
    hotelBaseFee: "25.00",
    investorFee: "3.50",
  }
];

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  const selectedPackageId = location.state?.selectedPackage;
  const userInfo = location.state?.userInfo;
  
  const selectedPackage = availablePackages.find(pkg => pkg.id === selectedPackageId);

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
    }
  });

  useEffect(() => {
    if (!selectedPackage || !userInfo) {
      toast.error("Invalid access. Please complete registration first.");
      navigate("/portfolio-manager-signup");
    }
  }, [selectedPackage, userInfo, navigate]);

  const onPaymentSubmit = async (data: PaymentFormData) => {
    setIsProcessingPayment(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Payment successful! Your subscription is now active.");
      
      // Redirect to dashboard or success page
      navigate("/portfolio-dashboard");
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  if (!selectedPackage || !userInfo) {
    return null;
  }

  // Calculate example pricing
  const baseFeeMontly = parseFloat(selectedPackage.hotelBaseFee);
  const investorFeeMonthly = parseFloat(selectedPackage.investorFee) * 10; // Example: 10 investors
  const totalMonthly = baseFeeMontly + investorFeeMonthly;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Payment
          </h1>
          <p className="text-lg text-muted-foreground">
            Finalize your subscription and start managing your portfolio
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Summary
                </CardTitle>
                <CardDescription>
                  Review your subscription details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Selected Package */}
                <div className="border rounded-lg p-4 bg-primary/5">
                  <h3 className="text-lg font-semibold mb-1">{selectedPackage.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {selectedPackage.description}
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Base Fee:</span> ${selectedPackage.hotelBaseFee}/month per hotel
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Investor Fee:</span> ${selectedPackage.investorFee}/month per investor
                    </p>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-4">
                  <h4 className="font-medium">Pricing Example (10 investors):</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Base Fee:</span>
                      <span>${selectedPackage.hotelBaseFee}/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Investor Fee (10 × ${selectedPackage.investorFee}):</span>
                      <span>${investorFeeMonthly.toFixed(2)}/month</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total Monthly Cost:</span>
                      <span className="text-primary">${totalMonthly.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Account Details */}
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Account Details:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{userInfo.firstName} {userInfo.lastName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{userInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{userInfo.organizationName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{userInfo.phoneNumber}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>
                  Enter your card information to complete the subscription
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onPaymentSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="cardholderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cardholder Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Doe" 
                              {...field} 
                              defaultValue={`${userInfo.firstName} ${userInfo.lastName}`}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="1234 5678 9012 3456" 
                              maxLength={19} 
                              {...field}
                              onChange={(e) => {
                                // Format card number with spaces
                                const value = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="expiryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="MM/YY" 
                                maxLength={5} 
                                {...field}
                                onChange={(e) => {
                                  // Format expiry date
                                  const value = e.target.value.replace(/\D/g, '').replace(/(.{2})/, '$1/');
                                  field.onChange(value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cvv"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVV</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="123" 
                                maxLength={4} 
                                {...field}
                                onChange={(e) => {
                                  // Only allow numbers
                                  const value = e.target.value.replace(/\D/g, '');
                                  field.onChange(value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <Button 
                        type="submit" 
                        className="w-full bg-brand-purple hover:bg-brand-purple-dark text-lg py-6"
                        disabled={isProcessingPayment}
                      >
                        {isProcessingPayment ? "Processing Payment..." : `Pay Now - $${totalMonthly.toFixed(2)}/month`}
                      </Button>
                      
                      <p className="text-xs text-center text-muted-foreground">
                        By completing this payment, you agree to our terms of service and privacy policy. 
                        Your subscription will renew automatically each month.
                      </p>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
