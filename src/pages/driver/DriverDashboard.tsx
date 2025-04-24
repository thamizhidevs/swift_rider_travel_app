import { useState } from "react";
import { BarChart, Battery, Car, CheckCircle, CircleX, MapPin, Star, StopCircle, UserCheck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import DriverHeroBanner from "@/components/driver/DriverHeroBanner";
import DriverWelcomeCard from "@/components/driver/DriverWelcomeCard";
import DriverAnnouncementCard from "@/components/driver/DriverAnnouncementCard";
import DriverTipsSection from "@/components/driver/DriverTipsSection";
import DriverHowItHelpsSection from "@/components/driver/DriverHowItHelpsSection";

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(false);
  const { toast } = useToast();
  
  const handleToggleStatus = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    toast({
      title: newStatus ? "You are now online" : "You are now offline",
      description: newStatus 
        ? "You can now receive ride requests." 
        : "You will not receive any ride requests.",
      variant: newStatus ? "default" : "destructive",
    });
  };

  return (
    <div className="space-y-8">
      <DriverHeroBanner />
      <DriverAnnouncementCard />
      <DriverWelcomeCard />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/80 rounded-lg p-4 shadow-sm flex items-center space-x-4">
          <div className="bg-purple-soft p-3 rounded-full">
            <Car className="text-purple w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Rides Today</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>
        
        <div className="bg-white/80 rounded-lg p-4 shadow-sm flex items-center space-x-4">
          <div className="bg-purple-soft p-3 rounded-full">
            <BarChart className="text-purple w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Earnings</p>
            <p className="text-2xl font-bold">$245.50</p>
          </div>
        </div>
        
        <div className="bg-white/80 rounded-lg p-4 shadow-sm flex items-center space-x-4">
          <div className="bg-purple-soft p-3 rounded-full">
            <Star className="text-purple w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Rating</p>
            <div className="flex items-center">
              <p className="text-2xl font-bold">4.8</p>
              <div className="text-yellow-500 flex ml-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <DriverTipsSection />
      <DriverHowItHelpsSection />
      
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <MapPin className="mr-2 text-purple" />
            Current Location
          </h2>
          <div className="h-60 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Map will be displayed here</p>
          </div>
          <div className="mt-3 text-sm text-gray-600">
            <p>123 Main Street, New York, NY 10001</p>
          </div>
        </div>
        
        <div className="bg-white/80 rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <UserCheck className="mr-2 text-purple" />
            Current Ride
          </h2>
          
          {isOnline ? (
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Sarah Johnson</h3>
                  <div className="text-sm text-gray-600 mt-1 space-y-1">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <p>Pickup: 456 Park Ave</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      <p>Dropoff: 789 Broadway</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold mt-2">$18.50</p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-xs bg-purple-soft text-purple px-2 py-1 rounded">3.2 mi</p>
                  <p className="text-xs text-gray-500 mt-1">12 min away</p>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <Button className="flex-1" variant="outline">Call</Button>
                <Button className="flex-1 bg-green-500 hover:bg-green-600">Start Ride</Button>
              </div>
            </div>
          ) : (
            <div className="h-40 flex flex-col items-center justify-center text-gray-500">
              <CircleX className="mb-2 h-8 w-8" />
              <p>You're currently offline</p>
              <p className="text-sm">Go online to receive ride requests</p>
            </div>
          )}
        </div>
      </section>
      
      <section className="bg-white/80 rounded-lg p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Vehicle Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg flex items-center">
            <Battery className="h-5 w-5 mr-2 text-green-500" />
            <div>
              <p className="text-xs text-gray-500">Fuel Level</p>
              <p className="font-medium">78%</p>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
            <div>
              <p className="text-xs text-gray-500">Vehicle Status</p>
              <p className="font-medium">Good Condition</p>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg flex items-center">
            <StopCircle className="h-5 w-5 mr-2 text-yellow-500" />
            <div>
              <p className="text-xs text-gray-500">Next Service</p>
              <p className="font-medium">In 3 weeks</p>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg flex items-center">
            <ShieldCheck className="h-5 w-5 mr-2 text-purple" />
            <div>
              <p className="text-xs text-gray-500">Insurance</p>
              <p className="font-medium">Valid</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
