import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useUpdateProfileMutation, useGetMeQuery } from '@/store/authApi';
import { WITHDRAWAL_CURRENCIES } from '@/utils/paymentConfig';
import { COUNTRIES } from '@/utils/countries';
import { User, Wallet, CheckCircle2 } from 'lucide-react';

export const FirstTimeSetupPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { data: userData, refetch } = useGetMeQuery();

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    country: user?.country || '',
    gender: user?.gender || '',
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
        phone: currentUser.phone || '',
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

      if (currentUser.hasCompletedSetup) {
        navigate('/dashboard');
      }
    }
  }, [userData, navigate]);

  const handleCompleteSetup = async () => {
    if (!profileData.phone || !profileData.country || !profileData.gender) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields to complete setup.",
        variant: "destructive",
      });
      return;
    }

    const hasWithdrawalAddress = Object.values(profileData.withdrawalAddresses).some(addr => addr.trim() !== '');
    if (!hasWithdrawalAddress) {
      toast({
        title: "Withdrawal Address Required",
        description: "Please provide at least one withdrawal address.",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await updateProfile({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone,
        country: profileData.country,
        gender: profileData.gender,
        withdrawalAddresses: profileData.withdrawalAddresses,
        hasCompletedSetup: true
      }).unwrap();

      updateUser(result.user);
      refetch();
      
      toast({
        title: "Setup Complete!",
        description: "Your account setup has been completed successfully.",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Setup Failed",
        description: error.data?.message || "Failed to complete setup",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/dashboard')} className="text-muted-foreground hover:text-foreground">
          ← Back
        </button>
        <h1 className="text-lg font-semibold">Complete Profile Setup</h1>
      </div>

      <div className="px-4 py-6 max-w-2xl mx-auto space-y-6">

      <Card className="bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Contact Information
          </CardTitle>
          <CardDescription>
            Basic details required for your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="setupPhone">Phone Number *</Label>
              <Input
                id="setupPhone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="setupCountry">Country *</Label>
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
          </div>

          <div>
            <Label htmlFor="setupGender">Gender *</Label>
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
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Withdrawal Addresses
          </CardTitle>
          <CardDescription>
            At least one withdrawal address is required
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WITHDRAWAL_CURRENCIES.map((currency) => {
              const currencyKey = currency.id;
              return (
                <div key={currency.id}>
                  <Label htmlFor={`setup-${currencyKey}`} className="text-sm mb-1 block">
                    {currency.name} ({currency.network})
                  </Label>
                  <Input
                    id={`setup-${currencyKey}`}
                    placeholder={`${currency.symbol} address`}
                    value={profileData.withdrawalAddresses[currencyKey as keyof typeof profileData.withdrawalAddresses] || ''}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      withdrawalAddresses: {
                        ...profileData.withdrawalAddresses,
                        [currencyKey]: e.target.value
                      }
                    })}
                  />
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg mt-4">
            <p className="text-sm font-medium mb-2">Why do we need this information?</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• To verify your identity and prevent fraud</li>
              <li>• To process withdrawals securely</li>
              <li>• To comply with financial regulations</li>
              <li>• To provide better customer support</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => navigate('/dashboard')} className="flex-1">
              Skip for Now
            </Button>
            <Button onClick={handleCompleteSetup} className="flex-1" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Complete Setup'}
            </Button>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};
