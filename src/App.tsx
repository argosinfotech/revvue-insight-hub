
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

// Pages
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Hotels from "@/pages/Hotels";
import Investors from "@/pages/Investors";
import Billing from "@/pages/Billing";
import NotFound from "@/pages/NotFound";
import PortfolioManagerSignup from "@/pages/PortfolioManagerSignup";
import PortfolioManagerHotels from "@/pages/PortfolioManagerHotels";
import PortfolioRevenueDashboard from "@/pages/PortfolioRevenueDashboard";
import PortfolioInvestors from "@/pages/PortfolioInvestors";
import PortfolioSettings from "@/pages/PortfolioSettings";
import Activity from "@/pages/Activity";
import Users from "@/pages/Users";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/portfolio-signup" element={<PortfolioManagerSignup />} />
          
          {/* Portfolio Manager Routes */}
          <Route path="/portfolio-hotels" element={<PortfolioManagerHotels />} />
          <Route path="/portfolio-dashboard" element={<PortfolioRevenueDashboard />} />
          <Route path="/portfolio-investors" element={<PortfolioInvestors />} />
          <Route path="/portfolio-settings" element={<PortfolioSettings />} />
          
          {/* Admin Routes */}
          <Route 
            path="/dashboard" 
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            } 
          />
          
          <Route 
            path="/hotels" 
            element={
              <DashboardLayout>
                <Hotels />
              </DashboardLayout>
            } 
          />
          
          <Route 
            path="/investors" 
            element={
              <DashboardLayout>
                <Investors />
              </DashboardLayout>
            } 
          />
          
          <Route 
            path="/billing" 
            element={
              <DashboardLayout>
                <Billing />
              </DashboardLayout>
            } 
          />
          
          {/* Activity page with proper component */}
          <Route 
            path="/activity" 
            element={
              <DashboardLayout>
                <Activity />
              </DashboardLayout>
            } 
          />
          
          {/* Users management page */}
          <Route 
            path="/users" 
            element={
              <DashboardLayout>
                <Users />
              </DashboardLayout>
            } 
          />
          
          <Route 
            path="/notifications" 
            element={
              <DashboardLayout>
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Notifications Settings</h1>
                    <p className="text-muted-foreground">This page is under construction.</p>
                  </div>
                </div>
              </DashboardLayout>
            } 
          />
          
          <Route 
            path="/settings" 
            element={
              <DashboardLayout>
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Admin Settings</h1>
                    <p className="text-muted-foreground">This page is under construction.</p>
                  </div>
                </div>
              </DashboardLayout>
            } 
          />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
