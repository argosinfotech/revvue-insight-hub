
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle,
} from "@/components/ui/sheet";
import { StaffMember, StaffFormData, Hotel } from "./types";

interface StaffFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingStaff: StaffMember | null;
  formData: StaffFormData;
  setFormData: (data: StaffFormData) => void;
  errors: Record<string, string>;
  hotels: Hotel[];
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export const StaffForm: React.FC<StaffFormProps> = ({
  isOpen,
  onOpenChange,
  editingStaff,
  formData,
  setFormData,
  errors,
  hotels,
  onSubmit,
  onClose,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[500px] sm:w-[600px]">
        <SheetHeader>
          <SheetTitle>{editingStaff ? "Edit Staff Member" : "Add New Staff Member"}</SheetTitle>
          <SheetDescription>
            {editingStaff ? "Update staff member information" : "Add a new staff member to your hotel team"}
          </SheetDescription>
        </SheetHeader>
        
        <form onSubmit={onSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="hotel">Hotel *</Label>
            <Select value={formData.hotel} onValueChange={(value) => setFormData({...formData, hotel: value})}>
              <SelectTrigger className={errors.hotel ? "border-red-500" : ""}>
                <SelectValue placeholder="Select a hotel" />
              </SelectTrigger>
              <SelectContent>
                {hotels.map((hotel) => (
                  <SelectItem key={hotel.id} value={hotel.name}>
                    {hotel.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.hotel && (
              <p className="text-sm text-red-500">{errors.hotel}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="sendWelcomeEmail"
              checked={formData.sendWelcomeEmail}
              onCheckedChange={(checked) => 
                setFormData({...formData, sendWelcomeEmail: !!checked})
              }
            />
            <Label htmlFor="sendWelcomeEmail">Send Welcome Email</Label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-brand-purple hover:bg-brand-purple-dark">
              {editingStaff ? "Update Staff Member" : "Add Staff Member"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
