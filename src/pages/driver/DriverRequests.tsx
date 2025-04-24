
import { useState } from "react";
import { Bell, MapPin, DollarSign, Clock, CheckCircle, XCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface RideRequest {
  id: string;
  rider: {
    name: string;
    rating: number;
  };
  pickup: string;
  dropoff: string;
  fare: number;
  distance: string;
  timeAway: string;
  timestamp: string;
}

export default function DriverRequests() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<RideRequest[]>([
    {
      id: "req-1",
      rider: {
        name: "Emma Wilson",
        rating: 4.8,
      },
      pickup: "34 Park Avenue",
      dropoff: "Grand Central Station",
      fare: 12.75,
      distance: "2.3 mi",
      timeAway: "5 min",
      timestamp: "Just now"
    },
    {
      id: "req-2",
      rider: {
        name: "Mike Johnson",
        rating: 4.6,
      },
      pickup: "125 Broadway",
      dropoff: "Times Square",
      fare: 18.50,
      distance: "3.7 mi",
      timeAway: "8 min",
      timestamp: "2 min ago"
    },
    {
      id: "req-3",
      rider: {
        name: "Lisa Chen",
        rating: 4.9,
      },
      pickup: "52 West 4th Street",
      dropoff: "JFK Airport",
      fare: 45.00,
      distance: "14.1 mi",
      timeAway: "12 min",
      timestamp: "5 min ago"
    }
  ]);

  const handleAcceptRequest = (id: string) => {
    const request = requests.find(r => r.id === id);
    setRequests(requests.filter(r => r.id !== id));
    
    toast({
      title: "Ride Accepted",
      description: `You've accepted a ride request from ${request?.rider.name}.`,
    });
  };

  const handleRejectRequest = (id: string) => {
    setRequests(requests.filter(r => r.id !== id));
    
    toast({
      title: "Ride Rejected",
      description: "You've rejected this ride request.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ride Requests</h1>
          <p className="text-gray-600">View and manage incoming ride requests</p>
        </div>
        
        <div className="flex items-center space-x-2 bg-white/80 p-3 rounded-lg shadow-sm">
          <Bell className="h-5 w-5 text-purple" />
          <span className="text-sm text-gray-700">Notifications:</span>
          <span className="text-sm font-semibold">On</span>
        </div>
      </section>

      {requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="bg-white/90 rounded-lg p-5 shadow-sm border border-gray-100 animate-fade-in">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-purple-soft rounded-full flex items-center justify-center text-purple mr-3">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{request.rider.name}</h3>
                    <div className="flex items-center text-sm">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>{request.rider.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">{request.timestamp}</span>
                  <span className="block mt-1 text-xs bg-purple-soft text-purple px-2 py-1 rounded">
                    {request.distance}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-start">
                  <div className="min-w-8 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full mx-auto"></div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Pickup Location</p>
                    <p className="text-sm">{request.pickup}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="min-w-8 mt-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full mx-auto"></div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Dropoff Location</p>
                    <p className="text-sm">{request.dropoff}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center pt-3 border-t border-gray-100">
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="font-semibold">${request.fare.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm">{request.timeAway} away</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => handleRejectRequest(request.id)}
                    variant="outline" 
                    size="sm"
                    className="border-red-200 hover:bg-red-50 text-red-500 hover:text-red-600"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                  <Button 
                    onClick={() => handleAcceptRequest(request.id)}
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Accept
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center bg-white/80 rounded-lg shadow-sm">
          <Bell className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-700">No Active Requests</h3>
          <p className="text-gray-500 mt-1">New ride requests will appear here</p>
        </div>
      )}
    </div>
  );
}
