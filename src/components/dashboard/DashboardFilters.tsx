
import { useState } from "react";
import { Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardFiltersProps {
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
  onHotelChange: (hotelId: string) => void;
  selectedHotel: string;
}

const DashboardFilters = ({ onDateRangeChange, onHotelChange, selectedHotel }: DashboardFiltersProps) => {
  const today = new Date();
  const [dateRange, setDateRange] = useState({
    from: today,
    to: today
  });

  // Mock hotels data
  const hotels = [
    { id: "all", name: "All Hotels" },
    { id: "1", name: "Grand Plaza Hotel" },
    { id: "2", name: "Sunset Resort" },
    { id: "3", name: "City Center Inn" }
  ];

  const handleDateRangeChange = (type: 'from' | 'to', date: string) => {
    const newDate = new Date(date);
    const newRange = { ...dateRange, [type]: newDate };
    setDateRange(newRange);
    onDateRangeChange(newRange);
  };

  return (
    <Card className="bg-gray-50 border-none">
      <CardContent className="pt-4 pb-4">
        <div className="flex flex-wrap gap-3 items-center text-sm">
          {/* Date Range - Compact */}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <input
              type="date"
              value={dateRange.from.toISOString().split('T')[0]}
              onChange={(e) => handleDateRangeChange('from', e.target.value)}
              className="px-2 py-1 border rounded text-xs w-32"
            />
            <span className="text-xs text-muted-foreground">to</span>
            <input
              type="date"
              value={dateRange.to.toISOString().split('T')[0]}
              onChange={(e) => handleDateRangeChange('to', e.target.value)}
              className="px-2 py-1 border rounded text-xs w-32"
            />
          </div>

          {/* Hotel Selection - Compact */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Hotel:</span>
            <Select value={selectedHotel} onValueChange={onHotelChange}>
              <SelectTrigger className="w-36 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {hotels.map((hotel) => (
                  <SelectItem key={hotel.id} value={hotel.id}>
                    {hotel.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardFilters;
