import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";

import Index from "./pages/Index";
import MapExplorer from "./pages/MapExplorer";
import ReportIssue from "./pages/ReportIssue";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

// 🆕 new imports for signup
import CitizenSignup from "./pages/CitizenSignup";
import AdminSignup from "./pages/AdminSignup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<Index />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/map" element={<MapExplorer />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Auth pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/citizen" element={<CitizenSignup />} />
            <Route path="/admin" element={<AdminSignup />} />

            {/* Dashboards */}
            <Route path="/admin" element={<AdminDashboard />} />
            {/* Later you can add: <Route path="/citizen" element={<CitizenDashboard />} /> */}

            {/* Legal */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
