import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicLayout } from "@/layouts/public-layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Catalog from "./pages/catalog";
import Categories from "./pages/categories";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Index />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="categories" element={<Categories />} />
            <Route path="auth/login" element={<Login />} />
            <Route path="auth/register" element={<Register />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
