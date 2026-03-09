import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useGetUsersQuery, useUpdateUserBalanceMutation } from '@/store/adminApi';
import { 
  DollarSign, 
  CreditCard,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Search
} from 'lucide-react';

export const AdminFundPage = () => {
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState('');
  const [fundAmount, setFundAmount] = useState('');
  const [fundingReason, setFundingReason] = useState('');
  const [fundType, setFundType] = useState<'add' | 'subtract'>('add');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: usersData, isLoading } = useGetUsersQuery({ search: searchTerm });
  const [updateUserBalance, { isLoading: isUpdating }] = useUpdateUserBalanceMutation();
  
  const users = usersData?.data?.filter((user: any) => user.role === 'user') || [];

  const handleFundUser = async () => {
    if (!selectedUser || !fundAmount) {
      toast({
        title: "Validation Error",
        description: "Please select a user and enter an amount.",
        variant: "destructive",
      });
      return;
    }
    
    const fundAmountNum = parseFloat(fundAmount);
    if (fundAmountNum <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than 0.",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateUserBalance({
        id: selectedUser,
        amount: fundAmountNum,
        type: fundType,
        reason: fundingReason || `${fundType === 'add' ? 'Credit' : 'Debit'} by admin`,
        silent: false
      }).unwrap();
      
      const user = users.find((u: any) => u._id === selectedUser);
      toast({
        title: "User Balance Updated",
        description: `$${fundAmount} has been ${fundType === 'add' ? 'added to' : 'deducted from'} ${user?.firstName} ${user?.lastName}'s wallet.`,
      });

      setSelectedUser('');
      setFundAmount('');
      setFundingReason('');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.data?.message || "Failed to update user balance",
        variant: "destructive",
      });
    }
  };

  const selectedUserData = users.find((u: any) => u._id === selectedUser);

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading users...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Fund User Wallet</h1>
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          <span className="text-sm text-muted-foreground">Direct Funding</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Fund User Account
            </CardTitle>
            <CardDescription>
              Add funds directly to a user's wallet. This will create an approved deposit transaction.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="userId">Select User *</Label>
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a user to fund" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user: any) => (
                      <SelectItem key={user._id} value={user._id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{user.firstName} {user.lastName}</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            Balance: ${user.balance?.toLocaleString() || '0'}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedUserData && (
              <Card className="bg-muted/20 border-muted">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{selectedUserData.firstName} {selectedUserData.lastName}</p>
                      <p className="text-sm text-muted-foreground">{selectedUserData.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Current Balance</p>
                      <p className="text-lg font-bold text-primary">
                        ${selectedUserData.balance?.toLocaleString() || '0'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-2">
              <Label htmlFor="type">Transaction Type</Label>
              <Select value={fundType} onValueChange={(value: 'add' | 'subtract') => setFundType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transaction type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Credit (Add Funds)</SelectItem>
                  <SelectItem value="subtract">Debit (Deduct Funds)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($) *</Label>
              <Input 
                id="amount" 
                type="number" 
                placeholder="Enter amount"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason (Optional)</Label>
              <Textarea 
                id="reason" 
                placeholder="Enter reason for this transaction..."
                value={fundingReason}
                onChange={(e) => setFundingReason(e.target.value)}
                rows={3}
              />
            </div>

            <Button 
              onClick={handleFundUser} 
              disabled={!selectedUser || !fundAmount || isUpdating}
              className="w-full"
              size="lg"
            >
              {fundType === 'add' ? (
                <ArrowUpRight className="w-4 h-4 mr-2" />
              ) : (
                <ArrowDownRight className="w-4 h-4 mr-2" />
              )}
              {isUpdating ? 'Processing...' : `${fundType === 'add' ? 'Credit' : 'Debit'} User $${fundAmount || '0'}`}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Funding Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="font-medium text-blue-600 mb-1">Admin Credit</h4>
                <p className="text-sm text-muted-foreground">
                  Direct credit from admin for various purposes
                </p>
              </div>

              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h4 className="font-medium text-green-600 mb-1">Bonus Reward</h4>
                <p className="text-sm text-muted-foreground">
                  Performance bonuses and achievement rewards
                </p>
              </div>

              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h4 className="font-medium text-purple-600 mb-1">Referral Bonus</h4>
                <p className="text-sm text-muted-foreground">
                  Rewards for successful user referrals
                </p>
              </div>

              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <h4 className="font-medium text-orange-600 mb-1">Promotional Credit</h4>
                <p className="text-sm text-muted-foreground">
                  Marketing promotions and campaign credits
                </p>
              </div>
            </div>

            <div className="p-4 bg-muted/20 border border-muted rounded-lg">
              <h4 className="font-medium mb-2">Important Notes:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• All funding transactions are automatically approved</li>
                <li>• Users will see the credit in their wallet immediately</li>
                <li>• Transaction history is maintained for audit purposes</li>
                <li>• Consider adding a reason for transparency</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};