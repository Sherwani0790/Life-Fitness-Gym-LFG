import * as React from 'react';
import { Plus, Search, MoreVertical, Edit, Trash2, Eye, Filter, Building2 } from 'lucide-react';
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
import { Company } from '@/src/types';
import { AddEditDialog } from './dialogs/AddEditDialog';
import { ViewDetailsDialog } from './dialogs/ViewDetailsDialog';
import { TablePagination } from '@/src/UI-Components/table';
import { dummyCompanies } from '@/src/lib/dummyData';

export default function CompanyManagement() {
  const [companies, setCompanies] = React.useState<Company[]>(dummyCompanies);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = React.useState(false);
  const [selectedCompany, setSelectedCompany] = React.useState<Company | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 12;

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const onSave = (company: Company) => {
    if (isEditing) {
      setCompanies(companies.map(c => c.id === company.id ? company : c));
    } else {
      setCompanies([...companies, company]);
    }
  };

  const handleDeleteCompany = (id: string) => {
    if (confirm('Are you sure you want to delete this company?')) {
      setCompanies(companies.filter(c => c.id !== id));
    }
  };

  const openViewDialog = (company: Company) => {
    setSelectedCompany(company);
    setIsViewDialogOpen(true);
  };

  const openEditDialog = (company: Company) => {
    setSelectedCompany(company);
    setIsEditing(true);
    setIsAddDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setIsEditing(false);
    setSelectedCompany(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Company Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your corporate partners and their membership limits.</p>
        </div>
        <Button onClick={() => { setIsEditing(false); setSelectedCompany(null); setIsAddDialogOpen(true); }} className="gap-2 shadow-sm h-9 text-sm">
          <Plus size={16} />
          Add New Company
        </Button>
      </div>

      <Card className="border-border shadow-sm overflow-hidden">
        <CardHeader className="pb-3 bg-muted/30 border-b border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-base font-semibold">Company List</CardTitle>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                <Input 
                  placeholder="Search companies..." 
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
                  <th className="py-3 px-6 text-xs uppercase tracking-wider">Company Name</th>
                  <th className="py-3 px-6 text-xs uppercase tracking-wider">Industry</th>
                  <th className="py-3 px-6 text-xs uppercase tracking-wider">Contact</th>
                  <th className="py-3 px-6 text-xs uppercase tracking-wider">Members Limit</th>
                  <th className="py-3 px-6 text-xs uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-xs uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {paginatedCompanies.map((company) => (
                    <motion.tr 
                      key={company.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <Building2 size={14} />
                          </div>
                          <span className="font-medium text-sm">{company.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-muted-foreground text-sm">{company.industry}</td>
                      <td className="py-4 px-6 text-muted-foreground text-sm">
                        <div>{company.email}</div>
                        <div className="text-[10px]">{company.phone}</div>
                      </td>
                      <td className="py-4 px-6 text-muted-foreground text-sm">{company.membersLimit}</td>
                      <td className="py-4 px-6">
                        <Badge variant={company.status === 'active' ? 'secondary' : 'outline'} className={cn(
                          "text-[10px] uppercase font-bold px-2 py-0.5",
                          company.status === 'active' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-muted text-muted-foreground"
                        )}>
                          {company.status}
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
                            <DropdownMenuItem onClick={() => openViewDialog(company)} className="gap-2 text-xs">
                              <Eye size={14} /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(company)} className="gap-2 text-xs">
                              <Edit size={14} /> Edit Company
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteCompany(company.id)} className="gap-2 text-xs text-destructive focus:text-destructive">
                              <Trash2 size={14} /> Delete Company
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
                {filteredCompanies.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-muted-foreground text-sm italic">
                      No companies found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <TablePagination 
            totalItems={filteredCompanies.length} 
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
        selectedCompany={selectedCompany} 
      />

      <ViewDetailsDialog 
        isOpen={isViewDialogOpen} 
        onClose={() => setIsViewDialogOpen(false)} 
        company={selectedCompany} 
      />
    </div>
  );
}
