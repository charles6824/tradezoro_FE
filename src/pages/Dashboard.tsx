import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { useGetUserBalanceQuery, useGetUserProfileQuery } from '@/store/userApi';
import { useGetInvestmentsQuery, useGetInvestmentStatsQuery } from '@/store/investmentsApi';
import { useGetTransactionsQuery, useCancelTransactionMutation } from '@/store/transactionsApi';
import { mockCryptoPrices } from '@/utils/mockData';
import { useTranslation } from 'react-i18next';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  CreditCard, 
  DollarSign, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  EyeOff,
  Copy,
  Check,
  RefreshCw
} from 'lucide-react';

export const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: balanceData, refetch: refetchBalance } = useGetUserBalanceQuery();
  const { data: userProfileData, refetch: refetchProfile } = useGetUserProfileQuery();
  const currentUser = userProfileData?.data || user;
  const { data: investmentsData } = useGetInvestmentsQuery({ limit: 5 });
  const { data: investmentStats } = useGetInvestmentStatsQuery();
  const { data: transactionsData, refetch: refetchTransactions } = useGetTransactionsQuery({ limit: 5 });
  const [showBalance, setShowBalance] = useState(true);
  const [showSetupBanner, setShowSetupBanner] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [cancelTransaction, { isLoading: isCanceling }] = useCancelTransactionMutation();
  const [animatedValues, setAnimatedValues] = useState({
    balance: 0,
    totalInvested: 0,
    totalReturns: 0,
    activeInvestments: 0
  });

  const balance = currentUser?.balance || balanceData?.balance || 0;
  const investments = investmentsData?.data || [];
  const transactions = transactionsData?.data || [];
  
  // Calculate stats from actual investment data
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalReturns = investments.reduce((sum, inv) => {
    const pkg:any = inv.packageId;
    const daysPassed = Math.floor((Date.now() - new Date(inv.createdAt).getTime()) / (1000 * 60 * 60 * 24));
    const totalDays = pkg?.duration || 30;
    const dailyReturn = (inv.amount * (pkg?.roi || 0) / 100) / totalDays;
    const currentEarnings = dailyReturn * Math.min(daysPassed, totalDays);
    return sum + currentEarnings;
  }, 0);
  const activeInvestments = investments.length;

  // Refresh balance function
  const handleRefreshBalance = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([refetchBalance(), refetchProfile(), refetchTransactions()]);
    } catch (error) {
      console.error('Failed to refresh balance:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Check profile setup on mount
  useEffect(() => {
    if (user && !user.hasCompletedSetup) {
      setShowSetupBanner(true);
    }
  }, [user]);

  // Copy wallet ID function
  const copyWalletId = async () => {
    if (currentUser?.walletId) {
      await navigator.clipboard.writeText(currentUser.walletId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this pending transaction?')) return;
    try {
      await cancelTransaction(id).unwrap();
      // Optional toast here if imported, but avoiding extra imports to keep it simple and clean
    } catch (error) {
      console.error('Failed to cancel transaction:', error);
    }
  };

  // Animate values on mount
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setAnimatedValues({
        balance: Math.floor(balance * progress * 100) / 100,
        totalInvested: Math.floor(totalInvested * progress * 100) / 100,
        totalReturns: Math.floor(totalReturns * progress * 100) / 100,
        activeInvestments: Math.floor(activeInvestments * progress)
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [balance, totalInvested, totalReturns, activeInvestments]);

  const statsData = [
    {
      title: t('totalBalance'),
      value: showBalance ? `$${animatedValues.balance.toLocaleString()}` : '****',
      icon: Wallet,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: t('availableBalance')
    },
    {
      title: t('totalInvested'),
      value: `$${animatedValues.totalInvested.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-crypto-green',
      bgColor: 'bg-crypto-green/10',
      description: 'Across all packages'
    },
    {
      title: t('totalEarnings'),
      value: `$${animatedValues.totalReturns.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-gold',
      bgColor: 'bg-gold/10',
      description: 'Profit earned'
    },
    {
      title: t('activeInvestments'),
      value: animatedValues.activeInvestments.toString(),
      icon: Activity,
      color: 'text-neon-cyan',
      bgColor: 'bg-neon-cyan/10',
      description: 'Currently running',
      onClick: () => {
          const el = document.getElementById('active-investments-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t('welcomeBack')}, {user?.firstName}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
           Refer 20 active traders to earn $1000
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <Button onClick={() => navigate('/dashboard/deposit')} className="bg-primary hover:brightness-110 text-background-dark font-bold shadow-sm">
              Deposit
            </Button>
            <Button onClick={() => navigate('/dashboard/packages')} className="bg-primary hover:brightness-110 text-background-dark font-bold shadow-sm">
              Invest Now
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefreshBalance}
            disabled={isRefreshing}
            className="text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowBalance(!showBalance)}
            className="text-muted-foreground hover:text-foreground"
          >
            {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </Button>
          {currentUser?.isVerified && (
            <Badge className="bg-success/10 text-success border-success/20">
              ✓ Verified
            </Badge>
          )}
        </div>
      </div>

      {/* Wallet ID Card */}
      <Card className="crypto-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Your Wallet ID</p>
              <p className="font-mono text-lg font-semibold">{currentUser?.walletId}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={copyWalletId}
              className="flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card 
            key={index} 
            className={`crypto-card ${stat.onClick ? 'cursor-pointer hover:border-primary/30 transition-colors' : ''}`}
            onClick={stat.onClick}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Crypto Prices */}
        <Card className="crypto-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Live Crypto Prices
            </CardTitle>
            <CardDescription>
              Real-time cryptocurrency market data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCryptoPrices.slice(0, 4).map((crypto) => (
                <div key={crypto.symbol} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-foreground">
                        {crypto.symbol.substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{crypto.symbol}</p>
                      <p className="text-xs text-muted-foreground">{crypto.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">
                      ${crypto.price.toLocaleString()}
                    </p>
                    <p className={`text-xs flex items-center gap-1 ${
                      crypto.change >= 0 ? 'text-crypto-green' : 'text-crypto-red'
                    }`}>
                      {crypto.change >= 0 ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {crypto.changePercent.toFixed(2)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Investments */}
        <Card id="active-investments-section" className="crypto-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              {t('activeInvestments')}
            </CardTitle>
            <CardDescription>
              Your current investment portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {investments.length > 0 ? (
                investments.map((investment) => {
                const pkg:any = investment.packageId;
                const daysPassed = Math.floor((Date.now() - new Date(investment.createdAt).getTime()) / (1000 * 60 * 60 * 24));
                const totalDays = pkg?.duration || 30;
                const progress = Math.min((daysPassed / totalDays) * 100, 100);
                const dailyReturn = (investment.amount * (pkg?.roi || 0) / 100) / totalDays;
                const currentEarnings = dailyReturn * Math.min(daysPassed, totalDays);
                const currentValue = investment.amount + currentEarnings;
                const endDate = new Date(investment.createdAt);
                endDate.setDate(endDate.getDate() + totalDays);
                
                return (
                  <div key={investment._id} className="p-4 rounded-lg bg-muted/50 space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-foreground">
                          {pkg?.name || 'Investment Package'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ${investment.amount.toLocaleString()} invested • {investment.status}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-crypto-green">
                          ${currentValue.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          +${currentEarnings.toFixed(2)} profit
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Started: {new Date(investment.createdAt).toLocaleDateString()}</span>
                      <span>Ends: {endDate.toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })
              ) : null}
              
              {investments.length === 0 && (
                <div className="text-center py-8">
                  <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No investments found</p>
                  <Button className="mt-2" size="sm">
                    Start Investing
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="crypto-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            {t('recentTransactions')}
          </CardTitle>
          <CardDescription>
            Your latest account activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.length > 0 ? (
              transactions.slice(0, 5).map((transaction: any) => (
                <div key={transaction._id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === 'deposit' ? 'bg-crypto-green/10' :
                      transaction.type === 'withdrawal' ? 'bg-crypto-red/10' :
                      transaction.type === 'investment' ? 'bg-primary/10' :
                      'bg-gold/10'
                    }`}>
                      {transaction.type === 'deposit' && <ArrowUpRight className="w-4 h-4 text-crypto-green" />}
                      {transaction.type === 'withdrawal' && <ArrowDownRight className="w-4 h-4 text-crypto-red" />}
                      {transaction.type === 'investment' && <TrendingUp className="w-4 h-4 text-primary" />}
                      {transaction.type === 'return' && <DollarSign className="w-4 h-4 text-gold" />}
                    </div>
                    <div>
                      <p className="font-medium text-foreground capitalize">
                        {transaction.type}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.method} • {new Date(transaction.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <p className={`font-medium ${
                      transaction.type === 'deposit' || transaction.type === 'return' 
                        ? 'text-crypto-green' 
                        : 'text-foreground'
                    }`}>
                      {transaction.type === 'deposit' || transaction.type === 'return' ? '+' : ''}
                      ${transaction.amount.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2">
                       {transaction.status === 'pending' && (
                         <button
                           onClick={() => handleCancel(transaction._id)}
                         disabled={isCanceling}
                         className="text-xs text-red-500 hover:text-red-400 font-medium"
                       >
                         Cancel
                         </button>
                      )}
                      <Badge 
                        variant={
                          transaction.status === 'approved' ? 'secondary' :
                          transaction.status === 'pending' ? 'outline' : 'destructive'
                        }
                        className="text-xs"
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No transactions yet</p>
                <p className="text-sm text-muted-foreground">Your transaction history will appear here</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {showSetupBanner && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md bg-yellow-400 border border-yellow-300 rounded-lg p-4 flex items-center justify-between gap-4 shadow-xl">
          <p className="text-sm font-semibold text-yellow-900">Complete your profile to unlock all features.</p>
          <div className="flex gap-2 shrink-0">
            <Button size="sm" variant="ghost" className="text-yellow-800 hover:text-yellow-900 hover:bg-yellow-300 font-medium" onClick={() => setShowSetupBanner(false)}>Later</Button>
            <Button size="sm" className="bg-yellow-900 hover:bg-yellow-800 text-yellow-100 font-semibold" onClick={() => navigate('/dashboard/setup')}>Complete Setup</Button>
          </div>
        </div>
      )}
    </div>
  );
};