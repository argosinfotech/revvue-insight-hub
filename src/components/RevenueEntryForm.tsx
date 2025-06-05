
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const revenueEntrySchema = z.object({
  hotelId: z.string().optional(),
  date: z.string(),
  totalRevenue: z.number().min(0, "Total revenue must be positive"),
  occupancyPercent: z.number().min(0).max(100, "Occupancy must be between 0-100%"),
  adr: z.number().min(0, "ADR must be positive"),
  otherRevenue: z.number().min(0, "Other revenue must be positive"),
  notes: z.string().optional(),
});

type RevenueEntryData = z.infer<typeof revenueEntrySchema>;

interface RevenueEntry {
  id: string;
  date: Date;
  totalRevenue: number;
  occupancyPercent: number;
  adr: number;
  otherRevenue: number;
  notes: string;
  revenueSubmitted: boolean;
}

interface RevenueEntryFormProps {
  entry?: RevenueEntry | null;
  onClose: () => void;
  showHotelSelector?: boolean;
}

const RevenueEntryForm = ({ entry, onClose, showHotelSelector = false }: RevenueEntryFormProps) => {
  const isEditing = !!entry;
  const today = new Date();

  // Mock hotel data - in real app this would come from API
  const hotels = [
    { id: "1", name: "Grand Plaza Hotel" },
    { id: "2", name: "Ocean View Resort" },
    { id: "3", name: "City Center Inn" },
    { id: "4", name: "Mountain Lodge" },
    { id: "5", name: "Seaside Hotel" },
  ];
  
  const form = useForm<RevenueEntryData>({
    resolver: zodResolver(revenueEntrySchema),
    defaultValues: {
      hotelId: "",
      date: format(entry?.date || today, "yyyy-MM-dd"),
      totalRevenue: entry?.totalRevenue || 0,
      occupancyPercent: entry?.occupancyPercent || 0,
      adr: entry?.adr || 0,
      otherRevenue: entry?.otherRevenue || 0,
      notes: entry?.notes || "",
    },
  });

  const onSubmit = (data: RevenueEntryData) => {
    console.log("Revenue entry data:", data);
    if (showHotelSelector && !data.hotelId) {
      toast.error("Please select a hotel");
      return;
    }
    toast.success(isEditing ? "Revenue entry updated successfully!" : "Revenue entry submitted successfully!");
    onClose();
  };

  const handleReset = () => {
    form.reset();
    toast.info("Form has been reset");
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 pr-4">
        <Form {...form}>
          <div className="space-y-4">
            {showHotelSelector && (
              <FormField
                control={form.control}
                name="hotelId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hotel</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a hotel" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {hotels.map((hotel) => (
                          <SelectItem key={hotel.id} value={hotel.id}>
                            {hotel.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalRevenue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>$ Total Revenue</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="occupancyPercent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occupancy %</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0"
                      max="100"
                      min="0"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="adr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>$ ADR</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="otherRevenue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>$ Other Revenue</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add any additional notes..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Form>
      </ScrollArea>

      <div className="space-y-3 pt-4 border-t">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                {isEditing ? "Update Entry" : "Submit"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleReset}
                className="w-full"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Form
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RevenueEntryForm;
