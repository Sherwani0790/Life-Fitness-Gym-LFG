import * as React from 'react';
import { Plus, Search, MoreVertical, Edit, Trash2, Eye, Filter } from 'lucide-react';
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
import { Trainer, TrainerFormValues } from '@/src/types';
import { AddEditDialog } from './dialogs/AddEditDialog';
import { ViewDetailsDialog } from './dialogs/ViewDetailsDialog';
import { TablePagination } from '@/src/UI-Components/table';

export default function TrainersManagement() {
  const [trainers, setTrainers] = React.useState<Trainer[]>([
    { id: '1', name: 'Hamza Malik', cnic: '42101-1111111-1', gender: 'male', phone: '0300-5556667', specialization: 'Bodybuilding', joinDate: '2022-12-01', status: 'active' },
    { id: '2', name: 'Usman Ghani', cnic: '42101-2222222-2', gender: 'male', phone: '0321-8889990', specialization: 'Yoga & Cardio', joinDate: '2023-03-15', status: 'active' },
    { id: '3', name: 'Bilal Ahmed', cnic: '42101-3333333-3', gender: 'male', phone: '0311-2223334', specialization: 'Crossfit', joinDate: '2023-10-10', status: 'inactive' },
  ]);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = React.useState(false);
  const [selectedTrainer, setSelectedTrainer] = React.useState<Trainer | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 12;

  const filteredTrainers = trainers.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.cnic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedTrainers = filteredTrainers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const onSave = (trainer: Trainer) => {
    if (isEditing) {
      setTrainers(trainers.map(t => t.id === trainer.id ? trainer : t));
    } else {
      setTrainers([...trainers, trainer]);
    }
  };

  const handleDeleteTrainer = (id: string) => {
    if (confirm('Are you sure you want to delete this trainer?')) {
      setTrainers(trainers.filter(t => t.id !== id));
    }
  };

  const openViewDialog = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setIsViewDialogOpen(true);
  };

  const openEditDialog = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setIsEditing(true);
    setIsAddDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setIsEditing(false);
    setSelectedTrainer(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Trainers Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your gym trainers and their specializations.</p>
        </div>
        <Button onClick={() => { setIsEditing(false); setSelectedTrainer(null); setIsAddDialogOpen(true); }} className="gap-2 shadow-sm h-9 text-sm">
          <Plus size={16} />
          Add New Trainer
        </Button>
      </div>

      <Card className="border-border shadow-sm overflow-hidden">
        <CardHeader className="pb-3 bg-muted/30 border-b border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-base font-semibold">Trainer List</CardTitle>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                <Input 
                  placeholder="Search trainers..." 
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
                  <th className="py-3 px-6 text-xs uppercase tracking-wider">Trainer</th>
                  <th className="py-3 px-6 text-xs uppercase tracking-wider">CNIC</th>
                  <th className="py-3 px-6 text-xs uppercase tracking-wider">Specialization</th>
                  <th className="py-3 px-6 text-xs uppercase tracking-wider">Contact</th>
                  <th className="py-3 px-6 text-xs uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-xs uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {paginatedTrainers.map((trainer) => (
                    <motion.tr 
                      key={trainer.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                            {trainer.name[0]}
                          </div>
                          <p className="font-medium text-sm">{trainer.name}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-muted-foreground text-sm">{trainer.cnic}</td>
                      <td className="py-4 px-6 text-muted-foreground text-sm">{trainer.specialization}</td>
                      <td className="py-4 px-6 text-muted-foreground text-sm">{trainer.phone}</td>
                      <td className="py-4 px-6">
                        <Badge variant={trainer.status === 'active' ? 'secondary' : 'outline'} className={cn(
                          "text-[10px] uppercase font-bold px-2 py-0.5",
                          trainer.status === 'active' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-muted text-muted-foreground"
                        )}>
                          {trainer.status}
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
                            <DropdownMenuItem onClick={() => openViewDialog(trainer)} className="gap-2 text-xs">
                              <Eye size={14} /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(trainer)} className="gap-2 text-xs">
                              <Edit size={14} /> Edit Trainer
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteTrainer(trainer.id)} className="gap-2 text-xs text-destructive focus:text-destructive">
                              <Trash2 size={14} /> Delete Trainer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
                {filteredTrainers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-muted-foreground text-sm italic">
                      No trainers found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <TablePagination 
            totalItems={filteredTrainers.length} 
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
        selectedTrainer={selectedTrainer} 
      />

      <ViewDetailsDialog 
        isOpen={isViewDialogOpen} 
        onClose={() => setIsViewDialogOpen(false)} 
        trainer={selectedTrainer} 
      />
    </div>
  );
}
