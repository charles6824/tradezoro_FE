import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useGetAllInvestmentsQuery, useCompleteInvestmentMutation, useActivateInvestmentMutation } from '@/store/adminApi';
import { InvestmentPackage, User } from '@/types/auth';
import { ArrowLeft, User as UserIcon, Package, Calendar, DollarSign, TrendingUp, Clock, Loader2, CheckCircle, Play } from 'lucide-react';
import { toast } from 'sonner';

export const AdminInvestmentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: investmentsData, isLoading, error } = useGetAllInvestmentsQuery({ limit: 1000 });
  const [completeInvestment, { isLoading: isCompleting }] = useCompleteInvestmentMutation();
  const [activateInvestment, { isLoading: isActivating }] = useActivateInvestmentMutation();
  const investment = investmentsData?.data?.find(inv => inv._id === id);

  const handleComplete = async () => {
    if (!investment?._id) return;
    try {
      await completeInvestment(investment._id).unwrap();
      toast.success('Investment completed successfully');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to complete investment');
    }
  };

  const handleActivate = async () => {
    if (!investment?._id) return;
    try {
      await activateInvestment(investment._id).unwrap();
      toast.success('Investment activated successfully');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to activate investment');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !investment) {
    return (
      <div className="text-center text-red-500 p-8">
        Investment not found or error loading details.
      </div>
    );
  }
  const pkg = investment.packageId as InvestmentPackage;
  const user = investment.userId as User;
  
  const daysPassed = Math.floor((Date.now() - new Date(investment.createdAt).getTime()) / (1000 * 60 * 60 * 24));
  const totalDays = pkg?.duration || 30;
  const progress = Math.min((daysPassed / totalDays) * 100, 100);
  const dailyReturn = (investment.amount * (pkg?.roi || 0) / 100) / totalDays;
  const currentEarnings = dailyReturn * Math.min(daysPassed, totalDays);
  const currentValue = investment.amount + currentEarnings;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Investment Details</h1>
        <div className="ml-auto flex gap-2">
          {investment?.status === 'pending' && (
            <Button onClick={handleActivate} disabled={isActivating} variant="default">
              {isActivating ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Play className="w-4 h-4 mr-2" />
              )}
              Activate
            </Button>
          )}
          {(investment?.status === 'active' || investment?.status === 'pending') && (
            <Button onClick={handleComplete} disabled={isCompleting}>
              {isCompleting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4 mr-2" />
              )}
              Mark as Complete
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="w-5 h-5" />
              Investor Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span className="font-medium">{user?.firstName} {user?.lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">{user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Investment ID:</span>
              <span className="font-mono text-sm">{investment._id}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Package Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Package:</span>
              <span className="font-medium">{pkg?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ROI:</span>
              <span className="font-medium text-green-600">{pkg?.roi}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration:</span>
              <span className="font-medium">{pkg?.duration} days</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Investment Overview
            </span>
            <Badge variant={investment.status === 'active' ? 'default' : 'secondary'}>
              {investment.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <p className="text-sm text-muted-foreground">Invested Amount</p>
              <p className="text-2xl font-bold">${investment.amount.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <p className="text-sm text-muted-foreground">Current Value</p>
              <p className="text-2xl font-bold text-primary">${currentValue.toFixed(2)}</p>
            </div>
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Earnings</p>
              <p className="text-2xl font-bold text-green-600">${currentEarnings.toFixed(2)}</p>
            </div>
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <p className="text-sm text-muted-foreground">Daily Return</p>
              <p className="text-2xl font-bold text-green-600">${dailyReturn.toFixed(2)}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Day {daysPassed}/{totalDays}</span>
              <span>{Math.max(0, totalDays - daysPassed)} days remaining</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Start Date:</span>
              <span>{new Date(investment.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">End Date:</span>
              <span>{new Date(new Date(investment.createdAt).getTime() + totalDays * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};