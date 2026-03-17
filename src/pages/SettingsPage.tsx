import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChangePasswordModal } from '@/components/ui/change-password-modal';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useUpdateProfileMutation, useGetMeQuery, useChangePasswordMutation } from '@/store/authApi';
import { WITHDRAWAL_CURRENCIES } from '@/utils/paymentConfig';
import { COUNTRIES } from '@/utils/countries';
import { User, Wallet, Shield, Bell, CreditCard, CheckCircle2, AlertCircle, Lock } from 'lucide-react';

export const SettingsPage = () => {
  const { toast } = useToast();
  const { user, updateUser } = useAuth();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: changePasswordLoading }] = useChangePasswordMutation();
  const { data: userData, refetch } = useGetMeQuery();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    gender: '',
    withdrawalAddresses: {
      btc: '',
      eth: '',
      usdt_trc20: '',
      usdt_erc20: '',
      usdc: '',
      trx: '',
      sol: '',
      xrp: '',
      ltc: '',
      bnb: '',
      matic: ''
    }
  });

  useEffect(() => {
    if (userData?.user) {
      const currentUser = userData.user;
      setProfileData({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: currentUser.address || '',
        country: currentUser.country || '',
        gender: currentUser.gender || '',
        withdrawalAddresses: {
          btc: currentUser.withdrawalAddresses?.btc || '',
          eth: currentUser.withdrawalAddresses?.eth || '',
          usdt_trc20: currentUser.withdrawalAddresses?.usdt_trc20 || currentUser.withdrawalAddresses?.tether || '',
          usdt_erc20: currentUser.withdrawalAddresses?.usdt_erc20 || '',
          usdc: currentUser.withdrawalAddresses?.usdc || '',
          trx: currentUser.withdrawalAddresses?.trx || '',
          sol: currentUser.withdrawalAddresses?.sol || currentUser.withdrawalAddresses?.solana || '',
          xrp: currentUser.withdrawalAddresses?.xrp || '',
          ltc: currentUser.withdrawalAddresses?.ltc || '',
          bnb: currentUser.withdrawalAddresses?.bnb || '',
          matic: currentUser.withdrawalAddresses?.matic || ''
        }
      });
    }
  }, [userData]);

  const handleSaveProfile = async () => {
    try {
      const result = await updateProfile({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone,
        address: profileData.address,
        country: profileData.country,
        gender: profileData.gender,
        withdrawalAddresses: profileData.withdrawalAddresses
      }).unwrap();

      // Update local user state
      updateUser(result.user);
      
      // Refetch user data to ensure sync
      refetch();

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.data?.message || "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handleChangePassword = async (data: { currentPassword: string; newPassword: string }) => {
    try {
      await changePassword(data).unwrap();
      toast({
        title: "Password Changed",
        description: "Your password has been successfully updated.",
      });
      setShowPasswordModal(false);
    } catch (error: any) {
      toast({
        title: "Password Change Failed",
        description: error.data?.message || "Failed to change password",
        variant: "destructive",
      });
    }
  };

  const securityFeatures = [
    { name: 'Two-Factor Authentication', enabled: false, description: 'Add an extra layer of security' },
    { name: 'Email Notifications', enabled: true, description: 'Receive updates about your account' },
    { name: 'Investment Alerts', enabled: true, description: 'Get notified about investment milestones' },
    { name: 'Withdrawal Confirmations', enabled: true, description: 'Confirm withdrawals via email' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
        <div className="flex gap-2">
          {user?.isVerified && (
            <Badge variant="default" className="px-3 py-1">
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Verified
            </Badge>
          )}
          <Badge variant={user?.hasCompletedSetup ? 'default' : 'secondary'} className="px-3 py-1">
            {user?.hasCompletedSetup ? 'Setup Complete' : 'Setup Pending'}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Information */}
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Update your personal information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                disabled
                className="bg-muted/20"
              />
              <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
            </div>

            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select value={profileData.gender} onValueChange={(value) => setProfileData({ ...profileData, gender: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                 
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Select value={profileData.country} onValueChange={(value) => setProfileData({ ...profileData, country: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                placeholder="Enter your full address"
                value={profileData.address}
                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
              />
            </div>

            <Button onClick={handleSaveProfile} className="w-full" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardContent>
        </Card>

        {/* Withdrawal Addresses */}
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Withdrawal Addresses
            </CardTitle>
            <CardDescription>
              Configure your cryptocurrency withdrawal addresses (Required for withdrawals)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {WITHDRAWAL_CURRENCIES.map((currency) => {
              const currencyKey = currency.id;
              return (
                <div key={currency.id}>
                  <Label htmlFor={currencyKey}>
                    {currency.name} ({currency.symbol}) - {currency.network}
                  </Label>
                  <Input
                    id={currencyKey}
                    placeholder={`Enter your ${currency.symbol} wallet address`}
                    value={profileData.withdrawalAddresses[currencyKey as keyof typeof profileData.withdrawalAddresses] || ''}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      withdrawalAddresses: {
                        ...profileData.withdrawalAddresses,
                        [currencyKey]: e.target.value
                      }
                    })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Network: {currency.network} | Required for {currency.symbol} withdrawals
                  </p>
                </div>
              );
            })}

            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-700 dark:text-yellow-400">Important Security Notice</p>
                  <ul className="text-muted-foreground mt-1 space-y-1">
                    <li>• Double-check your wallet addresses before saving</li>
                    <li>• We cannot recover funds sent to wrong addresses</li>
                    <li>• At least one address is required for withdrawals</li>
                    <li>• Test with small amounts first</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button onClick={handleSaveProfile} className="w-full" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Withdrawal Addresses'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Security Settings */}
      <Card className="bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security & Notifications
          </CardTitle>
          <CardDescription>
            Manage your account security and notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="font-medium">Change Password</p>
                  <p className="text-sm text-muted-foreground">Update your account password</p>
                </div>
              </div>
              <Button onClick={() => setShowPasswordModal(true)}>
                Change Password
              </Button>
            </div>
            
            {securityFeatures.map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-3">
                  {feature.name === 'Two-Factor Authentication' && <Shield className="w-4 h-4 text-blue-500" />}
                  {feature.name === 'Email Notifications' && <Bell className="w-4 h-4 text-green-500" />}
                  {feature.name === 'Investment Alerts' && <CreditCard className="w-4 h-4 text-purple-500" />}
                  {feature.name === 'Withdrawal Confirmations' && <Wallet className="w-4 h-4 text-orange-500" />}
                  <div>
                    <p className="font-medium">{feature.name}</p>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
                <Badge variant={feature.enabled ? 'default' : 'secondary'}>
                  {feature.enabled ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSubmit={handleChangePassword}
        isLoading={changePasswordLoading}
      />
    </div>
  );
};