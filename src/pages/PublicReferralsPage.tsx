import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Database } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://tradezero-be.onrender.com';

export const PublicReferralsPage = () => {
    const { toast } = useToast();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set());

    const toggleExpand = (id: string) => {
        setExpandedUsers(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
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
        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="p-6 max-w-2xl mx-auto space-y-3">
                {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-dark py-8 px-4 text-slate-100 dark">
            <div className="max-w-2xl mx-auto space-y-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Database className="w-8 h-8 text-primary" />
                        <h1 className="text-3xl font-bold tracking-tight text-slate-100">Referral Network Accelerator</h1>
                    </div>
                    <p className="text-slate-400">
                        Marketer dashboard to visualize the referral network and manually boost user referral counts.
                    </p>
                </div>
                {users.length === 0 ? (
                    <p className="text-center text-slate-400 py-12">No referrals found.</p>
                ) : (
                    users.map((user: any) => (
                        <div key={user._id} className="bg-[#0a1b12] border border-primary/20 rounded-lg overflow-hidden">
                            <button
                                className="w-full text-left px-4 py-3 hover:bg-primary/5 transition-colors"
                                onClick={() => toggleExpand(user._id)}
                            >
                                <span className="font-medium text-slate-100">
                                    {user.firstName} {user.lastName}
                                </span>
                                <span className="text-slate-400 ml-2 text-sm">
                                    {user.referredUsers?.length || 0} referrals
                                </span>
                            </button>
                            {expandedUsers.has(user._id) && user.referredUsers?.length > 0 && (
                                <div className="border-t border-primary/20 px-4 py-2 space-y-1">
                                    {user.referredUsers.map((ref: any) => (
                                        <p key={ref._id} className="text-sm text-slate-300 py-1">{ref.email}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
