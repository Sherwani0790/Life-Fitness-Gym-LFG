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
import { Trainer, trainerSchema, TrainerFormValues } from "@/src/types";
import { maskCNIC, maskPhone, onlyAlphabets } from "@/src/lib/masks";

interface AddEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (trainer: Trainer) => void;
  isEditing: boolean;
  selectedTrainer: Trainer | null;
}

export function AddEditDialog({
  isOpen,
  onClose,
  onSave,
  isEditing,
  selectedTrainer,
}: AddEditDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TrainerFormValues>({
    resolver: zodResolver(trainerSchema),
    defaultValues: {
      name: "",
      cnic: "",
      gender: undefined as any,
      phone: "",
      specialization: "",
      status: "active",
    },
  });

  const statusValue = watch("status");

  const handleFormSubmit = (data: TrainerFormValues) => {
    const trainerData: Trainer = {
      id:
        isEditing && selectedTrainer
          ? selectedTrainer.id
          : Math.random().toString(36).substr(2, 9),
      joinDate:
        isEditing && selectedTrainer
          ? selectedTrainer.joinDate
          : new Date().toISOString().split("T")[0],
      ...data,
      status: data.status || "active",
    };
    onSave(trainerData);
    onClose();
  };

  React.useEffect(() => {
    if (isOpen) {
      if (isEditing && selectedTrainer) {
        reset(selectedTrainer as any);
      } else {
        reset({
          name: "",
          cnic: "",
          gender: undefined as any,
          phone: "",
          specialization: "",
          status: "active",
        });
      }
    }
  }, [isOpen, isEditing, selectedTrainer, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-120.25 p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-6 bg-transparent text-foreground border-b border-border/50">
          <DialogTitle className="text-lg font-bold">
            {isEditing ? "Edit Trainer" : "Add New Trainer"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs">
            {isEditing
              ? "Update the trainer details below."
              : "Enter the trainer details to create a new account."}
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
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              {...register("name")}
              onChange={(e) => {
                const masked = onlyAlphabets(e.target.value);
                setValue("name", masked, { shouldValidate: true });
              }}
              placeholder="Enter Full Name"
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
          <div className="space-y-1.5">
            <Label
              htmlFor="cnic"
              className={cn(
                "text-xs font-semibold",
                errors.cnic && "text-destructive",
              )}
            >
              CNIC <span className="text-destructive">*</span>
            </Label>
            <Input
              id="cnic"
              {...register("cnic")}
              onChange={(e) => {
                const masked = maskCNIC(e.target.value);
                setValue("cnic", masked, { shouldValidate: true });
              }}
              placeholder="Enter CNIC"
              className={cn(
                "h-9 text-sm",
                errors.cnic &&
                  "border-destructive focus-visible:ring-destructive",
              )}
            />
            {errors.cnic && (
              <p className="text-[10px] font-medium text-destructive">
                {errors.cnic.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="gender"
              className={cn(
                "text-xs font-semibold",
                errors.gender && "text-destructive",
              )}
            >
              Gender <span className="text-destructive">*</span>
            </Label>
            <Select
              value={watch("gender")}
              onValueChange={(val: "male" | "female" | "other") =>
                setValue("gender", val)
              }
            >
              <SelectTrigger
                className={cn(
                  "h-9 text-sm",
                  errors.gender &&
                    "border-destructive focus-visible:ring-destructive",
                )}
              >
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && (
              <p className="text-[10px] font-medium text-destructive">
                {errors.gender.message}
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
          <div className="space-y-1.5">
            <Label
              htmlFor="specialization"
              className={cn(
                "text-xs font-semibold",
                errors.specialization && "text-destructive",
              )}
            >
              Specialization <span className="text-destructive">*</span>
            </Label>
            <Select
              value={watch("specialization")}
              onValueChange={(val) => setValue("specialization", val)}
            >
              <SelectTrigger
                className={cn(
                  "h-9 text-sm",
                  errors.specialization &&
                    "border-destructive focus-visible:ring-destructive",
                )}
              >
                <SelectValue placeholder="Select Specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nutritionist">Nutritionist</SelectItem>
                <SelectItem value="BodyBuilding">BodyBuilding</SelectItem>
                <SelectItem value="CrossFit">CrossFit</SelectItem>
                <SelectItem value="Yoga Expert">Yoga Expert</SelectItem>
              </SelectContent>
            </Select>
            {errors.specialization && (
              <p className="text-[10px] font-medium text-destructive">
                {errors.specialization.message}
              </p>
            )}
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
              {isEditing ? "Update Trainer" : "Save Trainer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
