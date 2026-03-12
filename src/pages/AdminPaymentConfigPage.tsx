import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Settings, Wallet, Save } from 'lucide-react';

const AdminPaymentConfigPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState({
    tether: '',
    solana: '',
    trx: '',
    tetherBarcode: '',
    solanaBarcode: '',
    trxBarcode: ''
  });
  
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    tether_barcode: null,
    solana_barcode: null,
    trx_barcode: null
  });

  // Create preview URLs for new uploads
  const [previewUrls, setPreviewUrls] = useState<{ [key: string]: string }>({
    tether_barcode: '',
    solana_barcode: '',
    trx_barcode: ''
  });

  useEffect(() => {
    fetchPaymentConfig();
  }, []);

  const fetchPaymentConfig = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/settings/payment-addresses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
      }
    } catch (error) {
      console.error('Error fetching payment config:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      const formData = new FormData();
      formData.append('tether', addresses.tether);
      formData.append('solana', addresses.solana);
      formData.append('trx', addresses.trx);
      
      if (files.tether_barcode) formData.append('tether_barcode', files.tether_barcode);
      if (files.solana_barcode) formData.append('solana_barcode', files.solana_barcode);
      if (files.trx_barcode) formData.append('trx_barcode', files.trx_barcode);

      const response = await fetch('/api/admin/payment-config', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const result = await response.json();
      
      if (response.ok) {
        toast({
          title: "Success",
          description: "Payment configuration updated successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to update payment configuration",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update payment configuration",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddressChange = (currency: string, value: string) => {
    setAddresses(prev => ({
      ...prev,
      [currency]: value
    }));
  };

  const handleFileChange = (currency: 'tether' | 'solana' | 'trx', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles(prev => ({ ...prev, [`${currency}_barcode`]: file }));
      setPreviewUrls(prev => ({ ...prev, [`${currency}_barcode`]: URL.createObjectURL(file) }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payment Configuration</h1>
          <p className="text-muted-foreground">Manage cryptocurrency payment addresses</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Cryptocurrency Addresses
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tether */}
            <div className="space-y-4 border p-4 rounded-xl relative overflow-hidden bg-card/50">
              <div className="space-y-2">
                <Label htmlFor="tether">Tether (USDT) Address</Label>
                <Input
                  id="tether"
                  placeholder="Enter Tether address"
                  value={addresses.tether}
                  onChange={(e) => handleAddressChange('tether', e.target.value)}
                  className="font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tether_barcode">Upload QR Scan Code</Label>
                <Input
                  id="tether_barcode"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange('tether', e)}
                />
                {(previewUrls.tether_barcode || addresses.tetherBarcode) && (
                  <div className="mt-2 w-32 h-32 border rounded-md overflow-hidden bg-background">
                    <img src={previewUrls.tether_barcode || addresses.tetherBarcode} alt="Tether QR" className="w-full h-full object-contain" />
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Users will send USDT deposits to this address
              </p>
            </div>

            {/* Solana */}
            <div className="space-y-4 border p-4 rounded-xl relative overflow-hidden bg-card/50">
              <div className="space-y-2">
                <Label htmlFor="solana">Solana (SOL) Address</Label>
                <Input
                  id="solana"
                  placeholder="Enter Solana address"
                  value={addresses.solana}
                  onChange={(e) => handleAddressChange('solana', e.target.value)}
                  className="font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="solana_barcode">Upload QR Scan Code</Label>
                <Input
                  id="solana_barcode"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange('solana', e)}
                />
                {(previewUrls.solana_barcode || addresses.solanaBarcode) && (
                  <div className="mt-2 w-32 h-32 border rounded-md overflow-hidden bg-background">
                    <img src={previewUrls.solana_barcode || addresses.solanaBarcode} alt="Solana QR" className="w-full h-full object-contain" />
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Users will send SOL deposits to this address
              </p>
            </div>

            {/* TRX */}
            <div className="space-y-4 border p-4 rounded-xl relative overflow-hidden bg-card/50">
              <div className="space-y-2">
                <Label htmlFor="trx">Tron (TRX) Address</Label>
                <Input
                  id="trx"
                  placeholder="Enter Tron address"
                  value={addresses.trx}
                  onChange={(e) => handleAddressChange('trx', e.target.value)}
                  className="font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trx_barcode">Upload QR Scan Code</Label>
                <Input
                  id="trx_barcode"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange('trx', e)}
                />
                {(previewUrls.trx_barcode || addresses.trxBarcode) && (
                  <div className="mt-2 w-32 h-32 border rounded-md overflow-hidden bg-background">
                    <img src={previewUrls.trx_barcode || addresses.trxBarcode} alt="TRX QR" className="w-full h-full object-contain" />
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Users will send TRX deposits to this address
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button onClick={handleSave} disabled={loading} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : 'Save Configuration'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Important Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• These addresses will be displayed to users when making deposits</p>
            <p>• Ensure all addresses are correct before saving</p>
            <p>• Users will be notified that confirmation takes 3-5 minutes</p>
            <p>• Changes take effect immediately for new deposits</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPaymentConfigPage;