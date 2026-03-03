import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/src/UI-Components/button';
import { Input } from '@/src/UI-Components/input';
import { Label } from '@/src/UI-Components/label';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from '@/src/UI-Components/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/UI-Components/select';
import { cn } from '@/src/lib/utils';
import { Member, memberSchema, MemberFormValues } from '@/src/types';
import { maskCNIC, maskPhone, onlyAlphabets } from '@/src/lib/masks';

interface AddEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: Member) => void;
  isEditing: boolean;
  selectedMember: Member | null;
}

export function AddEditDialog({ isOpen, onClose, onSave, isEditing, selectedMember }: AddEditDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: '',
      fatherName: '',
      cnic: '',
      gender: undefined as any,
      phone: '',
      location: undefined as any,
      paymentMode: undefined as any,
      packageName: '',
      startDate: new Date().toISOString().split('T')[0],
      status: 'active',
    },
  });

  const statusValue = watch('status');
  const packageNameValue = watch('packageName');
  const genderValue = watch('gender');
  const locationValue = watch('location');
  const paymentModeValue = watch('paymentMode');

  const handleFormSubmit = (data: MemberFormValues) => {
    const memberData: Member = {
      id: isEditing && selectedMember ? selectedMember.id : Math.random().toString(36).substr(2, 9),
      joinDate: isEditing && selectedMember ? selectedMember.joinDate : new Date().toISOString().split('T')[0],
      packageId: isEditing && selectedMember ? selectedMember.packageId : 'pkg-custom',
      ...data,
      status: data.status || 'active',
    };
    onSave(memberData);
    onClose();
  };

  React.useEffect(() => {
    if (isOpen) {
      if (isEditing && selectedMember) {
        reset({
          ...selectedMember,
          packageName: selectedMember.packageName || '',
          startDate: selectedMember.startDate || new Date().toISOString().split('T')[0],
        } as any);
      } else {
        reset({
          name: '',
          fatherName: '',
          cnic: '',
          gender: undefined as any,
          phone: '',
          location: undefined as any,
          paymentMode: undefined as any,
          packageName: '',
          startDate: new Date().toISOString().split('T')[0],
          status: 'active',
        });
      }
    }
  }, [isOpen, isEditing, selectedMember, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-6 bg-transparent text-foreground border-b border-border/50">
          <DialogTitle className="text-lg font-bold">{isEditing ? 'Edit Member' : 'Add New Member'}</DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs">
            {isEditing ? 'Update the member details below.' : 'Enter the member details to create a new account.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-4 bg-background max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className={cn("text-xs font-semibold", errors.name && "text-destructive")}>
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input 
                id="name"
                {...register('name')}
                onChange={(e) => {
                  const masked = onlyAlphabets(e.target.value);
                  setValue('name', masked, { shouldValidate: true });
                }}
                placeholder="e.g. Ahmed Khan" 
                className={cn("h-9 text-sm", errors.name && "border-destructive focus-visible:ring-destructive")}
              />
              {errors.name && <p className="text-[10px] font-medium text-destructive">{errors.name.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="fatherName" className={cn("text-xs font-semibold", errors.fatherName && "text-destructive")}>
                Father's Name <span className="text-destructive">*</span>
              </Label>
              <Input 
                id="fatherName"
                {...register('fatherName')}
                onChange={(e) => {
                  const masked = onlyAlphabets(e.target.value);
                  setValue('fatherName', masked, { shouldValidate: true });
                }}
                placeholder="e.g. Ibrahim Khan" 
                className={cn("h-9 text-sm", errors.fatherName && "border-destructive focus-visible:ring-destructive")}
              />
              {errors.fatherName && <p className="text-[10px] font-medium text-destructive">{errors.fatherName.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="cnic" className={cn("text-xs font-semibold", errors.cnic && "text-destructive")}>
                CNIC <span className="text-destructive">*</span>
              </Label>
              <Input 
                id="cnic"
                {...register('cnic')}
                onChange={(e) => {
                  const masked = maskCNIC(e.target.value);
                  setValue('cnic', masked, { shouldValidate: true });
                }}
                placeholder="e.g. 42101-1234567-1" 
                className={cn("h-9 text-sm", errors.cnic && "border-destructive focus-visible:ring-destructive")}
              />
              {errors.cnic && <p className="text-[10px] font-medium text-destructive">{errors.cnic.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gender" className={cn("text-xs font-semibold", errors.gender && "text-destructive")}>
                Gender <span className="text-destructive">*</span>
              </Label>
              <Select 
                value={genderValue} 
                onValueChange={(val: 'male' | 'female' | 'other') => setValue('gender', val)}
              >
                <SelectTrigger className={cn("h-9 text-sm", errors.gender && "border-destructive focus-visible:ring-destructive")}>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-[10px] font-medium text-destructive">{errors.gender.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="phone" className={cn("text-xs font-semibold", errors.phone && "text-destructive")}>
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input 
                id="phone"
                {...register('phone')}
                onChange={(e) => {
                  const masked = maskPhone(e.target.value);
                  setValue('phone', masked, { shouldValidate: true });
                }}
                placeholder="e.g. 0300-1234567" 
                className={cn("h-9 text-sm", errors.phone && "border-destructive focus-visible:ring-destructive")}
              />
              {errors.phone && <p className="text-[10px] font-medium text-destructive">{errors.phone.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="location" className={cn("text-xs font-semibold", errors.location && "text-destructive")}>
                Location <span className="text-destructive">*</span>
              </Label>
              <Select 
                value={locationValue} 
                onValueChange={(val: 'Soan Garden' | 'Bahria Town') => setValue('location', val)}
              >
                <SelectTrigger className={cn("h-9 text-sm", errors.location && "border-destructive focus-visible:ring-destructive")}>
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Soan Garden">Soan Garden</SelectItem>
                  <SelectItem value="Bahria Town">Bahria Town</SelectItem>
                </SelectContent>
              </Select>
              {errors.location && <p className="text-[10px] font-medium text-destructive">{errors.location.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="paymentMode" className={cn("text-xs font-semibold", errors.paymentMode && "text-destructive")}>
                Payment Mode <span className="text-destructive">*</span>
              </Label>
              <Select 
                value={paymentModeValue} 
                onValueChange={(val: 'Bank Transfer' | 'Cash' | 'Easypaisa' | 'Jazzcash' | 'Other') => setValue('paymentMode', val)}
              >
                <SelectTrigger className={cn("h-9 text-sm", errors.paymentMode && "border-destructive focus-visible:ring-destructive")}>
                  <SelectValue placeholder="Select Payment Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Easypaisa">Easypaisa</SelectItem>
                  <SelectItem value="Jazzcash">Jazzcash</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.paymentMode && <p className="text-[10px] font-medium text-destructive">{errors.paymentMode.message}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="packageName" className={cn("text-xs font-semibold", errors.packageName && "text-destructive")}>
                Package <span className="text-destructive">*</span>
              </Label>
              <Select 
                value={packageNameValue} 
                onValueChange={(val) => setValue('packageName', val)}
              >
                <SelectTrigger className={cn("h-9 text-sm", errors.packageName && "border-destructive focus-visible:ring-destructive")}>
                  <SelectValue placeholder="Select Package" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Quaterly">Quaterly</SelectItem>
                  <SelectItem value="Six Month">Six Month</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                  <SelectItem value="2 Person Group">2 Person Group</SelectItem>
                  <SelectItem value="3 Person Group">3 Person Group</SelectItem>
                  <SelectItem value="TouchStone">TouchStone</SelectItem>
                  <SelectItem value="Taxi Guys">Taxi Guys</SelectItem>
                  <SelectItem value="CustomPackage">CustomPackage</SelectItem>
                </SelectContent>
              </Select>
              {errors.packageName && <p className="text-[10px] font-medium text-destructive">{errors.packageName.message}</p>}
            </div>

            {packageNameValue && (
              <div className="space-y-1.5">
                <Label htmlFor="startDate" className={cn("text-xs font-semibold", errors.startDate && "text-destructive")}>
                  Select Date <span className="text-destructive">*</span>
                </Label>
                <Input 
                  id="startDate"
                  type="date"
                  {...register('startDate')}
                  min={new Date().toISOString().split('T')[0]}
                  className={cn("h-9 text-sm", errors.startDate && "border-destructive focus-visible:ring-destructive")}
                />
                {errors.startDate && <p className="text-[10px] font-medium text-destructive">{errors.startDate.message}</p>}
              </div>
            )}
            
            {isEditing && (
              <div className="space-y-1.5">
                <Label htmlFor="status" className="text-xs font-semibold">Status</Label>
                <Select 
                  value={statusValue} 
                  onValueChange={(val: 'active' | 'inactive') => setValue('status', val)}
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
          </div>

          <DialogFooter className="pt-4 gap-2">
            <Button type="button" variant="ghost" onClick={onClose} className="h-9 text-xs">Cancel</Button>
            <Button type="submit" className="h-9 text-xs px-6">{isEditing ? 'Update Member' : 'Save Member'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
