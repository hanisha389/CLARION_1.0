import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LimelightNav, NavItem } from '@/components/ui/limelight-nav';
import {
  LayoutDashboard, TrendingUp, Briefcase, Trophy, Clock, Brain, User, Settings, LogOut
} from 'lucide-react';

const navRoutes = [
  { path: '/dashboard', icon: <LayoutDashboard />, label: 'Overview' },
  { path: '/dashboard/growth', icon: <TrendingUp />, label: 'Growth' },
  { path: '/dashboard/career', icon: <Briefcase />, label: 'Career' },
  { path: '/dashboard/rewards', icon: <Trophy />, label: 'Rewards' },
  { path: '/dashboard/timeline', icon: <Clock />, label: 'Timeline' },
  { path: '/assessment', icon: <Brain />, label: 'Assessment' },
  { path: '/profile', icon: <User />, label: 'Profile' },
  { path: '/settings', icon: <Settings />, label: 'Settings' },
];

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const activeIndex = navRoutes.findIndex((r) => location.pathname === r.path);

  const navItems: NavItem[] = navRoutes.map((r) => ({
    id: r.path,
    icon: r.icon,
    label: r.label,
    onClick: () => navigate(r.path),
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-3 bg-background/80 backdrop-blur-xl border-b border-border">
        <h1 className="text-lg font-semibold tracking-tight">CLARION</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground hidden sm:block">{user?.full_name}</span>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
            {user?.full_name?.charAt(0) || 'U'}
          </div>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Outlet />
      </main>

      {/* Floating Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <LimelightNav
          items={navItems}
          activeIndex={activeIndex >= 0 ? activeIndex : 0}
          className="bg-card/90 backdrop-blur-2xl border-border/50 shadow-xl"
        />
      </div>
    </div>
  );
};

export default DashboardLayout;
