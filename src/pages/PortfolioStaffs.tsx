
import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import DashboardLayout from "@/components/DashboardLayout";
import { StaffForm } from "./portfolio-staffs/StaffForm";
import { StaffTable } from "./portfolio-staffs/StaffTable";
import { useStaffForm } from "./portfolio-staffs/useStaffForm";
import { staffMembers, hotels } from "./portfolio-staffs/data";

const PortfolioStaffs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
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
  } = useStaffForm();

  const filteredStaffs = staffMembers.filter(staff => 
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.phone.includes(searchQuery) ||
    staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.hotelName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Hotel Staffs</h1>
            <p className="text-muted-foreground">
              Manage all hotel staff members
            </p>
          </div>
          <Sheet open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
            <SheetTrigger asChild>
              <Button 
                className="gap-1 bg-brand-purple hover:bg-brand-purple-dark"
                onClick={() => setIsAddStaffOpen(true)}
              >
                <Plus size={16} />
                Add Staff
              </Button>
            </SheetTrigger>
            <StaffForm
              isOpen={isAddStaffOpen}
              onOpenChange={setIsAddStaffOpen}
              editingStaff={editingStaff}
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              hotels={hotels}
              onSubmit={handleSubmit}
              onClose={handleCloseSheet}
            />
          </Sheet>
        </div>

        <div className="flex items-center pb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search staff members..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Staff Members List</CardTitle>
            <CardDescription>
              Showing {filteredStaffs.length} of {staffMembers.length} staff members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StaffTable
              staffMembers={filteredStaffs}
              onEdit={handleEdit}
              onSendReminder={handleSendReminder}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PortfolioStaffs;
