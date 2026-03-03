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
import { Member, MemberFormValues } from '@/src/types';
import { AddEditDialog } from './dialogs/AddEditDialog';
import { ViewDetailsDialog } from './dialogs/ViewDetailsDialog';
import { dummyMembers } from '@/src/lib/dummyData';

import { TablePagination } from '@/src/UI-Components/table';

export default function MembersManagement() {
  const [members, setMembers] = React.useState<Member[]>(dummyMembers);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState<Member | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 12;

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.cnic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const onSave = (member: Member) => {
    if (isEditing) {
      setMembers(members.map(m => m.id === member.id ? member : m));
    } else {
      setMembers([...members, member]);
    }
  };

  const handleDeleteMember = (id: string) => {
    if (confirm('Are you sure you want to delete this member?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const openViewDialog = (member: Member) => {
    setSelectedMember(member);
    setIsViewDialogOpen(true);
  };

  const openEditDialog = (member: Member) => {
    setSelectedMember(member);
    setIsEditing(true);
    setIsAddDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setIsEditing(false);
    setSelectedMember(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Members Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your gym members and their subscription details.</p>
        </div>
        <Button onClick={() => { setIsEditing(false); setSelectedMember(null); setIsAddDialogOpen(true); }} className="gap-2 shadow-sm h-9 text-sm">
          <Plus size={16} />
          Add New Member
        </Button>
      </div>

      <Card className="border-border shadow-sm overflow-hidden">
        <CardHeader className="pb-3 bg-muted/30 border-b border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-base font-semibold">Member List</CardTitle>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                <Input 
                  placeholder="Search members..." 
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
                  <th className="py-3 px-6 text-xs uppercase tracking-wider">Member</th>
                  <th className="py-3 px-6 text-xs uppercase tracking-wider">CNIC</th>
                  <th className="py-3 px-6 text-xs uppercase tracking-wider">Contact</th>
                  <th className="py-3 px-6 text-xs uppercase tracking-wider">Join Date</th>
                  <th className="py-3 px-6 text-xs uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-xs uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {paginatedMembers.map((member) => (
                    <motion.tr 
                      key={member.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                            {member.name[0]}
                          </div>
                          <p className="font-medium text-sm">{member.name}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-muted-foreground text-sm">{member.cnic}</td>
                      <td className="py-4 px-6 text-muted-foreground text-sm">{member.phone}</td>
                      <td className="py-4 px-6 text-muted-foreground text-sm">{member.joinDate}</td>
                      <td className="py-4 px-6">
                        <Badge variant={member.status === 'active' ? 'secondary' : 'outline'} className={cn(
                          "text-[10px] uppercase font-bold px-2 py-0.5",
                          member.status === 'active' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-muted text-muted-foreground"
                        )}>
                          {member.status}
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
                            <DropdownMenuItem onClick={() => openViewDialog(member)} className="gap-2 text-xs">
                              <Eye size={14} /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(member)} className="gap-2 text-xs">
                              <Edit size={14} /> Edit Member
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteMember(member.id)} className="gap-2 text-xs text-destructive focus:text-destructive">
                              <Trash2 size={14} /> Delete Member
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
                {filteredMembers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-muted-foreground text-sm italic">
                      No members found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <TablePagination 
            totalItems={filteredMembers.length} 
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
        selectedMember={selectedMember} 
      />

      <ViewDetailsDialog 
        isOpen={isViewDialogOpen} 
        onClose={() => setIsViewDialogOpen(false)} 
        member={selectedMember} 
      />
    </div>
  );
}
