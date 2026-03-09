import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
  isLoading?: boolean;
}

export const DeleteUserModal = ({ isOpen, onClose, onConfirm, userName, isLoading }: DeleteUserModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            Delete User
          </DialogTitle>
          <DialogDescription>
            This action will permanently delete <strong>{userName}</strong> and all associated data including:
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3">
          <ul className="text-sm text-muted-foreground space-y-1 ml-4">
            <li>• User account and profile</li>
            <li>• All transaction history</li>
            <li>• All investment records</li>
            <li>• Account balance</li>
          </ul>
          
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm font-medium text-destructive">
              This action cannot be undone!
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? 'Deleting...' : 'Delete User'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};