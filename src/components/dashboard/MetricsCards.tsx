
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
      icon: Building2,
      clickable: true,
      onClick: handleHotelsClick,
      onAddClick: handleAddHotel
    },
    {
      title: "Investors",
      value: metrics.totalInvestors.toString(),
      icon: Users,
      clickable: true,
      onClick: handleInvestorsClick,
      onAddClick: handleAddInvestor
    },
    {
      title: "Monthly Revenue",
      value: `$${metrics.monthlyRevenue.toLocaleString()}`,
      icon: DollarSign
    },
    {
      title: "Revenue Entries",
      value: `${metrics.revenueEntries.audited}/${metrics.revenueEntries.expected}`,
      icon: FileText
    },
    {
      title: "Avg Occupancy",
      value: `${metrics.avgOccupancy}%`,
      icon: Bed
    },
    {
      title: "Avg Daily Rate",
      value: `$${metrics.avgDailyRate}`,
      icon: TrendingUp
    }
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 w-full">
      {cards.map((card, index) => (
        <Card 
          key={index} 
          className={`relative ${card.clickable ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
          onClick={card.onClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
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
          <CardContent className="pb-4">
            <div className="text-xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsCards;
