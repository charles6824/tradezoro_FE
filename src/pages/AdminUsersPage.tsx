import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DeleteUserModal } from '@/components/ui/delete-user-modal';
import { useToast } from '@/hooks/use-toast';
import { useGetUsersQuery, useUpdateUserStatusMutation, useDeleteUserMutation } from '@/store/adminApi';
import { 
  Users, 
  UserCheck,
  UserX,
  Shield,
  Search,
  Eye,
  Trash2
} from 'lucide-react';

export const AdminUsersPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const { data: usersData, isLoading } = useGetUsersQuery({ search: searchTerm });
  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();
  
  const users:any = usersData?.data || [];
  const filteredUsers = users.filter((user: any) => user.role === 'user');

  const handleActivateUser = async (userId: string) => {
    try {
      await updateUserStatus({ id: userId, isActive: true }).unwrap();
      toast({
        title: "User Activated",
        description: "User has been successfully activated.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.data?.message || "Failed to activate user",
        variant: "destructive",
      });
    }
  };

  const handleSuspendUser = async (userId: string) => {
    try {
      await updateUserStatus({ id: userId, isActive: false }).unwrap();
      toast({
        title: "User Suspended",
        description: "User has been suspended.",
        variant: "destructive",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.data?.message || "Failed to suspend user",
        variant: "destructive",
      });
    }
  };

  const handleVerifyUser = async (userId: string) => {
    // This would need a separate API endpoint
    toast({
      title: "Feature Coming Soon",
      description: "User verification feature will be implemented soon.",
    });
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    
    try {
      await deleteUser(userToDelete._id).unwrap();
      toast({
        title: "User Deleted",
        description: `${userToDelete.firstName} ${userToDelete.lastName} has been permanently deleted.`,
        variant: "destructive",
      });
      setDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.data?.message || "Failed to delete user",
        variant: "destructive",
      });
    }
  };

  const openDeleteModal = (user: any) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading users...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-foreground">User Management</h1>
        <Badge variant="secondary" className="px-3 py-1">
          {filteredUsers.length} Users
        </Badge>
      </div>

      <Card className="bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            All Users
          </CardTitle>
          <CardDescription>Manage user accounts, permissions, and verification status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-[800px] px-4 sm:px-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Verified</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user: any) => (
                    <TableRow key={user.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{user.firstName} {user.lastName}</span>
                          <span className="text-sm text-muted-foreground">ID: {user.id}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className="font-medium">${user.balance?.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.isActive ? 'default' : 'destructive'}>
                          {user.isActive ? 'Active' : 'Suspended'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.isVerified ? 'default' : 'secondary'}>
                          {user.isVerified ? 'Verified' : 'Unverified'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {new Date(user.createdAt || new Date()).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setSelectedUser(user)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>User Details</DialogTitle>
                                <DialogDescription>
                                  Detailed information about {user.firstName} {user.lastName}
                                </DialogDescription>
                              </DialogHeader>
                              {selectedUser && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <span className="text-sm font-medium">Full Name:</span>
                                      <p>{selectedUser.firstName} {selectedUser.lastName}</p>
                                    </div>
                                    <div>
                                      <span className="text-sm font-medium">Email:</span>
                                      <p>{selectedUser.email}</p>
                                    </div>
                                    <div>
                                      <span className="text-sm font-medium">Balance:</span>
                                      <p>${selectedUser.balance?.toLocaleString()}</p>
                                    </div>
                                    <div>
                                      <span className="text-sm font-medium">Phone:</span>
                                      <p>{selectedUser.phone || 'Not provided'}</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          
                          {user.isActive ? (
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleSuspendUser(user._id)}
                            >
                              <UserX className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              onClick={() => handleActivateUser(user._id)}
                            >
                              <UserCheck className="w-4 h-4" />
                            </Button>
                          )}
                          
                          {!user.isVerified && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleVerifyUser(user._id)}
                            >
                              <Shield className="w-4 h-4" />
                            </Button>
                          )}
                          
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => openDeleteModal(user)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <DeleteUserModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setUserToDelete(null);
        }}
        onConfirm={handleDeleteUser}
        userName={userToDelete ? `${userToDelete.firstName} ${userToDelete.lastName}` : ''}
        isLoading={deleteLoading}
      />
    </div>
  );
};