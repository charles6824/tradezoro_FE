import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useUpdateProfileMutation } from '@/store/authApi';
import { Wallet, User, MapPin, Phone, Loader2 } from 'lucide-react';

interface FirstTimeSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FirstTimeSetupModal = ({ isOpen, onClose }: FirstTimeSetupModalProps) => {
  const { toast } = useToast();
  const { updateUser, user } = useAuth();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: '',
    address: '',
    city: '',
    country: '',
    gender: '',
    cryptoWallet: '',
    walletType: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const formatPhoneNumber = (phone: string) => {
    // If phone already has country code (+), return as is
    if (phone.startsWith('+')) {
      return phone;
    }
    
    // If phone starts with 0, it's likely a local number - keep as is for now
    // Backend should handle validation for specific country formats
    return phone;
  };

  const handleSubmit = async () => {
    if (!formData.phone || !formData.cryptoWallet || !formData.walletType) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in phone, crypto wallet address, and wallet type.",
        variant: "destructive",
      });
      return;
    }

    try {
      const formattedPhone = formatPhoneNumber(formData.phone);
      
      const profileData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formattedPhone,
        country: formData.country,
        gender: formData.gender,
        withdrawalAddresses: {
          [formData.walletType]: formData.cryptoWallet,
          tether: formData.walletType === 'tether' ? formData.cryptoWallet : '',
          solana: formData.walletType === 'solana' ? formData.cryptoWallet : '',
          trx: formData.walletType === 'trx' ? formData.cryptoWallet : '',
        },
        hasCompletedSetup: true
      };

      const result = await updateProfile(profileData).unwrap();
      
      // Update local auth state
      updateUser(result.user);

      toast({
        title: "Profile Setup Complete",
        description: "Your profile has been set up successfully. You can now access all features.",
      });

      onClose();
    } catch (error: any) {
      toast({
        title: "Setup Failed",
        description: error?.data?.message || "Failed to complete profile setup. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Complete Your Profile Setup
          </DialogTitle>
          <DialogDescription>
            Please complete your profile to access all platform features and ensure secure transactions.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Contact Information
            </h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  placeholder="+1234567890 or 08012345678"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter with country code (+1234567890) or local format
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                <Input
                  id="emergencyContact"
                  placeholder="John Doe"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                <Input
                  id="emergencyPhone"
                  placeholder="+1 (555) 987-6543"
                  value={formData.emergencyPhone}
                  onChange={(e) => setFormData(prev => ({ ...prev, emergencyPhone: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Address Information
            </h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="address">Street Address</Label>
                <Textarea
                  id="address"
                  placeholder="123 Main Street, Apt 4B"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Bonn"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select value={formData.country} onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ng">Nigeria</SelectItem>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="gb">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="fr">France</SelectItem>
                      <SelectItem value="jp">Japan</SelectItem>
                      <SelectItem value="sg">Singapore</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Crypto Wallet Information */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Crypto Wallet for Withdrawals
            </h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="walletType">Wallet Type *</Label>
                <Select value={formData.walletType} onValueChange={(value) => setFormData(prev => ({ ...prev, walletType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select wallet type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tether">Tether (USDT)</SelectItem>
                    <SelectItem value="solana">Solana (SOL)</SelectItem>
                    <SelectItem value="trx">Tron (TRX)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="cryptoWallet">Wallet Address *</Label>
                <Input
                  id="cryptoWallet"
                  placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
                  value={formData.cryptoWallet}
                  onChange={(e) => setFormData(prev => ({ ...prev, cryptoWallet: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This wallet will be used for withdrawal payments. Double-check the address.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <h4 className="font-medium text-blue-600 mb-2">Important Security Notice</h4>
            <ul className="text-sm text-blue-600/80 space-y-1">
              <li>• Ensure your wallet address is correct - transactions cannot be reversed</li>
              <li>• You can update this information later in Settings</li>
              <li>• Your information is encrypted and stored securely</li>
              <li>• Contact support if you need assistance</li>
            </ul>
          </div>

          <Button onClick={handleSubmit} className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Setting up...
              </>
            ) : (
              'Complete Setup'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};