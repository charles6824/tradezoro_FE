import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Trash2, ArrowUpRight, DollarSign, Database } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://tradezero-be.onrender.com';

export const PublicReferralsPage = () => {
    const { toast } = useToast();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/api/public-referrals`);
            if (!res.ok) throw new Error('Failed to fetch users');
            const data = await res.json();
            setUsers(data.data || []);
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddReferral = async (userId: string) => {
        try {
            setActionLoading(`add-${userId}`);
            const res = await fetch(`${API_URL}/api/public-referrals/${userId}/add`, { method: 'POST' });
            if (!res.ok) throw new Error('Failed to add referral');
            toast({ title: 'Success', description: 'Referral added successfully. Rewards updated if threshold met.' });
            fetchUsers();
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        } finally {
            setActionLoading(null);
        }
    };

    const handleDeleteReferral = async (referralId: string) => {
        if (!confirm('Are you sure you want to delete this specific referral user?')) return;
        try {
            setActionLoading(`del-${referralId}`);
            const res = await fetch(`${API_URL}/api/public-referrals/delete/${referralId}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete referral');
            toast({ title: 'Success', description: 'Referral user removed.' });
            fetchUsers();
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) {
        return (
            <div className="p-8 max-w-6xl mx-auto space-y-4">
                <Skeleton className="h-12 w-1/3" />
                <Skeleton className="h-[600px] w-full" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-dark py-8 px-4 sm:px-6 lg:px-8 text-slate-100 dark">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Database className="w-8 h-8 text-primary" />
                        <h1 className="text-3xl font-bold tracking-tight text-slate-100">Referral Network Accelerator</h1>
                    </div>
                    <p className="text-slate-400">
                        Marketer dashboard to visualize the referral network and manually boost user referral counts.
                    </p>
                </div>

                {users.map((user: any) => (
                    <Card key={user._id} className="overflow-hidden bg-[#0a1b12] border-primary/20 shadow-sm text-slate-100">
                        <CardHeader className="bg-primary/5 border-b border-primary/20 pb-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <CardTitle className="text-xl text-slate-100">{user.firstName} {user.lastName}</CardTitle>
                                        <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30">
                                            {user.referralCode || 'No Code Found'}
                                        </Badge>
                                    </div>
                                    <CardDescription className="mt-1 flex items-center gap-4 text-slate-400">
                                        <span>{user.email}</span>
                                        <span className="flex items-center gap-1 text-primary font-medium">
                                            <DollarSign className="w-3 h-3" /> 
                                            User Balance: ${user.balance?.toLocaleString() || 0}
                                        </span>
                                        <span className="text-orange-400 font-medium text-xs border border-orange-400/30 bg-orange-400/10 px-2 py-0.5 rounded-full">
                                            Rewarded Progress: {user.rewardedReferrals || 0}
                                        </span>
                                    </CardDescription>
                                </div>
                                <Button 
                                    onClick={() => handleAddReferral(user._id)}
                                    disabled={actionLoading === `add-${user._id}`}
                                    className="bg-primary text-background-dark hover:brightness-110 shadow-sm font-bold"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    {actionLoading === `add-${user._id}` ? 'Adding...' : 'Add Referral'}
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            {user.referredUsers?.length > 0 ? (
                                <table className="w-full text-sm text-left align-middle text-slate-300">
                                    <thead className="text-xs uppercase bg-[#08150d] font-semibold text-slate-400 border-b border-primary/20">
                                        <tr>
                                            <th className="px-6 py-3">Referred User Name</th>
                                            <th className="px-6 py-3">Email</th>
                                            <th className="px-6 py-3">Join Date</th>
                                            <th className="px-6 py-3 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-primary/10 bg-[#0a1b12]">
                                        {user.referredUsers.map((refUser: any) => (
                                            <tr key={refUser._id} className="hover:bg-primary/5 transition-colors">
                                                <td className="px-6 py-3 font-medium text-slate-100">
                                                    {refUser.firstName} {refUser.lastName}
                                                </td>
                                                <td className="px-6 py-3">{refUser.email}</td>
                                                <td className="px-6 py-3">
                                                    {new Date(refUser.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-3 text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                                        onClick={() => handleDeleteReferral(refUser._id)}
                                                        disabled={actionLoading === `del-${refUser._id}`}
                                                    >
                                                        {actionLoading === `del-${refUser._id}` ? '...' : <Trash2 className="w-4 h-4" />}
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-8 text-center bg-[#0a1b12] flex flex-col items-center justify-center">
                                    <Users className="w-8 h-8 text-slate-600 mb-2" />
                                    <p className="text-slate-400">No referrals found for this user yet.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
