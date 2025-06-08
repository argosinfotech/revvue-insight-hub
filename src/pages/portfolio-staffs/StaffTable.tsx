
import React from "react";
import { MoreVertical, Edit, Trash2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StaffMember } from "./types";

interface StaffTableProps {
  staffMembers: StaffMember[];
  onEdit: (staff: StaffMember) => void;
  onSendReminder: (staffId: number) => void;
}

export const StaffTable: React.FC<StaffTableProps> = ({
  staffMembers,
  onEdit,
  onSendReminder,
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Staff Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Hotel Name</TableHead>
            <TableHead>Updated Last Audit</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffMembers.length > 0 ? (
            staffMembers.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {staff.firstName[0]}{staff.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{staff.name}</span>
                  </div>
                </TableCell>
                <TableCell>{staff.phone}</TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell>{staff.hotelName}</TableCell>
                <TableCell>
                  <Badge variant={staff.updatedLastAudit ? "default" : "secondary"} 
                         className={staff.updatedLastAudit ? "bg-green-500 hover:bg-green-600" : ""}>
                    {staff.updatedLastAudit ? "Yes" : "No"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={staff.status === "active" ? "default" : "secondary"} 
                         className={staff.status === "active" ? "bg-green-500 hover:bg-green-600" : ""}>
                    {staff.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onSendReminder(staff.id)}>
                        <Send size={14} className="mr-2" />
                        Send Reminder
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(staff)}>
                        <Edit size={14} className="mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 size={14} className="mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No staff members found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
