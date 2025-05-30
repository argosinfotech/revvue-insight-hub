
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const revenueEntrySchema = z.object({
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
}

const RevenueEntryForm = ({ entry, onClose }: RevenueEntryFormProps) => {
  const isEditing = !!entry;
  const today = new Date();
  
  const form = useForm<RevenueEntryData>({
    resolver: zodResolver(revenueEntrySchema),
    defaultValues: {
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
    toast.success(isEditing ? "Revenue entry updated successfully!" : "Revenue entry submitted successfully!");
    onClose();
  };

  const handleReset = () => {
    form.reset();
    toast.info("Form has been reset");
  };

  return (
    <div className="flex h-full">
      {/* Left side - reduced width */}
      <div className="flex-1 pr-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">My Entries</h1>
            <Button variant="outline" onClick={onClose}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
          
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-lg">Revenue Entry Form</CardTitle>
              <CardDescription>
                Form is open in the right panel
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Right side panel - Revenue Entry Form */}
      <div className="w-96 border-l bg-background p-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {isEditing ? "Edit Revenue Entry" : "Add Today's Revenue"}
            </CardTitle>
            <CardDescription>
              {isEditing ? "Update your revenue entry" : "Submit your daily revenue data"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                          disabled={!isEditing} // Auto-picked for new entries
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
                          placeholder="0.00"
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
                          placeholder="0.00"
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
                          placeholder="0.00"
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

                <div className="flex flex-col gap-2 pt-4">
                  <Button type="submit" className="w-full">
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
                    variant="ghost" 
                    onClick={onClose}
                    className="w-full"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RevenueEntryForm;
