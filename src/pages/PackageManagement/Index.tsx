import * as React from 'react';
import { Plus, Search, MoreVertical, Edit, Trash2, Eye, Package as PackageIcon, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/UI-Components/card';
import { Button } from '@/src/UI-Components/button';
import { Input } from '@/src/UI-Components/input';
import { Badge } from '@/src/UI-Components/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/src/UI-Components/dropdown-menu';
import { cn } from '@/src/lib/utils';
import { Package, PackageFormValues } from '@/src/types';
import { AddEditDialog } from './dialogs/AddEditDialog';
import { ViewDetailsDialog } from './dialogs/ViewDetailsDialog';
import { TablePagination } from '@/src/UI-Components/table';

export default function PackageManagement() {
  const [packages, setPackages] = React.useState<Package[]>([
    { id: '1', name: 'Monthly', price: 2000, duration: '1 Month', description: 'Standard monthly membership.', status: 'active' },
    { id: '2', name: 'Quaterly', price: 5000, duration: '3 Months', description: 'Standard quarterly membership.', status: 'active' },
    { id: '3', name: 'Six Month', price: 9000, duration: '6 Months', description: 'Standard six-month membership.', status: 'active' },
    { id: '4', name: 'Yearly', price: 15000, duration: '12 Months', description: 'Standard yearly membership.', status: 'active' },
    { id: '5', name: '2 Person Group', price: 3500, duration: '1 Month', description: 'Group membership for 2 persons.', status: 'active' },
    { id: '6', name: '3 Person Group', price: 5000, duration: '1 Month', description: 'Group membership for 3 persons.', status: 'active' },
    { id: '7', name: 'TouchStone', price: 2500, duration: '1 Month', description: 'Special TouchStone package.', status: 'active' },
    { id: '8', name: 'Taxi Guys', price: 1500, duration: '1 Month', description: 'Special package for taxi drivers.', status: 'active' },
    { id: '9', name: 'CustomPackage', price: 3000, duration: '1 Month', description: 'Custom corporate package.', status: 'active' },
  ]);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = React.useState(false);
  const [selectedPackage, setSelectedPackage] = React.useState<Package | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 12;

  const filteredPackages = packages.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.duration.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedPackages = filteredPackages.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const onSave = (pkg: Package) => {
    if (isEditing) {
      setPackages(packages.map(p => p.id === pkg.id ? pkg : p));
    } else {
      setPackages([...packages, pkg]);
    }
  };

  const handleDeletePackage = (id: string) => {
    if (confirm('Are you sure you want to delete this package?')) {
      setPackages(packages.filter(p => p.id !== id));
    }
  };

  const openViewDialog = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsViewDialogOpen(true);
  };

  const openEditDialog = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsEditing(true);
    setIsAddDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setIsEditing(false);
    setSelectedPackage(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Package Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your gym membership plans and pricing.</p>
        </div>
        <Button onClick={() => { setIsEditing(false); setSelectedPackage(null); setIsAddDialogOpen(true); }} className="gap-2 shadow-sm h-9 text-sm">
          <Plus size={16} />
          Add New Package
        </Button>
      </div>

      <Card className="border-border shadow-sm overflow-hidden">
        <CardHeader className="pb-3 bg-muted/30 border-b border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-base font-semibold">Package List</CardTitle>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                <Input 
                  placeholder="Search packages..." 
                  className="pl-9 h-9 text-sm" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Filter size={16} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground font-medium bg-muted/10">
                  <th className="py-3 px-6 text-xs uppercase tracking-wider">Package Name</th>
                  <th className="py-3 px-6 text-xs uppercase tracking-wider">Duration</th>
                  <th className="py-3 px-6 text-xs uppercase tracking-wider">Price (PKR)</th>
                  <th className="py-3 px-6 text-xs uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-xs uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {paginatedPackages.map((pkg) => (
                    <motion.tr 
                      key={pkg.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <PackageIcon size={14} />
                          </div>
                          <span className="font-medium text-sm">{pkg.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-muted-foreground text-sm">{pkg.duration}</td>
                      <td className="py-4 px-6 font-semibold text-sm">Rs. {pkg.price.toLocaleString()}</td>
                      <td className="py-4 px-6">
                        <Badge variant={pkg.status === 'active' ? 'secondary' : 'outline'} className={cn(
                          "text-[10px] uppercase font-bold px-2 py-0.5",
                          pkg.status === 'active' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-muted text-muted-foreground"
                        )}>
                          {pkg.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem onClick={() => openViewDialog(pkg)} className="gap-2 text-xs">
                              <Eye size={14} /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(pkg)} className="gap-2 text-xs">
                              <Edit size={14} /> Edit Package
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeletePackage(pkg.id)} className="gap-2 text-xs text-destructive focus:text-destructive">
                              <Trash2 size={14} /> Delete Package
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
                {filteredPackages.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-muted-foreground text-sm italic">
                      No packages found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <TablePagination 
            totalItems={filteredPackages.length} 
            pageSize={pageSize} 
            currentPage={currentPage} 
            onPageChange={setCurrentPage} 
          />
        </CardContent>
      </Card>

      <AddEditDialog 
        isOpen={isAddDialogOpen} 
        onClose={handleCloseDialog} 
        onSave={onSave} 
        isEditing={isEditing} 
        selectedPackage={selectedPackage} 
      />

      <ViewDetailsDialog 
        isOpen={isViewDialogOpen} 
        onClose={() => setIsViewDialogOpen(false)} 
        pkg={selectedPackage} 
      />
    </div>
  );
}
