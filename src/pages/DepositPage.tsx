import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { Copy, CreditCard, Wallet, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { PAYMENT_ADDRESSES } from '@/utils/paymentConfig';
import { useGetTransactionsQuery, useCreateDepositMutation } from '@/store/transactionsApi';
import { useGetUserProfileQuery } from '@/store/userApi';

export const DepositPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { user, updateUser } = useAuth();
  const { data: userProfileData } = useGetUserProfileQuery();
  const currentUser = userProfileData?.data || user;
  const [depositAmount, setDepositAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<'tether' | 'solana' | 'trx'>('tether');
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const { data: transactionsData = { data: [] }, isLoading } = useGetTransactionsQuery({ type: 'deposit' });
  const [createDeposit, { isLoading: isCreatingDeposit }] = useCreateDepositMutation();

  const minDeposit = 100;
  const transactions = transactionsData.data || [];

  // Set default selected method on mount
  useEffect(() => {
    setSelectedMethod('tether');
  }, []);

  const handleDeposit = () => {
    if (!depositAmount || parseFloat(depositAmount) < minDeposit) {
      toast({
        title: "Invalid Amount",
        description: `Minimum deposit amount is $${minDeposit}`,
        variant: "destructive",
      });
      return;
    }

    if (!selectedMethod) {
      toast({
        title: "Select Payment Method",
        description: "Please select a payment method to continue",
        variant: "destructive",
      });
      return;
    }

    setShowPaymentDetails(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Wallet address copied to clipboard",
    });
  };

  const confirmDeposit = async () => {
    try {
      await createDeposit({
        amount: parseFloat(depositAmount),
        method: 'crypto',
        walletAddress: PAYMENT_ADDRESSES[selectedMethod],
        reference: `${selectedMethod.toUpperCase()}_DEPOSIT_${Date.now()}`
      }).unwrap();

      toast({
        title: "Deposit Request Submitted",
        description: `Your deposit of $${depositAmount} has been submitted and is pending approval.`,
      });
      
      setShowPaymentDetails(false);
      setDepositAmount('');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.data?.message || "Failed to submit deposit request",
        variant: "destructive",
      });
    }
  };

  const recentDeposits = Array.isArray(transactions) ? transactions.slice(0, 5) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">{t('depositTitle')}</h1>
        <Badge variant="outline" className="px-3 py-1">
          {t('minimumDeposit')}: ${minDeposit}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Deposit Form */}
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              {t('depositTitle')}
            </CardTitle>
            <CardDescription>
              {t('depositSubtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="amount">{t('depositAmount')} ($)</Label>
              <Input
                id="amount"
                type="number"
                placeholder={`${t('minimumDeposit')} $${minDeposit}`}
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="text-lg"
              />
              {depositAmount && parseFloat(depositAmount) >= minDeposit && (
                <p className="text-sm text-green-500 mt-1">
                  ✓ Valid deposit amount
                </p>
              )}
            </div>

            <Tabs value={selectedMethod} onValueChange={(value) => setSelectedMethod(value as 'tether' | 'solana' | 'trx')}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tether">Tether (USDT)</TabsTrigger>
                <TabsTrigger value="solana">Solana (SOL)</TabsTrigger>
                <TabsTrigger value="trx">Tron (TRX)</TabsTrigger>
              </TabsList>

              <TabsContent value="tether" className="space-y-4">
                <div className="p-4 bg-muted/20 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="w-4 h-4 text-green-500" />
                    <span className="font-medium">Tether (USDT)</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Send USDT to our Tether address. Confirmation takes 3-5 minutes.
                  </p>
                  <div className="bg-background/50 p-3 rounded border border-green-500/20">
                    <div className="flex items-center justify-between">
                      <code className="text-sm text-green-400 break-all">{PAYMENT_ADDRESSES.tether}</code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(PAYMENT_ADDRESSES.tether)}
                        className="ml-2 shrink-0"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Confirmation: 3-5 minutes</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="solana" className="space-y-4">
                <div className="p-4 bg-muted/20 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="w-4 h-4 text-purple-500" />
                    <span className="font-medium">Solana (SOL)</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Send SOL to our Solana address. Confirmation takes 3-5 minutes.
                  </p>
                  <div className="bg-background/50 p-3 rounded border border-purple-500/20">
                    <div className="flex items-center justify-between">
                      <code className="text-sm text-purple-400 break-all">{PAYMENT_ADDRESSES.solana}</code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(PAYMENT_ADDRESSES.solana)}
                        className="ml-2 shrink-0"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Confirmation: 3-5 minutes</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="trx" className="space-y-4">
                <div className="p-4 bg-muted/20 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="w-4 h-4 text-red-500" />
                    <span className="font-medium">Tron (TRX)</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Send TRX to our Tron address. Confirmation takes 3-5 minutes.
                  </p>
                  <div className="bg-background/50 p-3 rounded border border-red-500/20">
                    <div className="flex items-center justify-between">
                      <code className="text-sm text-red-400 break-all">{PAYMENT_ADDRESSES.trx}</code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(PAYMENT_ADDRESSES.trx)}
                        className="ml-2 shrink-0"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Confirmation: 3-5 minutes</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Button 
              className="w-full" 
              size="lg"
              onClick={handleDeposit}
              disabled={!depositAmount || parseFloat(depositAmount) < minDeposit || isCreatingDeposit}
            >
              {isCreatingDeposit ? 'Processing...' : `Proceed to Deposit $${depositAmount || '0'}`}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Deposits */}
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>{t('depositHistory')}</CardTitle>
            <CardDescription>Your latest deposit transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDeposits.length > 0 ? (
                recentDeposits.map((deposit) => (
                  <div key={deposit._id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Wallet className="w-4 h-4 text-primary" />
                      <div>
                        <p className="font-medium">${deposit.amount.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground capitalize">{deposit.method}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={deposit.status === 'approved' ? 'default' : deposit.status === 'pending' ? 'secondary' : 'destructive'}>
                        {deposit.status}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(deposit.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Wallet className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No deposits yet</p>
                  <p className="text-sm text-muted-foreground">Your deposit history will appear here</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Details Dialog */}
      <Dialog open={showPaymentDetails} onOpenChange={setShowPaymentDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deposit</DialogTitle>
            <DialogDescription>
              Review your deposit details before proceeding
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted/20 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Amount</Label>
                  <p className="text-lg font-bold">${depositAmount}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Method</Label>
                  <p className="text-lg font-medium capitalize">{selectedMethod}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <p className="text-sm font-medium mb-2">Important Instructions:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Send exactly ${depositAmount} worth of {selectedMethod?.toUpperCase()} to the provided address</li>
                <li>• Do not send any other cryptocurrency</li>
                <li>• Your deposit will be credited after network confirmation (3-5 minutes)</li>
                <li>• Contact support if you don't see your deposit within 1 hour</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowPaymentDetails(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={confirmDeposit} className="flex-1" disabled={isCreatingDeposit}>
                {isCreatingDeposit ? 'Submitting...' : 'Confirm Deposit'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};