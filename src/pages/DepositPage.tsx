import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { Copy, Wallet, Clock, Coins, AlertCircle } from 'lucide-react';
import { useGetTransactionsQuery, useCreateDepositMutation, useCancelTransactionMutation } from '@/store/transactionsApi';

interface CryptoMethod {
  name: string;
  address: string;
  barcodeUrl: string;
}

export const DepositPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [depositAmount, setDepositAmount] = useState('');
  
  // Tracking by selected array INDEX instead of string
  const [selectedMethodIdx, setSelectedMethodIdx] = useState<number>(0);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  
  const { data: transactionsData = { data: [] }, isLoading } = useGetTransactionsQuery({ type: 'deposit' });
  const [createDeposit, { isLoading: isCreatingDeposit }] = useCreateDepositMutation();
  const [cancelTransaction, { isLoading: isCanceling }] = useCancelTransactionMutation();
  
  // N-length array mapping active coins
  const [methods, setMethods] = useState<CryptoMethod[]>([]);
  const [minDeposit, setMinDeposit] = useState<number>(100);
  const transactions = transactionsData.data || [];

  useEffect(() => {
    fetchPaymentConfig();
  }, []);

  const fetchPaymentConfig = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://tradezero-be.onrender.com';
      
      const [response, settingsResponse] = await Promise.all([
          fetch(`${apiUrl}/api/settings/payment-addresses`),
          fetch(`${apiUrl}/api/settings`)
      ]);

      if (settingsResponse.ok) {
          const settingsObj = await settingsResponse.json();
          if (settingsObj?.data?.minDepositAmount) {
              setMinDeposit(Number(settingsObj.data.minDepositAmount));
          }
      }

      if (response.ok) {
        const data = await response.json();
        
        // Dynamically parse the methods array. If legacy object, fallback mapping.
        if (Array.isArray(data)) {
            setMethods(data);
        } else if (data.tether || data.solana || data.trx) {
            setMethods([
                { name: 'Tether (USDT)', address: data.tether, barcodeUrl: data.tetherBarcode },
                { name: 'Solana (SOL)', address: data.solana, barcodeUrl: data.solanaBarcode },
                { name: 'Tron (TRX)', address: data.trx, barcodeUrl: data.trxBarcode }
            ].filter(m => m.address));
        }
      }
    } catch (error) {
      console.error('Error fetching payment configs:', error);
    }
  };

  const handleDeposit = () => {
    if (!depositAmount || parseFloat(depositAmount) < minDeposit) {
      toast({
        title: "Invalid Amount",
        description: `Minimum deposit amount is $${minDeposit}`,
        variant: "destructive",
      });
      return;
    }

    if (methods.length === 0) {
      toast({
        title: "No Methods Available",
        description: "Payment methods are currently unavailable.",
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
      const activeMethod = methods[selectedMethodIdx];
      
      await createDeposit({
        amount: parseFloat(depositAmount),
        method: 'crypto',
        walletAddress: activeMethod.address || '',
        reference: `${activeMethod.name.toUpperCase().replace(/\s/g, '_')}_DEPOSIT_${Date.now()}`
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

  const handleCancel = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this pending deposit?')) return;
    try {
      await cancelTransaction(id).unwrap();
      toast({
        title: "Cancelled",
        description: "Your pending deposit was cancelled successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.data?.message || "Failed to cancel deposit",
        variant: "destructive",
      });
    }
  };

  const recentDeposits = Array.isArray(transactions) ? transactions.slice(0, 5) : [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-foreground">{t('depositTitle')}</h1>
        <Badge variant="outline" className="px-3 py-1 shrink-0">
          {t('minimumDeposit')}: ${minDeposit}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Deposit Form */}
        <Card className="bg-card/50 backdrop-blur shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-indigo-500" />
              {t('depositTitle')}
            </CardTitle>
            <CardDescription>
              {t('depositSubtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">{t('depositAmount')} ($)</Label>
              <Input
                id="amount"
                type="number"
                placeholder={`${t('minimumDeposit')} $${minDeposit}`}
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="text-lg border-slate-200 focus-visible:ring-indigo-500"
              />
              {depositAmount && parseFloat(depositAmount) >= minDeposit && (
                <p className="text-sm text-green-500 font-medium">
                  ✓ Valid deposit amount
                </p>
              )}
            </div>

            {methods.length > 0 ? (
                <Tabs value={selectedMethodIdx.toString()} onValueChange={(val) => setSelectedMethodIdx(parseInt(val))}>
                    <TabsList className="flex flex-wrap h-auto gap-1 bg-slate-100/50 p-1 w-full justify-start">
                        {methods.map((method, index) => (
                            <TabsTrigger 
                                key={index} 
                                value={index.toString()}
                                className="flex-1 min-w-[120px] data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
                            >
                                {method.name || `Coin ${index + 1}`}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {methods.map((method, index) => (
                        <TabsContent key={index} value={index.toString()} className="space-y-4 mt-4">
                            <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="flex items-center gap-2 mb-3">
                                    <Coins className="w-5 h-5 text-indigo-500" />
                                    <span className="font-semibold text-slate-800">{method.name || 'Deposit'}</span>
                                </div>
                                <p className="text-sm text-slate-500 mb-4">
                                    Send {(method.name || 'crypto').toUpperCase()} to the following address. Confirmation takes 3-5 minutes.
                                </p>
                                <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                                    <code className="text-sm text-indigo-600 break-all font-mono font-medium">{method.address}</code>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => copyToClipboard(method.address)}
                                        className="shrink-0 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>
                                {method.barcodeUrl && (
                                    <div className="mt-6 flex justify-center">
                                        <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                                            <img src={method.barcodeUrl} alt={`${method.name} Barcode`} className="w-48 h-48 object-contain" />
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center justify-center gap-2 mt-4 text-xs font-medium text-amber-600 bg-amber-50 py-2 rounded-lg">
                                    <Clock className="w-4 h-4" />
                                    <span>Confirmation time: 3-5 minutes</span>
                                </div>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            ) : (
                <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl">
                    <p className="text-slate-500 text-sm">No payment methods are currently active.</p>
                </div>
            )}

            <Button 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm" 
              size="lg"
              onClick={handleDeposit}
              disabled={!depositAmount || parseFloat(depositAmount) < minDeposit || isCreatingDeposit || methods.length === 0}
            >
              {isCreatingDeposit ? 'Processing...' : `Proceed to Deposit $${depositAmount || '0'}`}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Deposits Logging */}
        <Card className="bg-card/50 backdrop-blur shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle>{t('depositHistory')}</CardTitle>
            <CardDescription>Your latest deposit transactions</CardDescription>
          </CardHeader>
          <CardContent className="p-0 sm:p-6 sm:pt-0">
            <div className="space-y-1 sm:space-y-4">
              {recentDeposits.length > 0 ? (
                recentDeposits.map((deposit) => (
                  <div key={deposit._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-3 bg-white sm:bg-slate-50 sm:rounded-lg border-b sm:border border-slate-100 gap-3">
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="mt-1 sm:mt-0 p-2 bg-indigo-50 rounded-full shrink-0">
                        <Wallet className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">${deposit.amount.toLocaleString()}</p>
                        <p className="text-xs text-slate-500">Method: {deposit.method === 'crypto' ? 'Crypto' : deposit.method}</p>
                        <p className="text-xs text-slate-400 sm:hidden mt-1">{new Date(deposit.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-2 sm:mt-0">
                      <Badge className="shrink-0" variant={deposit.status === 'approved' ? 'default' : deposit.status === 'pending' ? 'secondary' : 'destructive'}>
                        {deposit.status}
                      </Badge>
                      <div className="flex items-center gap-3 sm:mt-1">
                        <span className="text-xs text-slate-400 hidden sm:block">
                          {new Date(deposit.createdAt).toLocaleDateString()}
                        </span>
                        {deposit.status === 'pending' && (
                          <button
                            onClick={() => handleCancel(deposit._id)}
                            disabled={isCanceling}
                            className="text-xs text-red-500 hover:text-red-600 underline-offset-2 hover:underline font-medium"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-100 m-4 sm:m-0">
                  <Wallet className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="font-medium text-slate-600">No deposits yet</p>
                  <p className="text-sm text-slate-400">Your transaction history will appear here</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Confirmation Dialog */}
      <Dialog open={showPaymentDetails} onOpenChange={setShowPaymentDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deposit Details</DialogTitle>
            <DialogDescription>
              Review your transaction breakdown before finalizing.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-slate-500">Amount to fund</Label>
                  <p className="text-xl font-bold text-slate-900">${depositAmount}</p>
                </div>
                <div>
                  <Label className="text-sm text-slate-500">Selected Coin</Label>
                  <p className="text-lg font-semibold text-indigo-700 truncate">
                      {methods[selectedMethodIdx]?.name || 'Crypto'}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl shadow-sm">
              <p className="text-sm font-semibold text-orange-800 mb-2 flex items-center gap-2">
                 <AlertCircle className="w-4 h-4" /> Important Execution Protocol:
              </p>
              <ul className="text-sm text-orange-700/90 space-y-1.5 ml-6 list-disc">
                <li>Send exactly <strong>${depositAmount}</strong> equivalent mapping to the {methods[selectedMethodIdx]?.name} address.</li>
                <li>Transmitting alternative coins will result in permanent loss.</li>
                <li>Ledger confirmation automatically credits within 3-5 minutes.</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowPaymentDetails(false)} className="flex-1 border-slate-200 hover:bg-slate-50">
                Go Back
              </Button>
              <Button onClick={confirmDeposit} className="flex-1 bg-indigo-600 hover:bg-indigo-700 shadow-sm" disabled={isCreatingDeposit}>
                {isCreatingDeposit ? 'Transmitting...' : 'Confirm Deposit'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};