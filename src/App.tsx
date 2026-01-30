import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { useGTMPageTracking } from '@/hooks/useGTMPageTracking';
import { useGA4PageTracking } from '@/hooks/useGA4PageTracking';
import { initGA4 } from '@/lib/ga4';
import { useEffect } from 'react';
import Index from './pages/Index';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const AppRoutes = () => {
  // Track page views automatically with both GTM and GA4
  useGTMPageTracking();
  useGA4PageTracking();

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  // Initialize GA4 once when app starts
  useEffect(() => {
    initGA4();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
