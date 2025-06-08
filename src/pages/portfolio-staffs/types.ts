
export interface StaffMember {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  phone: string;
  email: string;
  hotelName: string;
  updatedLastAudit: boolean;
  status: "active" | "inactive";
}

export interface Hotel {
  id: number;
  name: string;
}

export interface StaffFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  hotel: string;
  sendWelcomeEmail: boolean;
}
