import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Users, Plus, Trash2, DollarSign, Database, Search, Download, ChevronLeft, ChevronRight, Pencil } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://tradezero-be.onrender.com';

const USERS_PER_PAGE = 10;

export const PublicReferralsPage = () => {
    const { toast } = useToast();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Toggle logic for referring users list
    const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set());
    const toggleExpand = (id: string) => {
        setExpandedUsers(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    // Filters & Pagination
    const [searchQuery, setSearchQuery] = useState('');
    const [dateFilter, setDateFilter] = useState('all'); // all, 24h, 7d, 30d
    const [currentPage, setCurrentPage] = useState(1);

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

    // Filter Logic
    const filteredUsers = useMemo(() => {
        let result = [...users];

        // Search Filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(user => 
                user.firstName?.toLowerCase().includes(query) || 
                user.lastName?.toLowerCase().includes(query) || 
                user.email?.toLowerCase().includes(query) ||
                user.referralCode?.toLowerCase().includes(query)
            );
        }

        // Date Filter (Using user's createdAt)
        if (dateFilter !== 'all') {
            const now = new Date().getTime();
            result = result.filter(user => {
                const joinedTime = new Date(user.createdAt).getTime();
                const diffHours = (now - joinedTime) / (1000 * 60 * 60);

                if (dateFilter === '24h') return diffHours <= 24;
                if (dateFilter === '7d') return diffHours <= 24 * 7;
                if (dateFilter === '30d') return diffHours <= 24 * 30;
                return true;
            });
        }

        return result;
    }, [users, searchQuery, dateFilter]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
    const currentUsers = filteredUsers.slice((currentPage - 1) * USERS_PER_PAGE, currentPage * USERS_PER_PAGE);

    // CSV Export
    const handleExportCSV = () => {
        if (filteredUsers.length === 0) {
            toast({ title: 'Empty', description: 'No data to export.' });
            return;
        }

        const headers = ['User ID', 'First Name', 'Last Name', 'Email', 'Referral Code', 'Balance', 'Referral Count', 'Rewarded Referral Count', 'Join Date'];
        const csvRows = [headers.join(',')];

        for (const u of filteredUsers) {
            const row = [
                u._id,
                `"${u.firstName || ''}"`,
                `"${u.lastName || ''}"`,
                `"${u.email || ''}"`,
                u.referralCode || '',
                u.balance || 0,
                u.referredUsers?.length || 0,
                u.rewardedReferrals || 0,
                new Date(u.createdAt).toISOString()
            ];
            csvRows.push(row.join(','));
        }

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `referral_network_export_${new Date().getTime()}.csv`;
        a.click();
        URL.revokeObjectURL(url);
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
                
                {/* Header & Description */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Database className="w-8 h-8 text-primary" />
                        <h1 className="text-3xl font-bold tracking-tight text-slate-100">Referral Network Accelerator</h1>
                    </div>
                    <p className="text-slate-400">
                        Marketer dashboard to visualize the referral network and manually boost user referral counts.
                    </p>
                </div>

                {/* Toolbar: Search, Filters, Export */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#0a1b12] p-4 rounded-lg border border-primary/20 shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <Input 
                                placeholder="Search Name, Email..." 
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                className="pl-9 bg-[#08150d] border-primary/20 text-slate-100 focus-visible:ring-primary w-full"
                            />
                        </div>
                        <Select value={dateFilter} onValueChange={(val) => { setDateFilter(val); setCurrentPage(1); }}>
                            <SelectTrigger className="w-full sm:w-[180px] bg-[#08150d] border-primary/20 text-slate-100">
                                <SelectValue placeholder="Onboarded Date" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#0a1b12] border-primary/20 text-slate-100">
                                <SelectItem value="all">All Time</SelectItem>
                                <SelectItem value="24h">Last 24 Hours</SelectItem>
                                <SelectItem value="7d">Last 7 Days</SelectItem>
                                <SelectItem value="30d">Last 30 Days</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    
                    <Button onClick={handleExportCSV} className="w-full sm:w-auto bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20">
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                    </Button>
                </div>

                {/* Users List */}
                {currentUsers.length === 0 ? (
                    <div className="text-center py-12 bg-[#0a1b12] border border-primary/20 rounded-lg">
                        <p className="text-slate-400">No users match your filters.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {currentUsers.map((user: any) => (
                            <Card key={user._id} className="overflow-hidden bg-[#0a1b12] border-primary/20 shadow-sm text-slate-100">
                                <CardHeader className="bg-primary/5 border-b border-primary/20 pb-4">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div className="flex-1 w-full overflow-hidden">
                                            <div className="flex items-center gap-3 mb-1">
                                                <CardTitle className="text-xl text-slate-100 truncate">{user.firstName} {user.lastName}</CardTitle>
                                                <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30 shrink-0">
                                                    {user.referralCode || 'No Code Found'}
                                                </Badge>
                                            </div>
                                            <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-400">
                                                <span className="truncate w-full sm:w-auto block">{user.email}</span>
                                                <span className="flex items-center gap-1 text-primary font-medium shrink-0">
                                                    <DollarSign className="w-3 h-3" /> 
                                                    Balance: ${user.balance?.toLocaleString() || 0}
                                                </span>
                                                <span className="text-orange-400 font-medium text-xs border border-orange-400/30 bg-orange-400/10 px-2 py-0.5 rounded-full shrink-0">
                                                    Rewarded: {user.rewardedReferrals || 0} / {user.referredUsers?.length || 0}
                                                </span>
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    {user.referredUsers?.length > 0 ? (
                                        <div className="flex flex-col">
                                            <div className="p-4 flex items-center justify-between text-slate-300">
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-5 h-5 text-primary" />
                                                    <span className="font-semibold text-slate-100">
                                                        {user.referredUsers.length} Referred {user.referredUsers.length === 1 ? 'User' : 'Users'}
                                                    </span>
                                                </div>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm" 
                                                    className="bg-[#08150d] border-primary/20 text-slate-300 hover:text-white"
                                                    onClick={() => toggleExpand(user._id)}
                                                >
                                                    {expandedUsers.has(user._id) ? 'Hide Emails' : 'View Emails'}
                                                </Button>
                                            </div>
                                            {expandedUsers.has(user._id) && (
                                                <div className="overflow-x-auto border-t border-primary/20">
                                                    <div className="min-w-[600px]">
                                                        <table className="w-full text-sm text-left align-middle text-slate-300">
                                                            <thead className="text-xs uppercase bg-[#08150d] font-semibold text-slate-400 border-b border-primary/20">
                                                                <tr>
                                                                    <th className="px-6 py-3">Referred User Name</th>
                                                                    <th className="px-6 py-3">Email</th>
                                                                    <th className="px-6 py-3">Join Date</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-primary/10 bg-[#0a1b12]">
                                                                {user.referredUsers.map((refUser: any) => (
                                                                    <tr key={refUser._id} className="hover:bg-primary/5 transition-colors">
                                                                        <td className="px-6 py-3 font-medium text-slate-100 max-w-[200px] truncate">
                                                                            {refUser.firstName} {refUser.lastName}
                                                                        </td>
                                                                        <td className="px-6 py-3 max-w-[200px] truncate">{refUser.email}</td>
                                                                        <td className="px-6 py-3 whitespace-nowrap">
                                                                            {new Date(refUser.createdAt).toLocaleDateString()}
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
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
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center py-4 bg-[#0a1b12] px-4 rounded-lg border border-primary/20">
                        <span className="text-sm text-slate-400">
                            Showing page <span className="text-slate-100 font-medium">{currentPage}</span> of <span className="text-slate-100 font-medium">{totalPages}</span>
                        </span>
                        <div className="flex gap-2">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="bg-[#08150d] border-primary/20 text-slate-300 hover:text-white"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(c => Math.max(1, c - 1))}
                            >
                                <ChevronLeft className="w-4 h-4 mr-1" /> Prev
                            </Button>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="bg-[#08150d] border-primary/20 text-slate-300 hover:text-white"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(c => Math.min(totalPages, c + 1))}
                            >
                                Next <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};
