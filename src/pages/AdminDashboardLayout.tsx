import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar 
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Package, 
  TrendingUp, 
  Settings, 
  LogOut,
  ChevronRight,
  DollarSign,
  FileText,
  Wallet,
  MessageCircle
} from 'lucide-react';

const adminNavItems = [
  { title: 'Dashboard', url: '/admin', icon: LayoutDashboard },
  { title: 'Users', url: '/admin/users', icon: Users },
  { title: 'Transactions', url: '/admin/transactions', icon: CreditCard },
  { title: 'Investments', url: '/admin/investments', icon: TrendingUp },
  { title: 'Packages', url: '/admin/packages', icon: Package },
  { title: 'Fund Users', url: '/admin/fund', icon: DollarSign },
  { title: 'Payment Config', url: '/admin/payment-config', icon: Wallet },
  { title: 'Referrals', url: '/admin/referrals', icon: Users },
  { title: 'Chat', url: '/admin/chat', icon: MessageCircle },
  { title: 'Reports', url: '/admin/reports', icon: FileText },
  { title: 'Settings', url: '/admin/settings', icon: Settings },
];

export const AdminDashboardSidebar = () => {
  const { user, logout } = useAuth();
  const { state, isMobile, setOpenMobile } = useSidebar();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isCollapsed = state === 'collapsed';

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        {/* Admin Profile */}
        {!isCollapsed && (
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <Badge variant="secondary" className="text-xs px-2 py-0">
                  Admin
                </Badge>
              </div>
            </div>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>Admin Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.url}
                      onClick={handleNavClick}
                      className={`flex items-center space-x-2 ${
                        isActive(item.url) 
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
                          : 'hover:bg-sidebar-accent/50'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                      {!isCollapsed && isActive(item.url) && (
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => {
                    logout();
                    handleNavClick();
                  }}
                  className="flex items-center space-x-2 text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="w-4 h-4" />
                  {!isCollapsed && <span>Logout</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export const AdminDashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminDashboardSidebar />
        <main className="flex-1 bg-background">
          <div className="p-6">
            <div className="md:hidden mb-4 flex items-center gap-2 bg-slate-100/50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-200 dark:border-slate-700 w-fit">
              <SidebarTrigger />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300 pr-2">Menu</span>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};