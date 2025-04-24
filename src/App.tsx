
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react"; // Explicitly import React
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import RiderLayout from "./components/layouts/RiderLayout";
import RiderDashboard from "./pages/rider/RiderDashboard";
import RideHistory from "./pages/rider/RideHistory"; 
import BookRide from "./pages/rider/BookRide";
import OngoingRide from "./pages/rider/OngoingRide";
import Payments from "./pages/rider/Payments";
import Ratings from "./pages/rider/Ratings";
import DriverLayout from "./components/layouts/DriverLayout";
import DriverDashboard from "./pages/driver/DriverDashboard";
import DriverRequests from "./pages/driver/DriverRequests";
import DriverRide from "./pages/driver/DriverRide";
import DriverEarnings from "./pages/driver/DriverEarnings";
import DriverRatings from "./pages/driver/DriverRatings";
import DriverSettings from "./pages/driver/DriverSettings";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Rider Routes */}
            <Route path="/rider" element={<RiderLayout />}>
              <Route path="dashboard" element={<RiderDashboard />} />
              <Route path="book" element={<BookRide />} />
              <Route path="ride" element={<OngoingRide />} />
              <Route path="history" element={<RideHistory />} />
              <Route path="payments" element={<Payments />} />
              <Route path="ratings" element={<Ratings />} />
              <Route path="settings" element={<div className="p-12 text-center"><h1 className="text-2xl font-bold">Settings</h1><p>Coming soon...</p></div>} />
            </Route>

            {/* Driver Routes */}
            <Route path="/driver" element={<DriverLayout />}>
              <Route path="dashboard" element={<DriverDashboard />} />
              <Route path="requests" element={<DriverRequests />} />
              <Route path="ride" element={<DriverRide />} />
              <Route path="earnings" element={<DriverEarnings />} />
              <Route path="ratings" element={<DriverRatings />} />
              <Route path="settings" element={<DriverSettings />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
