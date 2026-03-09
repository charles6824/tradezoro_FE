import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CreditCard, User, Calendar, Hash, Wallet, FileText } from 'lucide-react';

interface TransactionDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: any;
}

export const TransactionDetailsModal = ({ open, onOpenChange, transaction }: TransactionDetailsModalProps) => {
  if (!transaction) return null;

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
    const colors = {
      deposit: 'default',
      withdrawal: 'secondary',
      investment: 'outline',
      return: 'default',
      bonus: 'default'
    };
    return (
      <Badge variant={colors[type as keyof typeof colors] || 'outline'}>
        {type}
      </Badge>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Transaction Details
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Transaction Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Transaction ID</label>
                    <p className="font-mono text-sm break-all">{transaction.reference || transaction._id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Type</label>
                    <div className="mt-1">{getTypeBadge(transaction.type)}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Amount</label>
                    <p className="text-lg font-semibold">${transaction.amount?.toLocaleString() || 0}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <div className="mt-1">{getStatusBadge(transaction.status)}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Method</label>
                    <p className="capitalize">{transaction.method || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Date Created</label>
                    <p>{transaction.createdAt ? new Date(transaction.createdAt).toLocaleString() : 'N/A'}</p>
                  </div>
                </div>
                
                {(transaction.fee || transaction.netAmount) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    {transaction.fee && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Fee</label>
                        <p>${transaction.fee?.toLocaleString() || 0}</p>
                      </div>
                    )}
                    {transaction.netAmount && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Net Amount</label>
                        <p className="font-semibold">${transaction.netAmount?.toLocaleString() || 0}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* User Info */}
            {transaction.userId && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="w-4 h-4" />
                    User Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Name</label>
                    <p>{transaction.userId?.firstName || ''} {transaction.userId?.lastName || ''}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p>{transaction.userId?.email || 'N/A'}</p>
                  </div>
                  {transaction.userId?.walletId && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Wallet ID</label>
                      <p className="font-mono text-sm break-all">{transaction.userId.walletId}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Payment Details */}
            {transaction.walletAddress && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    Payment Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Wallet Address</label>
                    <p className="font-mono text-sm break-all bg-muted p-2 rounded mt-1">{transaction.walletAddress}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Processing Info */}
            {(transaction.processedBy || transaction.processedAt || transaction.adminNotes) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Processing Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {transaction.processedBy && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Processed By</label>
                      <p>{transaction.processedBy.firstName || ''} {transaction.processedBy.lastName || ''}</p>
                    </div>
                  )}
                  {transaction.processedAt && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Processed At</label>
                      <p>{new Date(transaction.processedAt).toLocaleString()}</p>
                    </div>
                  )}
                  {transaction.adminNotes && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Admin Notes</label>
                      <p className="text-sm bg-muted p-3 rounded mt-1">{transaction.adminNotes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};