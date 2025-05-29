
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes, simple validation with role-based routing
      if (email === "admin@example.com" && password === "password") {
        sessionStorage.setItem('userRole', 'admin');
        toast.success("Admin login successful");
        navigate("/dashboard");
      } else if (email === "manager@example.com" && password === "password") {
        sessionStorage.setItem('userRole', 'portfolio-manager');
        toast.success("Portfolio Manager login successful");
        navigate("/portfolio-hotels");
      } else if (email === "staff@example.com" && password === "password") {
        sessionStorage.setItem('userRole', 'hotel-staff');
        toast.success("Hotel Staff login successful");
        navigate("/staff-dashboard");
      } else if (email.includes("@") && password.length >= 6) {
        // Generic Portfolio Manager login (for registered users)
        sessionStorage.setItem('userRole', 'portfolio-manager');
        toast.success("Portfolio Manager login successful");
        navigate("/portfolio-hotels");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("An error occurred during login");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">RevVue Insight Hub</h1>
          <p className="mt-2 text-sm text-gray-600">
            Hotel Investment Revenue Tracker
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md border">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-sm font-medium text-brand-purple hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Remember me
              </Label>
            </div>
            <Button type="submit" className="w-full bg-brand-purple hover:bg-brand-purple-dark" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Demo Accounts:</strong>
            </p>
            <p className="text-xs text-gray-500 mb-1">
              Admin: admin@example.com / password
            </p>
            <p className="text-xs text-gray-500 mb-1">
              Portfolio Manager: manager@example.com / password
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Hotel Staff: staff@example.com / password
            </p>
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link 
                to="/portfolio-signup" 
                className="font-medium text-brand-purple hover:underline"
              >
                Sign up as Portfolio Manager
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
