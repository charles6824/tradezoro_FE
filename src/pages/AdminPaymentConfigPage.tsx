import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Settings, Wallet, Save, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

interface CryptoMethod {
    name: string;
    address: string;
    barcodeUrl: string;
}

const AdminPaymentConfigPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // The dynamically structured array of N payment methods
  const [methods, setMethods] = useState<CryptoMethod[]>([]);
  
  // Files mapped by index
  const [files, setFiles] = useState<{ [index: number]: File | null }>({});
  const [previewUrls, setPreviewUrls] = useState<{ [index: number]: string }>({});

  useEffect(() => {
    fetchPaymentConfig();
  }, []);

  const fetchPaymentConfig = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('crypto_auth') || '{}').token;
      const apiUrl = import.meta.env.VITE_API_URL || 'https://tradezero-be.onrender.com';
      const response = await fetch(`${apiUrl}/api/settings/payment-addresses`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
            setMethods(data);
        } else if (data.tether || data.solana || data.trx) {
            // Legacy fallback mapper
            setMethods([
                { name: 'Tether (USDT)', address: data.tether, barcodeUrl: data.tetherBarcode },
                { name: 'Solana (SOL)', address: data.solana, barcodeUrl: data.solanaBarcode },
                { name: 'Tron (TRX)', address: data.trx, barcodeUrl: data.trxBarcode }
            ].filter(m => m.address));
        }
      }
    } catch (error) {
      console.error('Error fetching payment config:', error);
    }
  };

  const handleAddMethod = () => {
      setMethods([...methods, { name: '', address: '', barcodeUrl: '' }]);
  };

  const handleRemoveMethod = (index: number) => {
      const newMethods = [...methods];
      newMethods.splice(index, 1);
      setMethods(newMethods);

      const newFiles = { ...files };
      delete newFiles[index];
      setFiles(newFiles);

      const newUrls = { ...previewUrls };
      delete newUrls[index];
      setPreviewUrls(newUrls);
  };

  const handleMethodChange = (index: number, field: keyof CryptoMethod, value: string) => {
      const newMethods = [...methods];
      newMethods[index] = { ...newMethods[index], [field]: value };
      setMethods(newMethods);
  };

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles(prev => ({ ...prev, [index]: file }));
      const url = URL.createObjectURL(file);
      setPreviewUrls(prev => ({ ...prev, [index]: url }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem('crypto_auth') || '{}').token;
      
      const formData = new FormData();
      // Send the array of method objects as a JSON string
      formData.append('methods', JSON.stringify(methods));
      
      // Append matching files dynamically against their array indexes
      Object.keys(files).forEach((indexStr) => {
          const file = files[parseInt(indexStr)];
          if (file) {
              formData.append(`barcode_${indexStr}`, file);
          }
      });

      const apiUrl = import.meta.env.VITE_API_URL || 'https://tradezero-be.onrender.com';
      const response = await fetch(`${apiUrl}/api/admin/payment-config`, {
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
          description: "Dynamic payment configuration saved globally",
        });
        fetchPaymentConfig(); // reload cleanly mapped URLs
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

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <Settings className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Payment Methods Config</h1>
            <p className="text-slate-500">Add, edit or delete cryptocurrency deposit details shown to users</p>
          </div>
        </div>
        <div className="flex gap-3">
            <Button onClick={handleAddMethod} variant="outline" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                <Plus className="w-4 h-4 mr-2" />
                Add Coin
            </Button>
            <Button onClick={handleSave} disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 shadow-sm">
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save Configuration'}
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
          {methods.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-slate-100">
                  <Wallet className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No payment methods configured. Click Add Coin to start.</p>
              </div>
          ) : (
              methods.map((method, index) => (
                <Card key={index} className="border-slate-100 shadow-sm overflow-hidden">
                    <CardHeader className="bg-slate-50 border-b border-slate-100 py-4">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">{index + 1}</span>
                                {method.name || 'New Coin'} Details
                            </CardTitle>
                            <Button variant="ghost" size="sm" onClick={() => handleRemoveMethod(index)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                <Trash2 className="w-4 h-4 mr-2" /> Remove
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-medium whitespace-nowrap">Coin Name & Network</Label>
                                <Input
                                    value={method.name}
                                    placeholder="e.g. Tether (TRC20)"
                                    onChange={(e) => handleMethodChange(index, 'name', e.target.value)}
                                    className="border-slate-200 focus-visible:ring-indigo-500 w-full"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-medium whitespace-nowrap">{method.name || 'Coin'} Deposit Address</Label>
                                <Input
                                    value={method.address}
                                    placeholder="Enter wallet address"
                                    onChange={(e) => handleMethodChange(index, 'address', e.target.value)}
                                    className="border-slate-200 focus-visible:ring-indigo-500 font-mono text-sm w-full"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-medium">Upload Scan Code URL (Optional)</Label>
                                <div className="flex items-center gap-4">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(index, e)}
                                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* QR Code Preview Pane */}
                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 flex flex-col items-center justify-center min-h-[250px]">
                            {previewUrls[index] || method.barcodeUrl ? (
                                <div className="space-y-3 text-center">
                                    <p className="text-sm font-medium text-slate-500">Current QR Code</p>
                                    <img 
                                        src={previewUrls[index] || method.barcodeUrl} 
                                        alt={`${method.name} QR Check`} 
                                        className="w-48 h-48 object-cover rounded-lg border border-slate-200 shadow-sm mx-auto bg-white p-2"
                                    />
                                    {previewUrls[index] && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                            New File Selected (Unsaved)
                                        </span>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center text-slate-400">
                                    <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                    <p className="text-sm">No QR code uploaded yet</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))
          )}
      </div>
    </div>
  );
};

export default AdminPaymentConfigPage;