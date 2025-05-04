import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Pages
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import AIWriter from "@/pages/AIWriter";
import ContentCalendar from "@/pages/ContentCalendar";
import BrandVoice from "@/pages/BrandVoice";
import PlatformInsights from "@/pages/PlatformInsights";
import DesignStudio from "@/pages/DesignStudio";
import BrandAssets from "@/pages/BrandAssets";
import AudienceInsights from "@/pages/AudienceInsights";
import Platforms from "@/pages/Platforms";
import Settings from "@/pages/Settings";
import Login from "@/pages/Login";

// Components
import Sidebar from "@/components/Sidebar";

function ProtectedRoute({ component: Component, ...rest }: { component: React.ComponentType, [x: string]: any }) {
  const { currentUser, loading } = useAuth();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !currentUser) {
      setLocation("/login");
    }
  }, [currentUser, loading, setLocation]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return currentUser ? <Component {...rest} /> : null;
}

function AppRoutes() {
  const { currentUser } = useAuth();
  const [location] = useLocation();

  // If user is at login and already authenticated, redirect to dashboard
  useEffect(() => {
    if (currentUser && location === "/login") {
      window.location.href = "/";
    }
  }, [currentUser, location]);

  if (location === "/login") {
    return <Login />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Switch>
          <Route path="/" component={(props) => <ProtectedRoute component={Dashboard} {...props} />} />
          <Route path="/ai-writer" component={(props) => <ProtectedRoute component={AIWriter} {...props} />} />
          <Route path="/content-calendar" component={(props) => <ProtectedRoute component={ContentCalendar} {...props} />} />
          <Route path="/brand-voice" component={(props) => <ProtectedRoute component={BrandVoice} {...props} />} />
          <Route path="/platform-insights" component={(props) => <ProtectedRoute component={PlatformInsights} {...props} />} />
          <Route path="/design-studio" component={(props) => <ProtectedRoute component={DesignStudio} {...props} />} />
          <Route path="/brand-assets" component={(props) => <ProtectedRoute component={BrandAssets} {...props} />} />
          <Route path="/audience-insights" component={(props) => <ProtectedRoute component={AudienceInsights} {...props} />} />
          <Route path="/platforms" component={(props) => <ProtectedRoute component={Platforms} {...props} />} />
          <Route path="/settings" component={(props) => <ProtectedRoute component={Settings} {...props} />} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Switch>
            <Route path="/login" component={Login} />
            <Route component={AppRoutes} />
          </Switch>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
