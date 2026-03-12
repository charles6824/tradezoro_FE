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

    const handleAddDummy = async (userId: string) => {
        try {
            setActionLoading(`add-${userId}`);
            const res = await fetch(`${API_URL}/api/public-referrals/${userId}/add`, { method: 'POST' });
            if (!res.ok) throw new Error('Failed to add dummy referral');
            toast({ title: 'Success', description: 'Dummy referral added. Rewards updated if threshold met.' });
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
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Database className="w-8 h-8 text-indigo-600" />
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Referrals System Debugger</h1>
                    </div>
                    <p className="text-slate-500">
                        Unauthenticated global view of all user referrals. Use this interface to arbitrarily inject dummy referrals 
                        and test the automatic $1000 reward system logic.
                    </p>
                </div>

                {users.map((user: any) => (
                    <Card key={user._id} className="overflow-hidden border-indigo-100 shadow-sm">
                        <CardHeader className="bg-indigo-50/50 border-b border-indigo-100 pb-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <CardTitle className="text-xl">{user.firstName} {user.lastName}</CardTitle>
                                        <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                                            {user.referralCode || 'No Code Found'}
                                        </Badge>
                                    </div>
                                    <CardDescription className="mt-1 flex items-center gap-4">
                                        <span>{user.email}</span>
                                        <span className="flex items-center gap-1 text-green-600 font-medium">
                                            <DollarSign className="w-3 h-3" /> 
                                            User Balance: ${user.balance?.toLocaleString() || 0}
                                        </span>
                                        <span className="text-orange-600 font-medium text-xs border border-orange-200 bg-orange-50 px-2 py-0.5 rounded-full">
                                            Rewarded Progress: {user.rewardedReferrals || 0}
                                        </span>
                                    </CardDescription>
                                </div>
                                <Button 
                                    onClick={() => handleAddDummy(user._id)}
                                    disabled={actionLoading === `add-${user._id}`}
                                    className="bg-indigo-600 hover:bg-indigo-700 shadow-sm"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    {actionLoading === `add-${user._id}` ? 'Adding...' : 'Inject Dummy Referral'}
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            {user.referredUsers?.length > 0 ? (
                                <table className="w-full text-sm text-left align-middle text-slate-600">
                                    <thead className="text-xs uppercase bg-white font-semibold text-slate-400 border-b border-slate-100">
                                        <tr>
                                            <th className="px-6 py-3">Referred User Name</th>
                                            <th className="px-6 py-3">Email</th>
                                            <th className="px-6 py-3">Join Date</th>
                                            <th className="px-6 py-3 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 bg-white">
                                        {user.referredUsers.map((refUser: any) => (
                                            <tr key={refUser._id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-3 font-medium text-slate-700">
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
                                                        className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
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
                                <div className="p-8 text-center bg-white flex flex-col items-center justify-center">
                                    <Users className="w-8 h-8 text-slate-300 mb-2" />
                                    <p className="text-slate-500">No referrals found for this user yet.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
