import { useState } from 'react';
import { 
    useGetAdminReferralsQuery, 
    useUpdateAdminReferralMutation, 
    useDeleteAdminReferralMutation 
} from '@/store/referralsApi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Users } from 'lucide-react';

export const AdminReferralsPage = () => {
    const { data, isLoading, error } = useGetAdminReferralsQuery();
    const [updateAdminReferral, { isLoading: isUpdating }] = useUpdateAdminReferralMutation();
    const [deleteAdminReferral] = useDeleteAdminReferralMutation();
    const { toast } = useToast();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [newReferralCode, setNewReferralCode] = useState('');

    const openEditModal = (user: any) => {
        setSelectedUser(user);
        setNewReferralCode(user.referralCode || '');
        setIsEditModalOpen(true);
    };

    const handleUpdate = async () => {
        if (!newReferralCode.trim()) {
            toast({ title: 'Validation Error', description: 'Code cannot be empty', variant: 'destructive' });
            return;
        }
        try {
            await updateAdminReferral({ userId: selectedUser._id, referralCode: newReferralCode.trim() }).unwrap();
            toast({ title: 'Success', description: 'Referral code updated successfully' });
            setIsEditModalOpen(false);
            setNewReferralCode('');
        } catch (err: any) {
             toast({ title: 'Error', description: err.data?.message || err.message, variant: 'destructive' });
        }
    };

    const handleDelete = async (userId: string) => {
        if (confirm('Are you sure you want to delete this referral code? This cannot be undone.')) {
            try {
                await deleteAdminReferral(userId).unwrap();
                toast({ title: 'Success', description: 'Referral code deleted successfully' });
            } catch (err: any) {
                toast({ title: 'Error', description: err.data?.message || err.message, variant: 'destructive' });
            }
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertTitle>Error Loading Data</AlertTitle>
                <AlertDescription>Failed to load admin referrals data.</AlertDescription>
            </Alert>
        );
    }

    const users = data?.data || [];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Referrals & Affiliates</h1>
                    <p className="text-muted-foreground mt-1 text-sm">Manage user referral codes and view their networks.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>User Referral Accounts</CardTitle>
                    <CardDescription>All registered users and their referral statistics</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left align-middle text-slate-600">
                            <thead className="text-xs uppercase bg-slate-50 font-semibold text-slate-500 border-y border-slate-200">
                                <tr>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4 text-center">Referral Code</th>
                                    <th className="px-6 py-4 text-center">Total Referrals</th>
                                    <th className="px-6 py-4">Joined</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {users.map((user: any) => (
                                    <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900">{user.firstName} {user.lastName}</div>
                                            <div className="text-xs text-slate-500">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {user.referralCode ? (
                                                <Badge variant="outline" className="font-mono bg-slate-100 border-slate-300">
                                                    {user.referralCode}
                                                </Badge>
                                            ) : (
                                                <span className="text-slate-400 italic text-xs">Not Set</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <Badge variant="secondary" className="px-3 bg-primary/10 text-primary hover:bg-primary/20">
                                                <Users className="w-3 h-3 mr-1" />
                                                {user.referredCount || 0}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button 
                                                    variant="outline" 
                                                    size="sm" 
                                                    className="h-8"
                                                    onClick={() => openEditModal(user)}
                                                >
                                                    <Edit2 className="w-4 h-4 mr-1" />
                                                    Edit
                                                </Button>
                                                {user.referralCode && (
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm" 
                                                        className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                        onClick={() => handleDelete(user._id)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Referral Code</DialogTitle>
                        <DialogDescription>
                            Update the referral code for {selectedUser?.firstName} {selectedUser?.lastName}.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="code">Referral Code</Label>
                            <Input 
                                id="code" 
                                value={newReferralCode} 
                                onChange={(e) => setNewReferralCode(e.target.value)}
                                placeholder="e.g. TRZ-CODE"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleUpdate} disabled={isUpdating}>
                            {isUpdating ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
