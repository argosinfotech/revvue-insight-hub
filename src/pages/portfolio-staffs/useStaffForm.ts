
import { useState } from "react";
import { toast } from "sonner";
import { StaffMember, StaffFormData } from "./types";

export const useStaffForm = () => {
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [formData, setFormData] = useState<StaffFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    hotel: "",
    sendWelcomeEmail: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!formData.hotel) {
      newErrors.hotel = "Hotel selection is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      if (editingStaff) {
        toast.success("Staff member updated successfully!");
      } else {
        toast.success("Staff member added successfully!");
      }
      handleCloseSheet();
    }
  };

  const handleCloseSheet = () => {
    setIsAddStaffOpen(false);
    setEditingStaff(null);
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      hotel: "",
      sendWelcomeEmail: false,
    });
    setErrors({});
  };

  const handleEdit = (staff: StaffMember) => {
    setEditingStaff(staff);
    setFormData({
      firstName: staff.firstName,
      lastName: staff.lastName,
      phone: staff.phone,
      email: staff.email,
      hotel: staff.hotelName,
      sendWelcomeEmail: false,
    });
    setIsAddStaffOpen(true);
  };

  const handleSendReminder = (staffId: number) => {
    toast.success(`Reminder sent to staff member #${staffId}`);
  };

  return {
    isAddStaffOpen,
    setIsAddStaffOpen,
    editingStaff,
    formData,
    setFormData,
    errors,
    handleSubmit,
    handleCloseSheet,
    handleEdit,
    handleSendReminder,
  };
};
