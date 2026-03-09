import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useGetDashboardStatsQuery, useGetUsersQuery, useGetAllTransactionsQuery, useGetAllInvestmentsQuery, useProcessTransactionMutation, useUpdateUserBalanceMutation } from '@/store/adminApi';
import { useGetPackagesQuery } from '@/store/packagesApi';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity,
  CheckCircle,
  XCircle,
  UserPlus,
  Package,
  Settings
} from 'lucide-react';

export const AdminDashboard = () => {
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState('');
  const [fundAmount, setFundAmount] = useState('');
  const [fundType, setFundType] = useState<'add' | 'subtract'>('add');
  
  const { data: dashboardStats, isLoading: statsLoading } = useGetDashboardStatsQuery();
  const { data: usersData } = useGetUsersQuery({ limit: 100 });
  const { data: transactionsData } = useGetAllTransactionsQuery({ status: 'pending' });
  const { data: allTransactionsData } = useGetAllTransactionsQuery({ limit: 10 });
  const { data: investmentsData } = useGetAllInvestmentsQuery({ limit: 10 });
  const { data: packagesData } = useGetPackagesQuery({ active: true });
  const [processTransaction] = useProcessTransactionMutation();
  const [updateUserBalance] = useUpdateUserBalanceMutation();
  
  const stats = dashboardStats?.data;
  const users = usersData?.data || [];
  const pendingTransactionsData = transactionsData?.data || [];
  const recentTransactions = allTransactionsData?.data || [];
  const investments = investmentsData?.data || [];
  const packages = packagesData?.data || [];

  const handleApproveTransaction = async (id: string) => {
    try {
      await processTransaction({ id, status: 'approved' }).unwrap();
      toast({
        title: "Transaction Approved",
        description: "Transaction has been successfully approved.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.data?.message || "Failed to approve transaction",
        variant: "destructive",
      });
    }
  };

  const handleRejectTransaction = async (id: string) => {
    try {
      await processTransaction({ id, status: 'rejected', adminNotes: 'Rejected by admin' }).unwrap();
      toast({
        title: "Transaction Rejected",
        description: "Transaction has been rejected.",
        variant: "destructive",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.data?.message || "Failed to reject transaction",
        variant: "destructive",
      });
    }
  };

  const handleFundUser = async () => {
    if (!selectedUser || !fundAmount) return;
    
    try {
      await updateUserBalance({
        id: selectedUser,
        amount: parseFloat(fundAmount),
        type: fundType,
        reason: `${fundType === 'add' ? 'Credit' : 'Debit'} by admin`,
        silent: false
      }).unwrap();
      
      toast({
        title: "User Balance Updated",
        description: `Successfully ${fundType === 'add' ? 'added' : 'deducted'} $${fundAmount} ${fundType === 'add' ? 'to' : 'from'} user's wallet.`,
      });
      setSelectedUser('');
      setFundAmount('');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.data?.message || "Failed to update user balance",
        variant: "destructive",
      });
    }
  };

  // Remove the duplicate localStorage code since we're using real backend data

  if (statsLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <Badge variant="secondary" className="px-3 py-1 pulse">
          Super Admin
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats?.users?.total || 0}</div>
            <p className="text-xs text-muted-foreground">+{stats?.users?.newThisMonth || 0} this month</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats?.investments?.active || 0}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${(stats?.investments?.totalAmount || 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Platform total</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${(stats?.transactions?.totalDeposits || 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total deposits</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="packages">Packages</TabsTrigger>
          <TabsTrigger value="fund">Fund Users</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats?.growth?.monthly || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Investment Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={stats?.growth?.investments || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="investments" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Pending Transactions</CardTitle>
              <CardDescription>Review and approve pending transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingTransactionsData.map((transaction) => (
                    <TableRow key={transaction._id}>
                      <TableCell className="font-medium">
                        {transaction.userId?.firstName} {transaction.userId?.lastName}
                      </TableCell>
                      <TableCell>
                        <Badge variant={transaction.type === 'deposit' ? 'default' : 'secondary'}>
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell>${transaction.amount?.toLocaleString() || '0'}</TableCell>
                      <TableCell className="capitalize">{transaction.method}</TableCell>
                      <TableCell>{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleApproveTransaction(transaction._id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleRejectTransaction(transaction._id)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Verified</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.filter((user: any) => user.role === 'user').map((user: any) => (
                    <TableRow key={user._id}>
                      <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>${user.balance?.toLocaleString() || '0'}</TableCell>
                      <TableCell>
                        <Badge variant={user.isActive ? 'default' : 'destructive'}>
                          {user.isActive ? 'Active' : 'Suspended'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.isVerified ? 'default' : 'secondary'}>
                          {user.isVerified ? 'Verified' : 'Unverified'}
                        </Badge>
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button size="sm" variant="outline">
                          {user.isActive ? 'Suspend' : 'Activate'}
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investments">
          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Investment Monitoring</CardTitle>
              <CardDescription>Monitor and manage user investments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Investment ID</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Current Value</TableHead>
                    <TableHead>ROI</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {investments.map((investment: any) => {
                    const roi = investment.currentValue && investment.amount ? 
                      ((investment.currentValue - investment.amount) / investment.amount * 100).toFixed(2) : '0.00';
                    
                    return (
                      <TableRow key={investment._id}>
                        <TableCell className="font-medium">{investment._id?.slice(-8)}</TableCell>
                        <TableCell>
                          {investment.userId?.firstName} {investment.userId?.lastName}
                        </TableCell>
                        <TableCell>{investment.packageId?.name || 'N/A'}</TableCell>
                        <TableCell>${investment.amount?.toLocaleString() || '0'}</TableCell>
                        <TableCell>${investment.currentValue?.toLocaleString() || investment.amount?.toLocaleString() || '0'}</TableCell>
                        <TableCell className="text-green-500">+{roi}%</TableCell>
                        <TableCell>
                          <Badge variant={investment.status === 'active' ? 'default' : 'secondary'}>
                            {investment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {investments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <div className="text-muted-foreground">
                          <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                          <p>No investments found</p>
                          <p className="text-sm">Investment data will appear here</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="packages">
          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Investment Packages</CardTitle>
              <CardDescription>Create and manage investment packages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mb-4">
                    <Package className="w-4 h-4 mr-2" />
                    Create New Package
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Investment Package</DialogTitle>
                    <DialogDescription>Create a new investment package for users</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="packageName">Package Name</Label>
                      <Input id="packageName" placeholder="e.g., Premium Package" />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Package description..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="minAmount">Minimum Amount ($)</Label>
                        <Input id="minAmount" type="number" placeholder="1000" />
                      </div>
                      <div>
                        <Label htmlFor="maxAmount">Maximum Amount ($)</Label>
                        <Input id="maxAmount" type="number" placeholder="10000" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="duration">Duration (days)</Label>
                        <Input id="duration" type="number" placeholder="30" />
                      </div>
                      <div>
                        <Label htmlFor="roi">ROI (%)</Label>
                        <Input id="roi" type="number" placeholder="25" />
                      </div>
                    </div>
                    <Button className="w-full">Create Package</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Min Amount</TableHead>
                    <TableHead>Max Amount</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>ROI</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packages.map((pkg: any) => (
                    <TableRow key={pkg._id}>
                      <TableCell className="font-medium">{pkg.name}</TableCell>
                      <TableCell>${pkg.minAmount?.toLocaleString() || '0'}</TableCell>
                      <TableCell>${pkg.maxAmount?.toLocaleString() || '0'}</TableCell>
                      <TableCell>{pkg.duration} days</TableCell>
                      <TableCell>{pkg.roi}%</TableCell>
                      <TableCell>
                        <Badge variant={pkg.isActive ? 'default' : 'secondary'}>
                          {pkg.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="destructive">
                          {pkg.isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {packages.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="text-muted-foreground">
                          <Package className="w-12 h-12 mx-auto mb-4" />
                          <p>No packages found</p>
                          <p className="text-sm">Package data will appear here</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fund">
          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Fund User Wallet</CardTitle>
              <CardDescription>Add funds directly to a user's wallet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="userId">Select User</Label>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.filter((user: any) => user.role === 'user').map((user: any) => (
                      <SelectItem key={user._id} value={user._id}>
                        {user.firstName} {user.lastName} - {user.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amount">Amount ($)</Label>
                <Input 
                  id="amount" 
                  type="number" 
                  placeholder="Enter amount"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                />
              </div>
              <Button onClick={handleFundUser} disabled={!selectedUser || !fundAmount}>
                <DollarSign className="w-4 h-4 mr-2" />
                Fund User
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};