
import { useState } from "react";
import { Users, Mail, Phone, DollarSign, Search, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardLayout from "@/components/DashboardLayout";

interface Investor {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalInvestment: number;
  hotels: string[];
  investmentPercentage: number;
  joinDate: string;
  status: "active" | "pending" | "inactive";
}

const PortfolioInvestors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for demonstration
  const investors: Investor[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      totalInvestment: 250000,
      hotels: ["Grand Plaza Hotel", "City Center Inn"],
      investmentPercentage: 35,
      joinDate: "2023-06-15",
      status: "active"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 987-6543",
      totalInvestment: 180000,
      hotels: ["Sunset Resort"],
      investmentPercentage: 45,
      joinDate: "2023-08-22",
      status: "active"
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael.brown@email.com",
      phone: "+1 (555) 456-7890",
      totalInvestment: 120000,
      hotels: ["Grand Plaza Hotel"],
      investmentPercentage: 20,
      joinDate: "2023-09-10",
      status: "pending"
    }
  ];

  const filteredInvestors = investors.filter(investor =>
    investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    investor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalInvestors = investors.length;
  const activeInvestors = investors.filter(inv => inv.status === "active").length;
  const totalInvestment = investors.reduce((sum, inv) => sum + inv.totalInvestment, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Investors</h1>
            <p className="text-muted-foreground">Manage your investor relationships</p>
          </div>
          <Button className="bg-brand-purple hover:bg-brand-purple-dark">
            <Users className="h-4 w-4 mr-2" />
            Invite Investor
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalInvestors}</div>
              <p className="text-xs text-muted-foreground">
                {activeInvestors} active investors
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalInvestment.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Across all properties
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Investment</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${Math.round(totalInvestment / totalInvestors).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Per investor
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search investors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Investors List */}
        <div className="space-y-4">
          {filteredInvestors.map((investor) => (
            <Card key={investor.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="" />
                      <AvatarFallback>
                        {investor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{investor.name}</h3>
                        <Badge className={getStatusColor(investor.status)}>
                          {investor.status}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          {investor.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          {investor.phone}
                        </div>
                      </div>
                      <div className="pt-2">
                        <p className="text-sm font-medium">Invested Properties:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {investor.hotels.map((hotel, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {hotel}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div>
                      <p className="text-2xl font-bold">${investor.totalInvestment.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Total Investment</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{investor.investmentPercentage}%</p>
                      <p className="text-xs text-muted-foreground">Average Share</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Joined {new Date(investor.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInvestors.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Investors Found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "No investors match your search criteria." : "You haven't added any investors yet."}
              </p>
              {!searchTerm && (
                <Button className="bg-brand-purple hover:bg-brand-purple-dark">
                  <Users className="h-4 w-4 mr-2" />
                  Invite Your First Investor
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PortfolioInvestors;
