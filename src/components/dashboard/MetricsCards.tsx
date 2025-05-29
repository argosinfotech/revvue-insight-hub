
import { Building2, Users, DollarSign, FileText, Bed, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricsCardsProps {
  selectedHotel: string;
}

const MetricsCards = ({ selectedHotel }: MetricsCardsProps) => {
  // Mock data - in real app this would come from props or API
  const metrics = {
    totalHotels: selectedHotel === "all" ? 3 : 1,
    totalInvestors: selectedHotel === "all" ? 48 : 16,
    monthlyRevenue: selectedHotel === "all" ? 124500 : 45600,
    revenueEntries: {
      audited: selectedHotel === "all" ? 89 : 30,
      expected: selectedHotel === "all" ? 92 : 31
    },
    avgOccupancy: selectedHotel === "all" ? 78 : 82,
    avgDailyRate: selectedHotel === "all" ? 285 : 295
  };

  const cards = [
    {
      title: "Hotels",
      value: metrics.totalHotels.toString(),
      description: "Total properties",
      icon: Building2,
      trend: null
    },
    {
      title: "Investors",
      value: metrics.totalInvestors.toString(),
      description: selectedHotel === "all" ? "Across all hotels" : "In this hotel",
      icon: Users,
      trend: { value: "+12.5%", positive: true }
    },
    {
      title: "Monthly Revenue",
      value: `$${metrics.monthlyRevenue.toLocaleString()}`,
      description: "From hotels",
      icon: DollarSign,
      trend: { value: "+8.2%", positive: true }
    },
    {
      title: "Revenue Entries",
      value: `${metrics.revenueEntries.audited}/${metrics.revenueEntries.expected}`,
      description: "Audited/Expected",
      icon: FileText,
      trend: { value: `${Math.round((metrics.revenueEntries.audited / metrics.revenueEntries.expected) * 100)}%`, positive: true }
    },
    {
      title: "Avg Occupancy",
      value: `${metrics.avgOccupancy}%`,
      description: selectedHotel === "all" ? "All properties" : "This property",
      icon: Bed,
      trend: { value: "+2.1%", positive: true }
    },
    {
      title: "Avg Daily Rate",
      value: `$${metrics.avgDailyRate}`,
      description: selectedHotel === "all" ? "All properties" : "This property",
      icon: TrendingUp,
      trend: { value: "+5.8%", positive: true }
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <div className="flex items-center space-x-1 mt-1">
              {card.trend && (
                <span className={`text-xs ${card.trend.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {card.trend.value}
                </span>
              )}
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsCards;
