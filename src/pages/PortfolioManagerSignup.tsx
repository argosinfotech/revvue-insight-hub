import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Check, Building2, Phone, User, Mail } from "lucide-react";
import { Link } from "react-router-dom";

interface PackageData {
  id: string;
  name: string;
  description: string;
  hotelBaseFee: string;
  investorFee: string;
  isActive: boolean;
}

// Sample packages data (in real app, this would come from an API)
const availablePackages: PackageData[] = [
  {
    id: "1",
    name: "Standard Package",
    description: "Basic package for small hotels",
    hotelBaseFee: "10.00",
    investorFee: "2.00",
    isActive: true,
  },
  {
    id: "2", 
    name: "Premium Package",
    description: "Advanced features for growing hotels",
    hotelBaseFee: "25.00",
    investorFee: "3.50",
    isActive: true,
  }
];

const PortfolioManagerSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    organizationName: "",
    phoneNumber: "",
    email: "",
    selectedPackage: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName.trim()) {
      toast.error("First name is required");
      return;
    }
    
    if (!formData.lastName.trim()) {
      toast.error("Last name is required");
      return;
    }
    
    if (!formData.organizationName.trim()) {
      toast.error("Organization name is required");
      return;
    }
    
    if (!formData.phoneNumber.trim()) {
      toast.error("Phone number is required");
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }
    
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    if (!formData.selectedPackage) {
      toast.error("Please select a package");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Registration successful! Welcome to RevVue Insight Hub.");
      
      // Redirect to portfolio manager hotels page
      navigate("/portfolio-hotels");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPackageData = availablePackages.find(pkg => pkg.id === formData.selectedPackage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Portfolio Manager Registration
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose your package and create your account
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Package Selection */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Choose Your Package</CardTitle>
                <CardDescription>
                  Select the subscription package that best fits your needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={formData.selectedPackage} 
                  onValueChange={(value) => setFormData({...formData, selectedPackage: value})}
                  className="space-y-4"
                >
                  {availablePackages.filter(pkg => pkg.isActive).map((pkg) => (
                    <div key={pkg.id} className="relative">
                      <div className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        formData.selectedPackage === pkg.id 
                          ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem value={pkg.id} id={pkg.id} className="mt-1" />
                          <div className="flex-1">
                            <label htmlFor={pkg.id} className="cursor-pointer">
                              <h3 className="text-lg font-semibold mb-1">{pkg.name}</h3>
                              <p className="text-sm text-muted-foreground mb-3">
                                {pkg.description}
                              </p>
                              <div className="space-y-1">
                                <p className="text-sm">
                                  <span className="font-medium">Base Fee:</span> ${pkg.hotelBaseFee}/month per hotel
                                </p>
                                <p className="text-sm">
                                  <span className="font-medium">Investor Fee:</span> ${pkg.investorFee}/month per investor
                                </p>
                              </div>
                            </label>
                          </div>
                          {formData.selectedPackage === pkg.id && (
                            <Check className="h-5 w-5 text-primary mt-1" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Pricing Example */}
            {selectedPackageData && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pricing Example</CardTitle>
                  <CardDescription>
                    For a hotel with 10 investors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Base Fee:</span>
                      <span>${selectedPackageData.hotelBaseFee}/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Investor Fee (10 × ${selectedPackageData.investorFee}):</span>
                      <span>${(parseFloat(selectedPackageData.investorFee) * 10).toFixed(2)}/month</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>Total Monthly Cost:</span>
                      <span>${(parseFloat(selectedPackageData.hotelBaseFee) + parseFloat(selectedPackageData.investorFee) * 10).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Registration Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Registration Information</CardTitle>
                <CardDescription>
                  Enter your details to create your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          className="pl-10"
                          placeholder="John"
                          maxLength={50}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          className="pl-10"
                          placeholder="Doe"
                          maxLength={50}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organizationName">Organization Name *</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="organizationName"
                        type="text"
                        value={formData.organizationName}
                        onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                        className="pl-10"
                        placeholder="Your Company Name"
                        maxLength={100}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                        className="pl-10"
                        placeholder="+1 (555) 123-4567"
                        maxLength={20}
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Phone number must be unique across all accounts
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="pl-10"
                        placeholder="john@company.com"
                        maxLength={100}
                        required
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-brand-purple hover:bg-brand-purple-dark"
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioManagerSignup;
