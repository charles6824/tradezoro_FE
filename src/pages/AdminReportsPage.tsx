import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useGetDashboardStatsQuery, useGetAllInvestmentsQuery } from '@/store/adminApi';
import { useGetPackagesQuery } from '@/store/packagesApi';
import { 
  FileText, 
  Download,
  TrendingUp,
  Users,
  DollarSign,
  Package,
  Calendar,
  Loader2
} from 'lucide-react';

export const AdminReportsPage = () => {
  const { data: statsData, isLoading: statsLoading } = useGetDashboardStatsQuery();
  const { data: investmentsData, isLoading: investmentsLoading } = useGetAllInvestmentsQuery({ limit: 100 });
  const { data: packagesData, isLoading: packagesLoading } = useGetPackagesQuery();

  const isLoading = statsLoading || investmentsLoading || packagesLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const stats = statsData?.data;
  const investments = investmentsData?.data || [];
  const packages = packagesData?.data || [];

  const totalUsers = stats?.users?.total || 0;
  const totalInvested = stats?.investments?.totalAmount || 0;
  const totalReturns = investments.reduce((sum, inv) => sum + ((inv.currentValue || inv.amount) - inv.amount), 0);
  const activePackages = packages.filter(pkg => pkg.isActive).length;

  const packageDistribution = packages.map(pkg => {
    const packageInvestments = investments.filter(inv => inv.packageId?._id === pkg._id || inv.packageId === pkg._id);
    return {
      name: pkg.name,
      value: packageInvestments.length,
      amount: packageInvestments.reduce((sum, inv) => sum + inv.amount, 0)
    };
  });

  const monthlyData = stats?.growth?.monthly?.map((item, index) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][item._id - 1] || `Month ${item._id}`,
    users: item.users,
    investments: stats?.growth?.investments?.[index]?.investments || 0,
    returns: Math.floor((stats?.growth?.investments?.[index]?.investments || 0) * 0.15)
  })) || [];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${totalInvested.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalReturns.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Packages</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{activePackages}</div>
            <p className="text-xs text-muted-foreground">Ready for investment</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Monthly Growth Trends</CardTitle>
            <CardDescription>User acquisition and investment growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'users' ? value : `$${value.toLocaleString()}`,
                    name === 'users' ? 'Users' : name === 'investments' ? 'Investments' : 'Returns'
                  ]}
                />
                <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="investments" stroke="#82ca9d" strokeWidth={2} />
                <Line type="monotone" dataKey="returns" stroke="#ffc658" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Package Distribution</CardTitle>
            <CardDescription>Investment distribution across packages</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={packageDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {packageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Investment Performance</CardTitle>
            <CardDescription>Monthly investment and returns comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Bar dataKey="investments" fill="hsl(var(--primary))" name="Investments" />
                <Bar dataKey="returns" fill="#22c55e" name="Returns" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Top Performing Packages</CardTitle>
            <CardDescription>Packages ranked by total investment amount</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-[600px] px-4 sm:px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Package</TableHead>
                      <TableHead>Investors</TableHead>
                      <TableHead>Total Amount</TableHead>
                      <TableHead>ROI</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {packageDistribution.map((pkg, index) => (
                      <TableRow key={pkg.name}>
                        <TableCell className="font-medium whitespace-nowrap">{pkg.name}</TableCell>
                        <TableCell>{pkg.value}</TableCell>
                        <TableCell>${pkg.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="default">
                            {packages.find((p: any) => p.name === pkg.name)?.roi || 0}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Statistics */}
      <Card className="bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Platform Summary
          </CardTitle>
          <CardDescription>Complete platform performance overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h4 className="font-medium text-blue-600 mb-2">User Engagement</h4>
              <div className="space-y-1 text-sm">
                <p>Active Users: <span className="font-medium">{totalUsers}</span></p>
                <p>Avg. Investment: <span className="font-medium">${totalUsers > 0 ? (totalInvested / totalUsers).toLocaleString() : '0'}</span></p>
                <p>User Retention: <span className="font-medium">92%</span></p>
              </div>
            </div>

            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <h4 className="font-medium text-green-600 mb-2">Financial Performance</h4>
              <div className="space-y-1 text-sm">
                <p>Platform Revenue: <span className="font-medium">${(totalReturns * 0.1).toLocaleString()}</span></p>
                <p>ROI Rate: <span className="font-medium">{totalInvested > 0 ? ((totalReturns / totalInvested) * 100).toFixed(1) : '0'}%</span></p>
                <p>Profit Margin: <span className="font-medium">25%</span></p>
              </div>
            </div>

            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <h4 className="font-medium text-purple-600 mb-2">Growth Metrics</h4>
              <div className="space-y-1 text-sm">
                <p>Monthly Growth: <span className="font-medium">+12%</span></p>
                <p>New Investments: <span className="font-medium">+18%</span></p>
                <p>Market Share: <span className="font-medium">4.2%</span></p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};