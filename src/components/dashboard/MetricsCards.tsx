
import { Building2, Users, DollarSign, FileText, Bed, TrendingUp, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface MetricsCardsProps {
  selectedHotel: string;
}

const MetricsCards = ({ selectedHotel }: MetricsCardsProps) => {
  const navigate = useNavigate();

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

  const handleHotelsClick = () => {
    navigate("/portfolio-hotels");
    toast.success("Redirecting to hotels");
  };

  const handleInvestorsClick = () => {
    navigate("/portfolio-investors");
    toast.success("Redirecting to investors");
  };

  const handleAddHotel = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate("/portfolio-hotels");
    toast.success("Redirecting to add new hotel");
  };

  const handleAddInvestor = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate("/portfolio-investors");
    toast.success("Redirecting to add new investor");
  };

  const cards = [
    {
      title: "Hotels",
      value: metrics.totalHotels.toString(),
      description: "Total properties",
      icon: Building2,
      trend: null,
      clickable: true,
      onClick: handleHotelsClick,
      onAddClick: handleAddHotel
    },
    {
      title: "Investors",
      value: metrics.totalInvestors.toString(),
      description: selectedHotel === "all" ? "Across all hotels" : "In this hotel",
      icon: Users,
      trend: { value: "+12.5%", positive: true },
      clickable: true,
      onClick: handleInvestorsClick,
      onAddClick: handleAddInvestor
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
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 w-full">
      {cards.map((card, index) => (
        <Card 
          key={index} 
          className={`relative ${card.clickable ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
          onClick={card.onClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <div className="flex items-center gap-2">
              <card.icon className="h-4 w-4 text-muted-foreground" />
              {card.onAddClick && (
                <button
                  onClick={card.onAddClick}
                  className="h-6 w-6 rounded-full bg-brand-purple hover:bg-brand-purple-dark text-white flex items-center justify-center transition-colors"
                  title="Add More"
                >
                  <Plus className="h-3 w-3" />
                </button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            {card.trend && (
              <span className={`text-xs ${card.trend.positive ? 'text-green-500' : 'text-red-500'}`}>
                {card.trend.value}
              </span>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsCards;
