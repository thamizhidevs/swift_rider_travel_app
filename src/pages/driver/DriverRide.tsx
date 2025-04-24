
import { useState } from "react";
import { Clock, MapPin, Phone, User, AlertTriangle, StopCircle, PlayCircle, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function DriverRide() {
  const { toast } = useToast();
  const [isRideActive, setIsRideActive] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(1280); // in seconds (21 min 20 sec)
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleEndRide = () => {
    toast({
      title: "Ride Completed",
      description: "The ride has been completed successfully.",
    });
    setIsRideActive(false);
  };
  
  const handlePauseRide = () => {
    setIsPaused(!isPaused);
    toast({
      title: isPaused ? "Ride Resumed" : "Ride Paused",
      description: isPaused 
        ? "Fare meter is now running again." 
        : "Fare meter has been paused.",
    });
  };
  
  const handleSOS = () => {
    toast({
      title: "Emergency Assistance",
      description: "Emergency services have been notified.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ongoing Ride</h1>
          <p className="text-gray-600">
            {isRideActive 
              ? "You're currently on an active ride" 
              : "You have no active rides at the moment"}
          </p>
        </div>
        
        {isRideActive && (
          <div className="flex items-center space-x-2 bg-white/80 p-3 rounded-lg shadow-sm">
            <Clock className="h-5 w-5 text-purple" />
            <span className="text-sm">Elapsed Time:</span>
            <span className="text-sm font-semibold">{formatTime(elapsedTime)}</span>
          </div>
        )}
      </section>

      {isRideActive ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/80 rounded-lg p-4 shadow-sm overflow-hidden">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <MapPin className="mr-2 text-purple" />
              Navigation
            </h2>
            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center relative">
              <p className="text-gray-500">Interactive map with navigation will be displayed here</p>
              
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-3 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Turn-by-turn directions</h3>
                  <span className="text-xs bg-purple-soft text-purple px-2 py-1 rounded">2.3 mi remaining</span>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Continue on Broadway for 0.5 miles</p>
                  <p className="text-gray-500 text-xs mt-1">Next: Turn right onto 5th Avenue</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/80 rounded-lg p-4 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <User className="mr-2 text-purple" />
                Rider Information
              </h2>
              
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-purple-soft rounded-full flex items-center justify-center text-purple mr-3">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">Sarah Johnson</h3>
                  <div className="flex items-center text-sm">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="mr-2">4.9</span>
                    <span className="text-xs text-gray-500">35 rides</span>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                <Phone className="mr-2 h-4 w-4" />
                Contact Rider
              </Button>
            </div>
            
            <div className="bg-white/80 rounded-lg p-4 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <DollarSign className="mr-2 text-purple" />
                Fare Meter
              </h2>
              
              <div className="text-center p-3 bg-gray-50 rounded-lg mb-3">
                <p className="text-xs text-gray-500">Current Fare</p>
                <p className="text-3xl font-bold text-purple">$18.75</p>
                <p className="text-xs text-gray-500 mt-1">Base fare + distance + time</p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base fare</span>
                  <span className="font-medium">$5.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Distance (4.2 mi)</span>
                  <span className="font-medium">$10.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time (21 min)</span>
                  <span className="font-medium">$3.25</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                onClick={handlePauseRide} 
                variant="outline" 
                className="flex-1"
              >
                {isPaused ? <PlayCircle className="mr-2 h-4 w-4" /> : <StopCircle className="mr-2 h-4 w-4" />}
                {isPaused ? "Resume Ride" : "Pause Ride"}
              </Button>
              <Button 
                onClick={handleEndRide} 
                className="flex-1 bg-green-500 hover:bg-green-600"
              >
                End Ride
              </Button>
            </div>
            
            <Button 
              onClick={handleSOS} 
              variant="outline" 
              className="w-full border-red-200 hover:bg-red-50 text-red-500 hover:text-red-600"
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              SOS Emergency
            </Button>
          </div>
        </div>
      ) : (
        <div className="py-16 text-center bg-white/80 rounded-lg shadow-sm">
          <MapPin className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-700">No Active Ride</h3>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            You don't have any ongoing rides at the moment. 
            Check the dashboard or ride requests tab to accept new rides.
          </p>
          <div className="mt-6">
            <Button variant="outline" onClick={() => window.location.href = '/driver/requests'}>
              Check Ride Requests
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
