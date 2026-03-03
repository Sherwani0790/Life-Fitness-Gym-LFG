import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/src/UI-Components/dialog";
import { Badge } from "@/src/UI-Components/badge";
import { cn } from "@/src/lib/utils";
import { Company } from "@/src/types";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Users,
  Calendar,
} from "lucide-react";

interface ViewDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company | null;
}

export function ViewDetailsDialog({
  isOpen,
  onClose,
  company,
}: ViewDetailsDialogProps) {
  if (!company) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-120.25 p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-6 bg-muted/30 border-b border-border/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Building2 size={24} />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {company.name}
              </DialogTitle>
              <DialogDescription className="text-xs font-medium text-muted-foreground">
                Company Details & Information
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6 bg-background">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground flex items-center gap-1.5">
                <Briefcase size={10} /> Industry
              </p>
              <p className="text-sm font-semibold">{company.industry}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground flex items-center gap-1.5">
                <Users size={10} /> Members Limit
              </p>
              <p className="text-sm font-semibold">
                {company.membersLimit} Members
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground flex items-center gap-1.5">
                <Mail size={10} /> Email Address
              </p>
              <p className="text-sm font-semibold">{company.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground flex items-center gap-1.5">
                <Phone size={10} /> Phone Number
              </p>
              <p className="text-sm font-semibold">{company.phone}</p>
            </div>
          </div>

          <div className="space-y-1 pt-2 border-t border-border/50">
            <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground flex items-center gap-1.5">
              <MapPin size={10} /> Office Address
            </p>
            <p className="text-sm font-medium leading-relaxed">
              {company.address}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Joined on {company.joinDate}
              </span>
            </div>
            <Badge
              variant={company.status === "active" ? "secondary" : "outline"}
              className={cn(
                "text-[10px] uppercase font-bold px-3 py-1",
                company.status === "active"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {company.status}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
