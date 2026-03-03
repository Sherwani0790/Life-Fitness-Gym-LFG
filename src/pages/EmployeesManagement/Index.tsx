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
import { Employee, EmployeeFormValues } from '@/src/types';
import { AddEditDialog } from './dialogs/AddEditDialog';
import { ViewDetailsDialog } from './dialogs/ViewDetailsDialog';

export default function EmployeesManagement() {
  const [employees, setEmployees] = React.useState<Employee[]>([
    { id: '1', name: 'Zeeshan Khan', cnic: '42101-1234567-1', gender: 'male', phone: '0300-1112223', role: 'Receptionist', joinDate: '2023-05-10', status: 'active' },
    { id: '2', name: 'Ali Raza', cnic: '42101-7654321-2', gender: 'male', phone: '0321-4445556', role: 'Cleaner', joinDate: '2023-08-20', status: 'active' },
    { id: '3', name: 'Maira Ahmed', cnic: '42101-9876543-3', gender: 'female', phone: '0311-7778889', role: 'Accountant', joinDate: '2024-01-05', status: 'inactive' },
  ]);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);

  const filteredEmployees = employees.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.cnic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = (data: EmployeeFormValues) => {
    if (isEditing && selectedEmployee) {
      const updatedEmployee: Employee = {
        ...selectedEmployee,
        ...data,
        status: data.status || 'active',
      };
      setEmployees(employees.map(e => e.id === updatedEmployee.id ? updatedEmployee : e));
    } else {
      const newEmployee: Employee = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
      };
      setEmployees([...employees, newEmployee]);
    }
    handleCloseDialog();
  };

  const handleDeleteEmployee = (id: string) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(e => e.id !== id));
    }
  };

  const openViewDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsViewDialogOpen(true);
  };

  const openEditDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditing(true);
    setIsAddDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setIsEditing(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Employees Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your gym staff and employees.</p>
        </div>
        <Button onClick={() => { setIsEditing(false); setSelectedEmployee(null); setIsAddDialogOpen(true); }} className="gap-2 shadow-sm h-9 text-sm">
          <Plus size={16} />
          Add New Employee
        </Button>
      </div>

      <Card className="border-border shadow-sm overflow-hidden">
        <CardHeader className="pb-3 bg-muted/30 border-b border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-base font-semibold">Employee List</CardTitle>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                <Input 
                  placeholder="Search employees..." 
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
                  <th className="py-3 px-6 text-xs uppercase tracking-wider">Employee</th>
                  <th className="py-3 px-6 text-xs uppercase tracking-wider">CNIC</th>
                  <th className="py-3 px-6 text-xs uppercase tracking-wider">Role</th>
                  <th className="py-3 px-6 text-xs uppercase tracking-wider">Contact</th>
                  <th className="py-3 px-6 text-xs uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-xs uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredEmployees.map((employee) => (
                    <motion.tr 
                      key={employee.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                            {employee.name[0]}
                          </div>
                          <p className="font-medium text-sm">{employee.name}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-muted-foreground text-sm">{employee.cnic}</td>
                      <td className="py-4 px-6 text-muted-foreground text-sm">{employee.role}</td>
                      <td className="py-4 px-6 text-muted-foreground text-sm">{employee.phone}</td>
                      <td className="py-4 px-6">
                        <Badge variant={employee.status === 'active' ? 'secondary' : 'outline'} className={cn(
                          "text-[10px] uppercase font-bold px-2 py-0.5",
                          employee.status === 'active' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-muted text-muted-foreground"
                        )}>
                          {employee.status}
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
                            <DropdownMenuItem onClick={() => openViewDialog(employee)} className="gap-2 text-xs">
                              <Eye size={14} /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(employee)} className="gap-2 text-xs">
                              <Edit size={14} /> Edit Employee
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteEmployee(employee.id)} className="gap-2 text-xs text-destructive focus:text-destructive">
                              <Trash2 size={14} /> Delete Employee
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
                {filteredEmployees.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-muted-foreground text-sm italic">
                      No employees found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AddEditDialog 
        isOpen={isAddDialogOpen} 
        onClose={handleCloseDialog} 
        onSubmit={onSubmit} 
        isEditing={isEditing} 
        selectedEmployee={selectedEmployee} 
      />

      <ViewDetailsDialog 
        isOpen={isViewDialogOpen} 
        onClose={() => setIsViewDialogOpen(false)} 
        employee={selectedEmployee} 
      />
    </div>
  );
}
