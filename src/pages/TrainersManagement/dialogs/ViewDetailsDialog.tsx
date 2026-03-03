import * as React from "react";
import { Button } from "@/src/UI-Components/button";
import { Badge } from "@/src/UI-Components/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/UI-Components/dialog";
import { cn } from "@/src/lib/utils";
import { Trainer } from "@/src/types";

interface ViewDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  trainer: Trainer | null;
}

export function ViewDetailsDialog({
  isOpen,
  onClose,
  trainer,
}: ViewDetailsDialogProps) {
  if (!trainer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-120.25 p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-6 bg-transparent border-b border-border/50">
          <DialogTitle className="text-lg font-bold">
            Trainer Profile
          </DialogTitle>
        </DialogHeader>
        <div className="p-6 space-y-6 bg-background">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
              {trainer.name[0]}
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                {trainer.name}
              </h3>
              <Badge
                variant="secondary"
                className={cn(
                  "text-[10px] uppercase font-bold mt-1",
                  trainer.status === "active"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {trainer.status}
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 border-t border-border pt-6">
            <div className="space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                CNIC
              </p>
              <p className="text-xs font-medium text-foreground">
                {trainer.cnic}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                Gender
              </p>
              <p className="text-xs font-medium text-foreground capitalize">
                {trainer.gender}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                Phone
              </p>
              <p className="text-xs font-medium text-foreground">
                {trainer.phone}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                Specialization
              </p>
              <p className="text-xs font-medium text-foreground">
                {trainer.specialization}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                Join Date
              </p>
              <p className="text-xs font-medium text-foreground">
                {trainer.joinDate}
              </p>
            </div>
          </div>
        </div>
        <DialogFooter className="p-4 bg-muted/30 border-t border-border">
          <Button onClick={onClose} variant="outline" className="h-8 text-xs">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
