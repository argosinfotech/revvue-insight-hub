import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Eye, EyeOff, Shield, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/DashboardLayout";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validatePassword = (password: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[A-Z]/, text: "One uppercase letter" },
      { regex: /[a-z]/, text: "One lowercase letter" },
      { regex: /\d/, text: "One number" },
      { regex: /[!@#$%^&*(),.?":{}|<>]/, text: "One special character" }
    ];

    return requirements.map(req => ({
      ...req,
      met: req.regex.test(password)
    }));
  };

  const passwordRequirements = validatePassword(formData.newPassword);
  const allRequirementsMet = passwordRequirements.every(req => req.met);
  const passwordsMatch = formData.newPassword === formData.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!allRequirementsMet) {
      toast.error("Please ensure your password meets all requirements");
      return;
    }

    if (!passwordsMatch) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Password changed successfully");
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Change Password</h1>
          <p className="text-muted-foreground">
            Update your password to keep your account secure
          </p>
        </div>

        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Please enter your current password and choose a new one
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Current Password */}
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="currentPassword"
                      type={showPasswords.current ? "text" : "password"}
                      value={formData.currentPassword}
                      onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                      placeholder="Enter your current password"
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => togglePasswordVisibility('current')}
                    >
                      {showPasswords.current ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="newPassword"
                      type={showPasswords.new ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={(e) => handleInputChange('newPassword', e.target.value)}
                      placeholder="Enter your new password"
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => togglePasswordVisibility('new')}
                    >
                      {showPasswords.new ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {/* Password Requirements */}
                  {formData.newPassword && (
                    <div className="mt-3 space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Password Requirements:</p>
                      <div className="grid gap-1">
                        {passwordRequirements.map((req, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            {req.met ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-gray-400" />
                            )}
                            <span className={cn(
                              req.met ? "text-green-700" : "text-gray-500"
                            )}>
                              {req.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showPasswords.confirm ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirm your new password"
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => togglePasswordVisibility('confirm')}
                    >
                      {showPasswords.confirm ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {/* Password Match Indicator */}
                  {formData.confirmPassword && (
                    <div className="flex items-center gap-2 text-sm">
                      {passwordsMatch ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-green-700">Passwords match</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span className="text-red-700">Passwords do not match</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={!allRequirementsMet || !passwordsMatch || isLoading}
                    className="bg-brand-purple hover:bg-brand-purple-dark"
                  >
                    {isLoading ? "Changing..." : "Change Password"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChangePassword;
