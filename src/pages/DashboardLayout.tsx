import { useState, useEffect } from 'react';
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
import { FirstTimeSetupModal } from '@/components/FirstTimeSetupModal';
import { LogoutConfirmDialog } from '@/components/LogoutConfirmDialog';
import { ReliableLanguageSelector } from '@/components/ReliableLanguageSelector';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { useGetUserProfileQuery } from '@/store/userApi';
import {
  LayoutDashboard,
  Wallet,
  CreditCard,
  Package,
  TrendingUp,
  Settings,
  LogOut,
  ChevronRight,
  ArrowLeftRight,
  MessageCircle,
  Users
} from 'lucide-react';

const userNavItems = [
  { title: 'dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'deposit', url: '/dashboard/deposit', icon: CreditCard },
  { title: 'withdraw', url: '/dashboard/withdrawal', icon: Wallet },
  { title: 'transfer', url: '/dashboard/transfer', icon: ArrowLeftRight },
  { title: 'packages', url: '/dashboard/packages', icon: Package },
  { title: 'investments', url: '/dashboard/investments', icon: TrendingUp },
  { title: 'chatTitle', url: 'https://t.me/tradezero_group', icon: MessageCircle },
  { title: 'Referrals', url: '/dashboard/referrals', icon: Users },
  { title: 'settings', url: '/dashboard/settings', icon: Settings },
];

export const DashboardSidebar = () => {
  const { user, logout } = useAuth();
  const { data: userProfileData } = useGetUserProfileQuery(undefined, { skip: !user });
  const currentUser = userProfileData?.data || user;

  const { state, isMobile, setOpenMobile } = useSidebar();
  const location = useLocation();
  const [showSetupModal, setShowSetupModal] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Check if user needs to complete profile setup
    if (currentUser && !currentUser.isProfileSetup) {
      setShowSetupModal(true);
    }
  }, [currentUser]);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const isCollapsed = state === 'collapsed';

  const handleLogout = () => {
    // Close sidebar first if on mobile
    if (isMobile) {
      setOpenMobile(false);
    }
    logout();
    setShowLogoutDialog(false);
  };

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarTrigger className="m-2 self-end" />

      <SidebarContent>
        {/* User Profile */}
        {!isCollapsed && (
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {currentUser?.firstName?.[0]}{currentUser?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {currentUser?.firstName} {currentUser?.lastName}
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-xs text-sidebar-foreground/70">
                    ${currentUser?.balance?.toLocaleString() || '0.00'}
                  </p>
                  {currentUser?.isVerified && (
                    <Badge variant="secondary" className="text-xs px-1 py-0">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      onClick={handleNavClick}
                      className={`flex items-center space-x-2 ${isActive(item.url)
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                          : 'hover:bg-sidebar-accent/50'
                        }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{t(item.title)}</span>}
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
                    setShowLogoutDialog(true);
                    // Don't close sidebar immediately, let the modal show first
                  }}
                  className="flex items-center space-x-2 text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="w-4 h-4" />
                  {!isCollapsed && <span>{t('logout')}</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <LogoutConfirmDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogout}
      />
    </Sidebar>
  );
};

export const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 bg-background">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="md:hidden flex items-center gap-2 bg-slate-100/50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-200 dark:border-slate-700 w-fit">
                  <SidebarTrigger />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 pr-2">Menu</span>
                </div>

                {/* Logo injected for all screen sizes connecting back to landing page */}
                <Link to="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white hidden sm:block">
                    TradeZero
                  </span>
                </Link>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <LanguageSelector />
              </div>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};