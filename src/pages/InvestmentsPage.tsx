import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useAuth } from '@/hooks/useAuth';
import { useGetInvestmentsQuery } from '@/store/investmentsApi';
import { PageSkeleton } from '@/components/ui/page-skeleton';
import { mockCryptoPrices } from '@/utils/mockData';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Target, Activity, Bitcoin, BarChart3, Loader2 } from 'lucide-react';

export const InvestmentsPage = () => {
  const { user } = useAuth();
  const { data: investmentsData, isLoading, error } = useGetInvestmentsQuery();
  const [cryptoChart, setCryptoChart] = useState<any[]>([]);

  const investments = investmentsData?.data || [];

  useEffect(() => {
    // Generate mock crypto chart data
    const chartData = [];
    const basePrice = 45000;
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const variation = Math.sin(i * 0.1) * 2000 + Math.random() * 1000 - 500;
      chartData.push({
        date: date.toISOString().split('T')[0],
        price: basePrice + variation,
        portfolio: basePrice + variation * 1.2
      });
    }
    setCryptoChart(chartData);
  }, []);

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-8">
        Error loading investments. Please try again.
      </div>
    );
  }

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalCurrentValue = investments.reduce((sum, inv) => {
    const daysPassed = Math.floor((Date.now() - new Date(inv.createdAt).getTime()) / (1000 * 60 * 60 * 24));
    const dailyReturn = (inv.amount * (inv.packageId?.roi || 0) / 100) / (inv.packageId?.duration || 1);
    return sum + inv.amount + (dailyReturn * Math.min(daysPassed, inv.packageId?.duration || 0));
  }, 0);
  
  const totalProfit = totalCurrentValue - totalInvested;
  const profitPercentage = totalInvested > 0 ? ((totalProfit / totalInvested) * 100) : 0;

  const activeInvestments = investments.filter(inv => inv.status === 'active');
  const completedInvestments = investments.filter(inv => inv.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">My Investments</h1>
        <Badge variant="outline" className="px-3 py-1">
          {investments.length} Total Investments
        </Badge>
      </div>

      {/* Portfolio Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalInvested.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Principal amount</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${totalCurrentValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Including earnings</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
            {totalProfit >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              ${Math.abs(totalProfit).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {profitPercentage >= 0 ? '+' : ''}{profitPercentage.toFixed(2)}%
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{activeInvestments.length}</div>
            <p className="text-xs text-muted-foreground">Currently earning</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bitcoin className="w-5 h-5 text-orange-500" />
              Crypto Market Trend
            </CardTitle>
            <CardDescription>Bitcoin price movement (30 days)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={cryptoChart}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis fontSize={12} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value: any) => [`$${value.toLocaleString()}`, 'BTC Price']}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#f7931a" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Portfolio Performance
            </CardTitle>
            <CardDescription>Your investment portfolio growth</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={cryptoChart}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis fontSize={12} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value: any) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                />
                <Area 
                  type="monotone" 
                  dataKey="portfolio" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Live Crypto Prices */}
      <Card className="bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle>Live Crypto Prices</CardTitle>
          <CardDescription>Real-time cryptocurrency market data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockCryptoPrices.map((crypto) => (
              <div key={crypto.symbol} className="p-4 bg-muted/20 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {crypto.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium">{crypto.symbol}</p>
                      <p className="text-xs text-muted-foreground">{crypto.name}</p>
                    </div>
                  </div>
                  <Badge variant={crypto.changePercent >= 0 ? 'default' : 'destructive'}>
                    {crypto.changePercent >= 0 ? '+' : ''}{crypto.changePercent.toFixed(2)}%
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">${crypto.price.toLocaleString()}</p>
                  <p className={`text-sm ${crypto.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {crypto.change >= 0 ? '+' : ''}${crypto.change.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Investment Details */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {investments.length > 0 ? (
          investments.map((investment) => {
            const pkg = investment.packageId;
            const daysPassed = Math.floor((Date.now() - new Date(investment.createdAt).getTime()) / (1000 * 60 * 60 * 24));
            const totalDays = pkg?.duration || 30;
            const progress = Math.min((daysPassed / totalDays) * 100, 100);
            const dailyReturn = (investment.amount * (pkg?.roi || 0) / 100) / totalDays;
            const currentEarnings = dailyReturn * Math.min(daysPassed, totalDays);
            const currentValue = investment.amount + currentEarnings;
            const endDate = new Date(investment.createdAt);
            endDate.setDate(endDate.getDate() + totalDays);

            return (
              <Card key={investment._id} className="bg-card/50 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{pkg?.name}</CardTitle>
                    <Badge variant={investment.status === 'active' ? 'default' : 'secondary'}>
                      {investment.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    Investment ID: {investment._id}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Invested</p>
                      <p className="text-lg font-bold">${investment.amount.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-muted/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Current Value</p>
                      <p className="text-lg font-bold text-primary">${currentValue.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Day {daysPassed}/{totalDays}</span>
                      <span>{Math.max(0, totalDays - daysPassed)} days remaining</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <p className="text-muted-foreground">Daily Return</p>
                      <p className="font-medium text-green-500">${dailyReturn.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Earnings</p>
                      <p className="font-medium text-green-500">${currentEarnings.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expected ROI</p>
                      <p className="font-medium">{pkg?.roi}%</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-muted">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Start Date:</span>
                      <span>{new Date(investment.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">End Date:</span>
                      <span>{endDate.toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card className="bg-card/50 backdrop-blur md:col-span-2">
            <CardContent className="text-center py-12">
              <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No Investments Yet</h3>
              <p className="text-muted-foreground mb-4">
                Start your crypto investment journey by choosing a package
              </p>
              <Button>
                Browse Packages
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};