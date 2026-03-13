import { useGetUserReferralsQuery } from '@/store/referralsApi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Users, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const ReferralsPage = () => {
  const { data, isLoading, error } = useGetUserReferralsQuery();
  const { toast } = useToast();

  const handleCopyCode = () => {
    if (data?.referralCode) {
      navigator.clipboard.writeText(data.referralCode);
      toast({
        title: "Copied",
        description: "Referral code copied to clipboard",
      });
    }
  };

  const handleCopyLink = () => {
    if (data?.referralCode) {
      const link = `${window.location.origin}/register?ref=${data.referralCode}`;
      navigator.clipboard.writeText(link);
      toast({
        title: "Link Copied",
        description: "Referral link copied to clipboard",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error Loading Referrals</AlertTitle>
        <AlertDescription>Failed to load your referral data. Please refresh and try again.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Referrals</h1>
        <p className="text-slate-500 mt-2 text-lg">Refer 20 active traders to earn 1000$</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Referral Info Card */}
        <Card className="shadow-sm border-slate-200 bg-white">
          <CardHeader>
             <CardTitle className="text-xl flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Your Referral Link
             </CardTitle>
             <CardDescription>Share this code or link with your friends</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div>
                <p className="text-sm font-semibold mb-2 text-slate-700">Referral Code</p>
                <div className="flex bg-slate-50 rounded-xl p-3 border border-slate-200 items-center justify-between">
                    <span className="font-mono text-lg font-bold text-slate-800 tracking-wider">
                       {data.referralCode || "No code available"}
                    </span>
                    <button 
                       onClick={handleCopyCode}
                       className="p-2 hover:bg-slate-200 rounded-md transition-colors text-slate-500 hover:text-slate-700"
                    >
                        <Copy className="w-5 h-5" />
                    </button>
                </div>
             </div>
             
             <div>
                <p className="text-sm font-semibold mb-2 text-slate-700">Referable URL</p>
                 <div className="flex bg-slate-50 rounded-xl p-3 border border-slate-200 items-center justify-between overflow-hidden">
                    <span className="font-mono text-sm text-slate-600 truncate mr-3">
                       {`${window.location.origin}/register?ref=${data.referralCode}`}
                    </span>
                    <button 
                       onClick={handleCopyLink}
                       className="p-2 hover:bg-slate-200 rounded-md transition-colors text-slate-500 hover:text-slate-700 shrink-0"
                    >
                        <Copy className="w-5 h-5" />
                    </button>
                </div>
             </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card className="shadow-sm border-slate-200 bg-white flex flex-col justify-center">
            <CardContent className="pt-6 grid grid-cols-2 gap-6">
                <div className="text-center rounded-xl bg-slate-50 p-6 border border-slate-100 flex flex-col items-center justify-center">
                   <div className="bg-primary/10 p-3 rounded-full mb-4">
                       <Users className="w-8 h-8 text-primary" />
                   </div>
                   <h3 className="text-4xl font-black text-slate-900">{data.stats.totalReferred}</h3>
                   <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-wider">Total Referrals</p>
                </div>
                <div className="text-center rounded-xl bg-slate-50 p-6 border border-slate-100 flex flex-col items-center justify-center">
                   <div className="bg-emerald-100 p-3 rounded-full mb-4">
                       <CheckCircle className="w-8 h-8 text-emerald-600" />
                   </div>
                   <h3 className="text-4xl font-black text-slate-900">{data.stats.verifiedReferred}</h3>
                   <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-wider">Verified</p>
                </div>
            </CardContent>
        </Card>
      </div>

      {/* Referred Users Table */}
      <Card className="shadow-sm border-slate-200 overflow-hidden">
         <CardHeader>
             <CardTitle>Referred Users</CardTitle>
             <CardDescription>History of users who registered using your link</CardDescription>
         </CardHeader>
         <CardContent className="p-0">
             {data.referredUsers.length === 0 ? (
                 <div className="p-12 text-center flex flex-col items-center justify-center bg-slate-50">
                     <Users className="w-12 h-12 text-slate-300 mb-4" />
                     <p className="text-slate-500 text-lg">You haven't referred anyone yet.</p>
                     <p className="text-slate-400 mt-2">Share your link and get friends to sign up!</p>
                 </div>
             ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left align-middle text-slate-600">
                      <thead className="text-xs uppercase bg-slate-50 font-semibold text-slate-500 border-y border-slate-200">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Joined</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                          {data.referredUsers.map((user) => (
                             <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                                 <td className="px-6 py-4 font-medium text-slate-900">
                                     {user.firstName} {user.lastName}
                                 </td>
                                 <td className="px-6 py-4">
                                     {user.isVerified ? (
                                        <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">Verified</Badge>
                                     ) : (
                                        <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">Unverified</Badge>
                                     )}
                                 </td>
                                 <td className="px-6 py-4 text-right whitespace-nowrap">
                                     {new Date(user.createdAt).toLocaleDateString()}
                                 </td>
                             </tr>
                          ))}
                      </tbody>
                   </table>
                </div>
             )}
         </CardContent>
      </Card>
    </div>
  );
};
