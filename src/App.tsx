import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";

import LandingPage from "@/pages/landing/LandingPage";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Overview from "@/pages/dashboard/Overview";
import GrowthPage from "@/pages/dashboard/GrowthPage";
import CareerPage from "@/pages/dashboard/CareerPage";
import RewardsPage from "@/pages/dashboard/RewardsPage";
import TimelinePage from "@/pages/dashboard/TimelinePage";
import AssessmentPage from "@/pages/assessment/AssessmentPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import SettingsPage from "@/pages/settings/SettingsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
    <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
      <Route index element={<Overview />} />
      <Route path="growth" element={<GrowthPage />} />
      <Route path="career" element={<CareerPage />} />
      <Route path="rewards" element={<RewardsPage />} />
      <Route path="timeline" element={<TimelinePage />} />
    </Route>
    <Route path="/assessment" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
      <Route index element={<AssessmentPage />} />
    </Route>
    <Route path="/profile" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
      <Route index element={<ProfilePage />} />
    </Route>
    <Route path="/settings" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
      <Route index element={<SettingsPage />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
