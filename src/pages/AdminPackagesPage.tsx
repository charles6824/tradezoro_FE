import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';
import { PageSkeleton } from '@/components/ui/page-skeleton';
import { useToast } from '@/hooks/use-toast';
import { useGetPackagesQuery } from '@/store/packagesApi';
import { useCreatePackageMutation, useUpdatePackageMutation, useDeletePackageMutation, useTogglePackageStatusMutation } from '@/store/adminApi';
import { 
  Package, 
  Plus,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Loader2
} from 'lucide-react';

export const AdminPackagesPage = () => {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<any>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    minAmount: '',
    maxAmount: '',
    duration: '',
    roi: ''
  });

  const { data: packagesData, isLoading, error } = useGetPackagesQuery();
  const [createPackage, { isLoading: isCreating }] = useCreatePackageMutation();
  const [updatePackage, { isLoading: isUpdating }] = useUpdatePackageMutation();
  const [deletePackage, { isLoading: isDeleting }] = useDeletePackageMutation();
  const [togglePackageStatus, { isLoading: isToggling }] = useTogglePackageStatusMutation();

  const packages = packagesData?.data || [];

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      minAmount: '',
      maxAmount: '',
      duration: '',
      roi: ''
    });
    setEditingPackage(null);
  };

  const handleCreatePackage = async () => {
    if (!formData.name || !formData.minAmount || !formData.maxAmount || !formData.duration || !formData.roi) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createPackage({
        name: formData.name,
        description: formData.description,
        minAmount: parseFloat(formData.minAmount),
        maxAmount: parseFloat(formData.maxAmount),
        duration: parseInt(formData.duration),
        roi: parseFloat(formData.roi)
      }).unwrap();

      resetForm();
      setIsCreateDialogOpen(false);

      toast({
        title: "Package Created",
        description: `${formData.name} has been created successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create package",
        variant: "destructive",
      });
    }
  };

  const handleUpdatePackage = async () => {
    if (!editingPackage) return;

    try {
      await updatePackage({
        id: editingPackage._id,
        data: {
          name: formData.name,
          description: formData.description,
          minAmount: parseFloat(formData.minAmount),
          maxAmount: parseFloat(formData.maxAmount),
          duration: parseInt(formData.duration),
          roi: parseFloat(formData.roi)
        }
      }).unwrap();

      resetForm();
      setIsCreateDialogOpen(false);

      toast({
        title: "Package Updated",
        description: `${formData.name} has been updated successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update package",
        variant: "destructive",
      });
    }
  };

  const handleEditPackage = (pkg: any) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      description: pkg.description || '',
      minAmount: pkg.minAmount.toString(),
      maxAmount: pkg.maxAmount.toString(),
      duration: pkg.duration.toString(),
      roi: pkg.roi.toString()
    });
    setIsCreateDialogOpen(true);
  };

  const handleTogglePackage = async (packageId: string) => {
    try {
      await togglePackageStatus(packageId).unwrap();
      const pkg = packages.find(p => p._id === packageId);
      toast({
        title: pkg?.isActive ? "Package Deactivated" : "Package Activated",
        description: `${pkg?.name} has been ${pkg?.isActive ? 'deactivated' : 'activated'}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to toggle package status",
        variant: "destructive",
      });
    }
  };

  const handleDeletePackage = async (packageId: string) => {
    const pkg = packages.find(p => p._id === packageId);
    setPackageToDelete(pkg);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!packageToDelete) return;

    try {
      await deletePackage(packageToDelete._id).unwrap();
      toast({
        title: "Package Deleted",
        description: `${packageToDelete.name} has been deleted.`,
        variant: "destructive",
      });
      setDeleteConfirmOpen(false);
      setPackageToDelete(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete package",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-8">
        Error loading packages. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-foreground">Package Management</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={(open) => {
          setIsCreateDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Package
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingPackage ? 'Edit' : 'Create New'} Investment Package</DialogTitle>
              <DialogDescription>
                {editingPackage ? 'Update the' : 'Create a new'} investment package for users to invest in
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="packageName">Package Name *</Label>
                <Input 
                  id="packageName" 
                  placeholder="e.g., Premium Bitcoin Package"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Package description and benefits..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minAmount">Min Amount ($) *</Label>
                  <Input 
                    id="minAmount" 
                    type="number" 
                    placeholder="1000"
                    value={formData.minAmount}
                    onChange={(e) => setFormData(prev => ({ ...prev, minAmount: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="maxAmount">Max Amount ($) *</Label>
                  <Input 
                    id="maxAmount" 
                    type="number" 
                    placeholder="10000"
                    value={formData.maxAmount}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxAmount: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration (days) *</Label>
                  <Input 
                    id="duration" 
                    type="number" 
                    placeholder="30"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="roi">ROI (%) *</Label>
                  <Input 
                    id="roi" 
                    type="number" 
                    placeholder="25"
                    value={formData.roi}
                    onChange={(e) => setFormData(prev => ({ ...prev, roi: e.target.value }))}
                  />
                </div>
              </div>
              <Button className="w-full" onClick={editingPackage ? handleUpdatePackage : handleCreatePackage} disabled={isCreating || isUpdating}>
                {(isCreating || isUpdating) ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {editingPackage ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  editingPackage ? 'Update Package' : 'Create Package'
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{packages.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Packages</CardTitle>
            <ToggleRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {packages.filter(pkg => pkg.isActive).length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg ROI</CardTitle>
            <ToggleRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {packages.length > 0 ? (packages.reduce((sum, pkg) => sum + pkg.roi, 0) / packages.length).toFixed(1) : 0}%
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Investment Packages
          </CardTitle>
          <CardDescription>Manage and configure investment packages for users</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Package Name</TableHead>
                <TableHead>Amount Range</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>ROI</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packages.map((pkg) => (
                <TableRow key={pkg._id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{pkg.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {pkg.description || 'No description'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">
                      ${pkg.minAmount?.toLocaleString() || 0} - ${pkg.maxAmount?.toLocaleString() || 0}
                    </span>
                  </TableCell>
                  <TableCell>{pkg.duration} days</TableCell>
                  <TableCell>
                    <span className="font-medium text-green-600">{pkg.roi}%</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={pkg.isActive ? 'default' : 'secondary'}>
                      {pkg.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleTogglePackage(pkg._id)}
                        disabled={isToggling}
                      >
                        {isToggling ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : pkg.isActive ? (
                          <ToggleLeft className="w-4 h-4" />
                        ) : (
                          <ToggleRight className="w-4 h-4" />
                        )}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditPackage(pkg)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeletePackage(pkg._id)}
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {packages.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No packages found. Create your first package to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ConfirmationModal
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Delete Package"
        description={`Are you sure you want to delete "${packageToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        variant="destructive"
      />
    </div>
  );
};