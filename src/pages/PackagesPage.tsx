import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageSkeleton } from '@/components/ui/page-skeleton';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useGetPackagesQuery } from '@/store/packagesApi';
import { useCreateInvestmentMutation } from '@/store/investmentsApi';
import { useGetUserProfileQuery } from '@/store/userApi';
import { Package, TrendingUp, Clock, DollarSign, Wallet, AlertCircle, Loader2 } from 'lucide-react';

export const PackagesPage = () => {
  const { toast } = useToast();
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const { data: userProfileData } = useGetUserProfileQuery();
  const currentUser = userProfileData?.data || user;
  const { data: packagesData, isLoading, error } = useGetPackagesQuery({ active: true });
  const [createInvestment, { isLoading: isInvesting }] = useCreateInvestmentMutation();
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [showInvestDialog, setShowInvestDialog] = useState(false);

  const packages = packagesData?.data ? [...packagesData.data].sort((a, b) => a.minAmount - b.minAmount) : [];

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Investment Packages</h1>
        <p className="text-red-500">Failed to load packages. Please try again later.</p>
      </div>
    );
  }

  const handleInvestClick = (pkg: any) => {
    setSelectedPackage(pkg);
    setInvestmentAmount(pkg.minAmount.toString());
    setShowInvestDialog(true);
  };

  const handleInvest = async () => {
    const amount = parseFloat(investmentAmount);
    const userBalance = currentUser?.balance || 0;

    if (!amount || amount < selectedPackage.minAmount || amount > selectedPackage.maxAmount) {
      toast({
        title: "Invalid Amount",
        description: `Investment amount must be between $${selectedPackage.minAmount.toLocaleString()} and $${selectedPackage.maxAmount.toLocaleString()}`,
        variant: "destructive",
      });
      return;
    }

    if (amount > userBalance) {
      toast({
        title: "Insufficient Balance",
        description: "Your wallet balance is insufficient for this investment.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createInvestment({
        packageId: selectedPackage._id,
        amount
      }).unwrap();

      toast({
        title: "Investment Successful!",
        description: `You've invested $${amount.toLocaleString()} in ${selectedPackage.name}`,
      });

      setShowInvestDialog(false);
      setSelectedPackage(null);
      setInvestmentAmount('');
    } catch (error: any) {
      toast({
        title: "Investment Failed",
        description: error.data?.message || 'Failed to create investment',
        variant: "destructive",
      });
    }
  };

  const navigateToDeposit = () => {
    navigate('/dashboard/deposit');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Investment Packages</h1>
        <div className="flex gap-2">
          <Badge variant="outline" className="px-3 py-1">
            <Wallet className="w-4 h-4 mr-1" />
            Balance: ${currentUser?.balance?.toLocaleString() || '0'}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => {
          const dailyReturn = (pkg.roi / pkg.duration).toFixed(2);
          const isAffordable = (currentUser?.balance || 0) >= pkg.minAmount;
          
          return (
            <Card key={pkg._id} className={`bg-card/50 backdrop-blur relative overflow-hidden ${!pkg.isActive ? 'opacity-60' : ''}`}>
              {!pkg.isActive && (
                <div className="absolute top-4 right-4">
                  <Badge variant="destructive">Inactive</Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-5 h-5 text-primary" />
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                </div>
                <CardDescription className="text-sm">
                  {pkg.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/20 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-green-500 mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Total ROI</p>
                    <p className="text-lg font-bold text-green-500">{pkg.roi}%</p>
                  </div>
                  <div className="text-center p-3 bg-muted/20 rounded-lg">
                    <Clock className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="text-lg font-bold text-blue-500">{pkg.duration} days</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Daily Return:</span>
                    <span className="font-medium text-green-500">{dailyReturn}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Min Investment:</span>
                    <span className="font-medium">${pkg.minAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Max Investment:</span>
                    <span className="font-medium">${pkg.maxAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-muted">
                  <p className="text-xs text-muted-foreground mb-2">Investment Range</p>
                  <Progress value={50} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>${pkg.minAmount.toLocaleString()}</span>
                    <span>${pkg.maxAmount.toLocaleString()}</span>
                  </div>
                </div>

                {!isAffordable && pkg.isActive && (
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-yellow-700 dark:text-yellow-400">Insufficient Balance</p>
                        <p className="text-muted-foreground">
                          You need ${(pkg.minAmount - (currentUser?.balance || 0)).toLocaleString()} more to invest in this package.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  {pkg.isActive ? (
                    <>
                      {isAffordable ? (
                        <Button 
                          className="flex-1" 
                          onClick={() => handleInvestClick(pkg)}
                          disabled={isInvesting}
                        >
                          {isInvesting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <DollarSign className="w-4 h-4 mr-1" />
                              Invest Now
                            </>
                          )}
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={navigateToDeposit}
                        >
                          <Wallet className="w-4 h-4 mr-1" />
                          Fund Wallet
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button disabled className="flex-1">
                      Package Inactive
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Investment Dialog */}
      <Dialog open={showInvestDialog} onOpenChange={setShowInvestDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invest in {selectedPackage?.name}</DialogTitle>
            <DialogDescription>
              Choose your investment amount for this package
            </DialogDescription>
          </DialogHeader>
          
          {selectedPackage && (
            <div className="space-y-4">
              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">ROI</p>
                    <p className="font-bold text-green-500">{selectedPackage.roi}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-bold">{selectedPackage.duration} days</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Daily Return</p>
                    <p className="font-bold text-green-500">{((selectedPackage.roi / selectedPackage.duration)).toFixed(2)}%</p>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="investAmount">Investment Amount ($)</Label>
                <Input
                  id="investAmount"
                  type="number"
                  placeholder={`Min: $${selectedPackage.minAmount.toLocaleString()}`}
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  min={selectedPackage.minAmount}
                  max={Math.min(selectedPackage.maxAmount, currentUser?.balance || 0)}
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>Min: ${selectedPackage.minAmount.toLocaleString()}</span>
                  <span>Max: ${Math.min(selectedPackage.maxAmount, currentUser?.balance || 0).toLocaleString()}</span>
                </div>
              </div>

              {investmentAmount && parseFloat(investmentAmount) >= selectedPackage.minAmount && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="font-medium mb-2 text-green-700 dark:text-green-400">Investment Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Investment Amount:</span>
                      <span className="font-medium">${parseFloat(investmentAmount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expected Return:</span>
                      <span className="font-medium text-green-600">
                        ${(parseFloat(investmentAmount) * (selectedPackage.roi / 100)).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total Payout:</span>
                      <span className="text-green-600">
                        ${(parseFloat(investmentAmount) * (1 + selectedPackage.roi / 100)).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Daily Earnings:</span>
                      <span>
                        ${((parseFloat(investmentAmount) * (selectedPackage.roi / 100)) / selectedPackage.duration).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowInvestDialog(false)} className="flex-1">
                  Cancel
                </Button>
                <Button 
                  onClick={handleInvest} 
                  className="flex-1"
                  disabled={
                    isInvesting ||
                    !investmentAmount || 
                    parseFloat(investmentAmount) < selectedPackage.minAmount ||
                    parseFloat(investmentAmount) > Math.min(selectedPackage.maxAmount, currentUser?.balance || 0)
                  }
                >
                  {isInvesting ? 'Processing...' : 'Confirm Investment'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};