
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Hotels from "@/pages/Hotels";
import Investors from "@/pages/Investors";
import Billing from "@/pages/Billing";
import Activity from "@/pages/Activity";
import Users from "@/pages/Users";
import Notifications from "@/pages/Notifications";
import NotFound from "@/pages/NotFound";
import PortfolioManagerSignup from "@/pages/PortfolioManagerSignup";
import Payment from "@/pages/Payment";
import PortfolioDashboard from "@/pages/PortfolioDashboard";
import PortfolioManagerHotels from "@/pages/PortfolioManagerHotels";
import PortfolioInvestors from "@/pages/PortfolioInvestors";
import PortfolioStaffs from "@/pages/PortfolioStaffs";
import Subscription from "@/pages/Subscription";
import PortfolioSettings from "@/pages/PortfolioSettings";
import StaffDashboard from "@/pages/StaffDashboard";
import MyEntries from "@/pages/MyEntries";
import Profile from "@/pages/Profile";
import ChangePassword from "@/pages/ChangePassword";
import Revenue from "@/pages/Revenue";
import PortfolioManagers from "@/pages/PortfolioManagers";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/portfolio-manager-signup" element={<PortfolioManagerSignup />} />
          <Route path="/payment" element={<Payment />} />
          
          {/* Admin routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portfolio-managers" element={<PortfolioManagers />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<PortfolioSettings />} />
          
          {/* Portfolio Manager routes */}
          <Route path="/portfolio-dashboard" element={<PortfolioDashboard />} />
          <Route path="/portfolio-hotels" element={<PortfolioManagerHotels />} />
          <Route path="/revenue" element={<Revenue />} />
          <Route path="/portfolio-investors" element={<PortfolioInvestors />} />
          <Route path="/portfolio-staffs" element={<PortfolioStaffs />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/portfolio-settings" element={<PortfolioSettings />} />
          
          {/* Hotel Staff routes */}
          <Route path="/staff-dashboard" element={<StaffDashboard />} />
          <Route path="/my-entries" element={<MyEntries />} />
          
          {/* Common routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
