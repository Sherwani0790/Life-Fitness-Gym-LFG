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
import { Package, packageSchema, PackageFormValues } from '@/src/types';
import { onlyAlphabets, onlyNumbers, onlyAlphanumeric } from '@/src/lib/masks';

interface AddEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pkg: Package) => void;
  isEditing: boolean;
  selectedPackage: Package | null;
}

export function AddEditDialog({ isOpen, onClose, onSave, isEditing, selectedPackage }: AddEditDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      name: '',
      price: '',
      duration: '',
      description: '',
      status: 'active',
    },
  });

  const statusValue = watch('status');

  const handleFormSubmit = (data: PackageFormValues) => {
    const packageData: Package = {
      id: isEditing && selectedPackage ? selectedPackage.id : Math.random().toString(36).substr(2, 9),
      ...data,
      price: Number(data.price),
      status: data.status || 'active',
    };
    onSave(packageData);
    onClose();
  };

  React.useEffect(() => {
    if (isOpen) {
      if (isEditing && selectedPackage) {
        reset({
          ...selectedPackage,
          price: selectedPackage.price.toString(),
        } as any);
      } else {
        reset({
          name: '',
          price: '',
          duration: '',
          description: '',
          status: 'active',
        });
      }
    }
  }, [isOpen, isEditing, selectedPackage, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-6 bg-transparent text-foreground border-b border-border/50">
          <DialogTitle className="text-lg font-bold">{isEditing ? 'Edit Package' : 'Add New Package'}</DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs">
            {isEditing ? 'Update the package details below.' : 'Enter the package details to create a new plan.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-4 bg-background">
          <div className="space-y-1.5">
            <Label htmlFor="name" className={cn("text-xs font-semibold", errors.name && "text-destructive")}>
              Package Name <span className="text-destructive">*</span>
            </Label>
            <Input 
              id="name"
              {...register('name')}
              onChange={(e) => {
                const masked = onlyAlphabets(e.target.value);
                setValue('name', masked, { shouldValidate: true });
              }}
              placeholder="e.g. Monthly Basic" 
              className={cn("h-9 text-sm", errors.name && "border-destructive focus-visible:ring-destructive")}
            />
            {errors.name && <p className="text-[10px] font-medium text-destructive">{errors.name.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="price" className={cn("text-xs font-semibold", errors.price && "text-destructive")}>
                Price (PKR) <span className="text-destructive">*</span>
              </Label>
              <Input 
                id="price"
                {...register('price')}
                onChange={(e) => {
                  const masked = onlyNumbers(e.target.value);
                  setValue('price', masked, { shouldValidate: true });
                }}
                placeholder="e.g. 2000" 
                className={cn("h-9 text-sm", errors.price && "border-destructive focus-visible:ring-destructive")}
              />
              {errors.price && <p className="text-[10px] font-medium text-destructive">{errors.price.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="duration" className={cn("text-xs font-semibold", errors.duration && "text-destructive")}>
                Duration <span className="text-destructive">*</span>
              </Label>
              <Input 
                id="duration"
                {...register('duration')}
                onChange={(e) => {
                  const masked = onlyAlphanumeric(e.target.value);
                  setValue('duration', masked, { shouldValidate: true });
                }}
                placeholder="e.g. 1 Month" 
                className={cn("h-9 text-sm", errors.duration && "border-destructive focus-visible:ring-destructive")}
              />
              {errors.duration && <p className="text-[10px] font-medium text-destructive">{errors.duration.message}</p>}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="description" className={cn("text-xs font-semibold", errors.description && "text-destructive")}>
              Description <span className="text-destructive">*</span>
            </Label>
            <Input 
              id="description"
              {...register('description')}
              placeholder="Briefly describe the package benefits" 
              className={cn("h-9 text-sm", errors.description && "border-destructive focus-visible:ring-destructive")}
            />
            {errors.description && <p className="text-[10px] font-medium text-destructive">{errors.description.message}</p>}
          </div>

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

          <DialogFooter className="pt-4 gap-2">
            <Button type="button" variant="ghost" onClick={onClose} className="h-9 text-xs">Cancel</Button>
            <Button type="submit" className="h-9 text-xs px-6">{isEditing ? 'Update Package' : 'Save Package'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
