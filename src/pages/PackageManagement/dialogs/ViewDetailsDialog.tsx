import * as React from 'react';
import { Button } from '@/src/UI-Components/button';
import { Badge } from '@/src/UI-Components/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from '@/src/UI-Components/dialog';
import { cn } from '@/src/lib/utils';
import { Package } from '@/src/types';
import { Package as PackageIcon } from 'lucide-react';

interface ViewDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  pkg: Package | null;
}

export function ViewDetailsDialog({ isOpen, onClose, pkg }: ViewDetailsDialogProps) {
  if (!pkg) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-6 bg-transparent border-b border-border/50">
          <DialogTitle className="text-lg font-bold">Package Details</DialogTitle>
        </DialogHeader>
        <div className="p-6 space-y-6 bg-background">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <PackageIcon size={28} />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">{pkg.name}</h3>
              <Badge variant="secondary" className={cn(
                "text-[10px] uppercase font-bold mt-1",
                pkg.status === 'active' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-muted text-muted-foreground"
              )}>
                {pkg.status}
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 border-t border-border pt-6">
            <div className="space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Price</p>
              <p className="text-xs font-medium text-foreground">Rs. {pkg.price.toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Duration</p>
              <p className="text-xs font-medium text-foreground">{pkg.duration}</p>
            </div>
            <div className="col-span-2 space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Description</p>
              <p className="text-xs text-foreground leading-relaxed">{pkg.description}</p>
            </div>
          </div>
        </div>
        <DialogFooter className="p-4 bg-muted/30 border-t border-border">
          <Button onClick={onClose} variant="outline" className="h-8 text-xs">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
