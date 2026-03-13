import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';
import { TransactionDetailsModal } from '@/components/ui/transaction-details-modal';
import { PageSkeleton } from '@/components/ui/page-skeleton';
import { useToast } from '@/hooks/use-toast';
import { useGetAllTransactionsQuery, useProcessTransactionMutation } from '@/store/adminApi';
import { 
  CreditCard, 
  CheckCircle,
  XCircle,
  Search,
  Download,
  Loader2,
  Eye
} from 'lucide-react';

export const AdminTransactionsPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [confirmAction, setConfirmAction] = useState<{open: boolean, type: 'approve' | 'reject', transaction: any}>({open: false, type: 'approve', transaction: null});
  const [viewTransaction, setViewTransaction] = useState<{open: boolean, transaction: any}>({open: false, transaction: null});

  const { data: transactionsData, isLoading, error } = useGetAllTransactionsQuery({
    page,
    limit: 20,
    ...(statusFilter !== 'all' && { status: statusFilter }),
    ...(typeFilter !== 'all' && { type: typeFilter })
  });

  const [processTransaction, { isLoading: isProcessing }] = useProcessTransactionMutation();

  const handleViewTransaction = (transaction: any) => {
    setViewTransaction({open: true, transaction});
  };

  const handleApproveTransaction = (transaction: any) => {
    setConfirmAction({open: true, type: 'approve', transaction});
  };

  const handleRejectTransaction = (transaction: any) => {
    setConfirmAction({open: true, type: 'reject', transaction});
  };

  const confirmTransactionAction = async () => {
    if (!confirmAction.transaction) return;

    try {
      await processTransaction({ 
        id: confirmAction.transaction._id, 
        status: confirmAction.type === 'approve' ? 'approved' : 'rejected', 
        adminNotes: `${confirmAction.type === 'approve' ? 'Approved' : 'Rejected'} by admin` 
      }).unwrap();
      
      toast({
        title: `Transaction ${confirmAction.type === 'approve' ? 'Approved' : 'Rejected'}`,
        description: `Transaction has been successfully ${confirmAction.type === 'approve' ? 'approved' : 'rejected'}.`,
        variant: confirmAction.type === 'reject' ? 'destructive' : 'default'
      });
      
      setConfirmAction({open: false, type: 'approve', transaction: null});
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${confirmAction.type} transaction`,
        variant: "destructive",
      });
    }
  };

  const transactions = transactionsData?.data || [];
  const filteredTransactions = transactions.filter((transaction:any) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      transaction.userId?.firstName?.toLowerCase().includes(searchLower) ||
      transaction.userId?.lastName?.toLowerCase().includes(searchLower) ||
      transaction.userId?.email?.toLowerCase().includes(searchLower) ||
      transaction.method?.toLowerCase().includes(searchLower) ||
      transaction.reference?.toLowerCase().includes(searchLower)
    );
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'processing':
        return <Badge variant="outline">Processing</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, "default" | "destructive" | "secondary" | "outline"> = {
      deposit: 'default',
      withdrawal: 'secondary',
      investment: 'outline',
      return: 'default',
      bonus: 'default'
    };
    return (
      <Badge variant={colors[type] || 'outline'}>
        {type}
      </Badge>
    );
  };

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-8">
        Error loading transactions. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-foreground">Transaction Management</h1>
        <Badge variant="secondary" className="px-3 py-1">
          {filteredTransactions.length} Transactions
        </Badge>
      </div>

      <Card className="bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            All Transactions
          </CardTitle>
          <CardDescription>Review, approve, and manage all platform transactions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by user ID or method..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction: any) => (
                <TableRow key={transaction._id} className="hover:bg-muted/50">
                  <TableCell className="font-medium font-mono text-xs">
                    {transaction.reference || transaction._id?.slice(-8)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {transaction.userId?.firstName} {transaction.userId?.lastName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {transaction.userId?.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                  <TableCell className="font-medium">
                    ${transaction.amount?.toLocaleString() || 0}
                  </TableCell>
                  <TableCell className="capitalize">{transaction.method}</TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewTransaction(transaction)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {transaction.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            onClick={() => handleApproveTransaction(transaction)}
                            className="bg-green-600 hover:bg-green-700"
                            disabled={isProcessing}
                          >
                            {isProcessing ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <CheckCircle className="w-4 h-4" />
                            )}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleRejectTransaction(transaction)}
                            disabled={isProcessing}
                          >
                            {isProcessing ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                          </Button>
                        </>
                      )}
                      {transaction.status !== 'pending' && (
                        <span className="text-xs text-muted-foreground ml-2">
                          {transaction.processedBy?.firstName ? 
                            `By ${transaction.processedBy.firstName}` : 
                            'Processed'
                          }
                        </span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredTransactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ConfirmationModal
        open={confirmAction.open}
        onOpenChange={(open) => setConfirmAction(prev => ({...prev, open}))}
        title={`${confirmAction.type === 'approve' ? 'Approve' : 'Reject'} Transaction`}
        description={`Are you sure you want to ${confirmAction.type} this ${confirmAction.transaction?.type} transaction of $${confirmAction.transaction?.amount?.toLocaleString()}?`}
        confirmText={confirmAction.type === 'approve' ? 'Approve' : 'Reject'}
        onConfirm={confirmTransactionAction}
        isLoading={isProcessing}
        variant={confirmAction.type === 'reject' ? 'destructive' : 'default'}
      />

      <TransactionDetailsModal
        open={viewTransaction.open}
        onOpenChange={(open) => setViewTransaction(prev => ({...prev, open}))}
        transaction={viewTransaction.transaction}
      />
    </div>
  );
};