import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LogOut, X } from 'lucide-react';

interface LogoutConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const LogoutConfirmDialog = ({ open, onOpenChange, onConfirm }: LogoutConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <LogOut className="w-5 h-5 text-destructive" />
            <span>Confirm Logout</span>
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to logout? You'll need to sign in again to access your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};