import React from 'react';
import { AlertCircle, User, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface ProfileSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileSetupModal: React.FC<ProfileSetupModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCompleteSetup = () => {
    navigate('/dashboard/settings');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <CardTitle className="text-xl">Complete Your Profile Setup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground text-center">
            To gain full access to your dashboard and start investing, please complete your profile setup.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <User className="w-5 h-5 text-primary" />
              <div>
                <h4 className="font-medium">Personal Information</h4>
                <p className="text-sm text-muted-foreground">Complete your basic profile details</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <CreditCard className="w-5 h-5 text-primary" />
              <div>
                <h4 className="font-medium">Withdrawal Method</h4>
                <p className="text-sm text-muted-foreground">Set up at least one withdrawal address</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Later
            </Button>
            <Button onClick={handleCompleteSetup} className="flex-1">
              Complete Setup
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSetupModal;