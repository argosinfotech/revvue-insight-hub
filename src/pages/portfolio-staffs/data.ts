
import { StaffMember, Hotel } from "./types";

export const staffMembers: StaffMember[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Smith",
    name: "John Smith",
    phone: "+1 (555) 123-4567",
    email: "john.smith@hotel.com",
    hotelName: "Grand Hotel Downtown",
    updatedLastAudit: true,
    status: "active",
  },
  {
    id: 2,
    firstName: "Sarah",
    lastName: "Johnson",
    name: "Sarah Johnson",
    phone: "+1 (555) 234-5678",
    email: "sarah.johnson@hotel.com",
    hotelName: "Sunny Beach Resort",
    updatedLastAudit: false,
    status: "active",
  },
  {
    id: 3,
    firstName: "Mike",
    lastName: "Davis",
    name: "Mike Davis",
    phone: "+1 (555) 345-6789",
    email: "mike.davis@hotel.com",
    hotelName: "City Center Hotel",
    updatedLastAudit: true,
    status: "inactive",
  },
];

export const hotels: Hotel[] = [
  { id: 1, name: "Grand Hotel Downtown" },
  { id: 2, name: "Sunny Beach Resort" },
  { id: 3, name: "City Center Hotel" },
  { id: 4, name: "Mountain View Lodge" },
];
