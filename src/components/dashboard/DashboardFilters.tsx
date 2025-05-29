
import { useState } from "react";
import { Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardFiltersProps {
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
  onHotelChange: (hotelId: string) => void;
  selectedHotel: string;
}

const DashboardFilters = ({ onDateRangeChange, onHotelChange, selectedHotel }: DashboardFiltersProps) => {
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date()
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
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-wrap gap-4">
          {/* Date Range */}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">Date Range:</span>
            <input
              type="date"
              value={dateRange.from.toISOString().split('T')[0]}
              onChange={(e) => handleDateRangeChange('from', e.target.value)}
              className="px-3 py-1 border rounded-md text-sm"
            />
            <span className="text-sm text-muted-foreground">to</span>
            <input
              type="date"
              value={dateRange.to.toISOString().split('T')[0]}
              onChange={(e) => handleDateRangeChange('to', e.target.value)}
              className="px-3 py-1 border rounded-md text-sm"
            />
          </div>

          {/* Hotel Selection */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Hotel:</span>
            <Select value={selectedHotel} onValueChange={onHotelChange}>
              <SelectTrigger className="w-48">
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
