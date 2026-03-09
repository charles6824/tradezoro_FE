import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageSkeleton } from '@/components/ui/page-skeleton';
import { useToast } from '@/hooks/use-toast';
import { useGetAllInvestmentsQuery } from '@/store/adminApi';
import { 
  TrendingUp, 
  CheckCircle,
  Search,
  DollarSign,
  Calendar,
  Eye,
  Loader2
} from 'lucide-react';

export const AdminInvestmentsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: investmentsData, isLoading, error } = useGetAllInvestmentsQuery({
    limit: 100,
    ...(statusFilter !== 'all' && { status: statusFilter })
  });

  const investments = investmentsData?.data || [];

  const filteredInvestments = investments.filter(investment => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      investment._id?.toLowerCase().includes(searchLower) ||
      investment.userId?.firstName?.toLowerCase().includes(searchLower) ||
      investment.userId?.lastName?.toLowerCase().includes(searchLower) ||
      investment.userId?.email?.toLowerCase().includes(searchLower)
    );
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'completed':
        return <Badge className="bg-green-600">Completed</Badge>;
      case 'paused':
        return <Badge variant="secondary">Paused</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

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

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Investment Monitoring</h1>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="px-3 py-1">
            {filteredInvestments.length} Investments
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            Total Value: ${filteredInvestments.reduce((sum, inv) => sum + inv.currentValue, 0).toLocaleString()}
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {investments.filter(inv => inv.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              ${investments.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${investments.reduce((sum, inv) => sum + (inv.currentValue - inv.amount), 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            All Investments
          </CardTitle>
          <CardDescription>Monitor and manage user investments and ROI completion</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by user ID or investment ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Investment ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Current Value</TableHead>
                <TableHead>ROI</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvestments.map((investment) => {
                const roi = investment.currentValue && investment.amount ? 
                  ((investment.currentValue - investment.amount) / investment.amount * 100).toFixed(2) : '0.00';
                const startDate = new Date(investment.createdAt);
                const daysRunning = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <TableRow key={investment._id} className="hover:bg-muted/50">
                    <TableCell className="font-medium font-mono text-xs">
                      {investment._id?.slice(-8)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {investment.userId?.firstName} {investment.userId?.lastName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {investment.userId?.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{investment.packageId?.name || 'N/A'}</TableCell>
                    <TableCell className="font-medium">
                      ${investment.amount?.toLocaleString() || '0'}
                    </TableCell>
                    <TableCell className="font-medium">
                      ${investment.currentValue?.toLocaleString() || investment.amount?.toLocaleString() || '0'}
                    </TableCell>
                    <TableCell className="text-green-600 font-medium">
                      +{roi}%
                    </TableCell>
                    <TableCell>{getStatusBadge(investment.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{daysRunning} days</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(`/admin/investments/${investment._id}`)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredInvestments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <div className="text-muted-foreground">
                      <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                      <p>No investments found</p>
                      <p className="text-sm">Investment data will appear here when users make investments</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};