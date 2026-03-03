import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/src/UI-Components/button";
import { Input } from "@/src/UI-Components/input";
import { Label } from "@/src/UI-Components/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/src/UI-Components/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/UI-Components/select";
import { cn } from "@/src/lib/utils";
import { Company, companySchema, CompanyFormValues } from "@/src/types";
import { maskPhone, onlyNumbers } from "@/src/lib/masks";

interface AddEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (company: Company) => void;
  isEditing: boolean;
  selectedCompany: Company | null;
}

export function AddEditDialog({
  isOpen,
  onClose,
  onSave,
  isEditing,
  selectedCompany,
}: AddEditDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      industry: "",
      membersLimit: "",
      status: "active",
    },
  });

  const statusValue = watch("status");

  const handleFormSubmit = (data: CompanyFormValues) => {
    const companyData: Company = {
      id:
        isEditing && selectedCompany
          ? selectedCompany.id
          : Math.random().toString(36).substr(2, 9),
      joinDate:
        isEditing && selectedCompany
          ? selectedCompany.joinDate
          : new Date().toISOString().split("T")[0],
      ...data,
      membersLimit: parseInt(data.membersLimit),
      status: data.status || "active",
    };
    onSave(companyData);
    onClose();
  };

  React.useEffect(() => {
    if (isOpen) {
      if (isEditing && selectedCompany) {
        reset({
          ...selectedCompany,
          membersLimit: selectedCompany.membersLimit.toString(),
        } as any);
      } else {
        reset({
          name: "",
          email: "",
          phone: "",
          address: "",
          industry: "",
          membersLimit: "",
          status: "active",
        });
      }
    }
  }, [isOpen, isEditing, selectedCompany, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-120.25 p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-6 bg-transparent text-foreground border-b border-border/50">
          <DialogTitle className="text-lg font-bold">
            {isEditing ? "Edit Company" : "Add New Company"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs">
            {isEditing
              ? "Update the company details below."
              : "Enter the company details to create a new partner."}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="p-6 space-y-4 bg-background"
        >
          <div className="space-y-1.5">
            <Label
              htmlFor="name"
              className={cn(
                "text-xs font-semibold",
                errors.name && "text-destructive",
              )}
            >
              Company Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter Company Name"
              className={cn(
                "h-9 text-sm",
                errors.name &&
                  "border-destructive focus-visible:ring-destructive",
              )}
            />
            {errors.name && (
              <p className="text-[10px] font-medium text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className={cn(
                  "text-xs font-semibold",
                  errors.email && "text-destructive",
                )}
              >
                Company Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Enter Company Email"
                className={cn(
                  "h-9 text-sm",
                  errors.email &&
                    "border-destructive focus-visible:ring-destructive",
                )}
              />
              {errors.email && (
                <p className="text-[10px] font-medium text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="phone"
                className={cn(
                  "text-xs font-semibold",
                  errors.phone && "text-destructive",
                )}
              >
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                {...register("phone")}
                onChange={(e) => {
                  const masked = maskPhone(e.target.value);
                  setValue("phone", masked, { shouldValidate: true });
                }}
                placeholder="Enter Phone Number"
                className={cn(
                  "h-9 text-sm",
                  errors.phone &&
                    "border-destructive focus-visible:ring-destructive",
                )}
              />
              {errors.phone && (
                <p className="text-[10px] font-medium text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="address"
              className={cn(
                "text-xs font-semibold",
                errors.address && "text-destructive",
              )}
            >
              Company Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="address"
              {...register("address")}
              placeholder="Enter Address of the Company"
              className={cn(
                "h-9 text-sm",
                errors.address &&
                  "border-destructive focus-visible:ring-destructive",
              )}
            />
            {errors.address && (
              <p className="text-[10px] font-medium text-destructive">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="industry"
                className={cn(
                  "text-xs font-semibold",
                  errors.industry && "text-destructive",
                )}
              >
                Industry <span className="text-destructive">*</span>
              </Label>
              <Input
                id="industry"
                {...register("industry")}
                placeholder="Enter Industry Type"
                className={cn(
                  "h-9 text-sm",
                  errors.industry &&
                    "border-destructive focus-visible:ring-destructive",
                )}
              />
              {errors.industry && (
                <p className="text-[10px] font-medium text-destructive">
                  {errors.industry.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="membersLimit"
                className={cn(
                  "text-xs font-semibold",
                  errors.membersLimit && "text-destructive",
                )}
              >
                Members Limit <span className="text-destructive">*</span>
              </Label>
              <Input
                id="membersLimit"
                {...register("membersLimit")}
                onChange={(e) => {
                  const masked = onlyNumbers(e.target.value);
                  setValue("membersLimit", masked, { shouldValidate: true });
                }}
                placeholder="Enter Members Limit"
                className={cn(
                  "h-9 text-sm",
                  errors.membersLimit &&
                    "border-destructive focus-visible:ring-destructive",
                )}
              />
              {errors.membersLimit && (
                <p className="text-[10px] font-medium text-destructive">
                  {errors.membersLimit.message}
                </p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="space-y-1.5">
              <Label htmlFor="status" className="text-xs font-semibold">
                Status
              </Label>
              <Select
                value={statusValue}
                onValueChange={(val: "active" | "inactive") =>
                  setValue("status", val)
                }
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <DialogFooter className="pt-4 gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="h-9 text-xs"
            >
              Cancel
            </Button>
            <Button type="submit" className="h-9 text-xs px-6">
              {isEditing ? "Update Company" : "Save Company"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
