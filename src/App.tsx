import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CombinedPage from "./pages/CombinedPage";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Enrollment from "./pages/Enrollment";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEnrollments from "./pages/AdminEnrollments";
import AdminNews from "./pages/AdminNews";
import AdminEvents from "./pages/AdminEvents";
import AdminGallery from "./pages/AdminGallery";
import AdminMessages from "./pages/AdminMessages";
import AdminPricing from "./pages/AdminPricing";
import AdminSettings from "./pages/AdminSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1 pt-16 md:pt-20">
                    <CombinedPage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/gallery" element={
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1 pt-16 md:pt-20">
                    <Gallery />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/contact" element={
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1 pt-16 md:pt-20">
                    <Contact />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/enrollment" element={
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1 pt-16 md:pt-20">
                    <Enrollment />
                  </main>
                  <Footer />
                </div>
              } />
              
              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/*" element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="/dashboard" element={<AdminDashboard />} />
                    <Route path="/enrollments" element={<AdminEnrollments />} />
                    <Route path="/news" element={<AdminNews />} />
                    <Route path="/events" element={<AdminEvents />} />
                    <Route path="/gallery" element={<AdminGallery />} />
                    <Route path="/messages" element={<AdminMessages />} />
                    <Route path="/pricing" element={<AdminPricing />} />
                    <Route path="/settings" element={<AdminSettings />} />
                    <Route path="/" element={<Navigate to="/admin/dashboard" />} />
                  </Routes>
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
