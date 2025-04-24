import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Car, Clock, Download, MapPin, Search, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import RideHighlights from "@/components/rider/RideHighlights";

const pastRides = [
  {
    id: "ride-001",
    date: "2023-06-15",
    time: "14:30",
    pickup: "Main Street Station",
    dropoff: "Downtown Mall",
    fare: 15.50,
    duration: "25 mins",
    distance: "3.2 miles",
    driver: {
      name: "Michael S.",
      rating: 4.8,
      vehicle: "Toyota Camry"
    },
    status: "completed",
    userRating: 5
  },
  {
    id: "ride-002",
    date: "2023-06-12",
    time: "09:15",
    pickup: "Airport Terminal B",
    dropoff: "Grand Hotel",
    fare: 32.75,
    duration: "45 mins",
    distance: "12.5 miles",
    driver: {
      name: "Amanda J.",
      rating: 4.9,
      vehicle: "Honda Civic"
    },
    status: "completed",
    userRating: 4
  },
  {
    id: "ride-003",
    date: "2023-06-08",
    time: "19:45",
    pickup: "Tech Park",
    dropoff: "Riverside Apartments",
    fare: 22.30,
    duration: "35 mins",
    distance: "8.7 miles",
    driver: {
      name: "Robert K.",
      rating: 4.7,
      vehicle: "Ford Focus"
    },
    status: "completed",
    userRating: 5
  },
  {
    id: "ride-004",
    date: "2023-06-05",
    time: "08:30",
    pickup: "Riverside Apartments",
    dropoff: "Central Station",
    fare: 12.80,
    duration: "18 mins",
    distance: "4.5 miles",
    driver: {
      name: "Sarah L.",
      rating: 4.6,
      vehicle: "Hyundai Sonata"
    },
    status: "cancelled",
    cancelReason: "Driver couldn't find location"
  },
  {
    id: "ride-005",
    date: "2023-06-01",
    time: "21:15",
    pickup: "Marina Bay Restaurant",
    dropoff: "Oakwood Residences",
    fare: 18.50,
    duration: "28 mins",
    distance: "6.2 miles",
    driver: {
      name: "Daniel P.",
      rating: 4.9,
      vehicle: "Kia Optima"
    },
    status: "completed",
    userRating: 5
  }
];

export default function RideHistory() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  
  const handleBookAgain = (ride: typeof pastRides[0]) => {
    navigate("/rider/book", {
      state: {
        pickup: ride.pickup,
        dropoff: ride.dropoff
      }
    });
    
    toast({
      title: "Booking a new ride",
      description: "We've pre-filled your pickup and destination."
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };
  
  const filteredRides = pastRides.filter(ride => {
    const matchesSearch = 
      ride.pickup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.dropoff.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.driver.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    if (filter === "completed") return matchesSearch && ride.status === "completed";
    if (filter === "cancelled") return matchesSearch && ride.status === "cancelled";
    
    return matchesSearch;
  });
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight mb-4">Ride History</h1>
      <RideHighlights />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Filter by Date</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by location or driver"
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all" value={filter} onValueChange={setFilter} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="space-y-4">
        {filteredRides.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-gray-100 p-3 mb-3">
                <Clock className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium">No rides found</h3>
              <p className="text-sm text-gray-500 text-center mt-1">
                {searchQuery 
                  ? "Try adjusting your search terms" 
                  : "You haven't taken any rides yet"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredRides.map((ride) => (
            <Card key={ride.id} className="overflow-hidden">
              <div className={`h-1 ${ride.status === 'completed' ? 'bg-green-500' : 'bg-orange-400'}`}></div>
              <CardHeader className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-purple-soft p-2">
                      <Car className="h-5 w-5 text-purple" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {formatDate(ride.date)} • {ride.time}
                      </p>
                      <CardTitle className="text-base mt-0.5">
                        {ride.status === 'completed' 
                          ? `${ride.duration} trip • ${ride.distance}` 
                          : 'Cancelled'}
                      </CardTitle>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">${ride.fare.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">
                      {ride.status === 'completed' ? 'Paid • Cash' : 'Cancelled'}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4 pt-0">
                <div className="flex flex-wrap sm:flex-nowrap gap-6">
                  <div className="w-full sm:w-3/5">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-purple"></div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500">Pickup</p>
                          <p className="text-sm">{ride.pickup}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500">Dropoff</p>
                          <p className="text-sm">{ride.dropoff}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full sm:w-2/5">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-purple-soft flex items-center justify-center text-purple">
                          <User className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{ride.driver.name}</p>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-xs ml-1">{ride.driver.rating}</span>
                            <span className="text-xs text-gray-500 ml-2">{ride.driver.vehicle}</span>
                          </div>
                        </div>
                      </div>
                      
                      {ride.status === 'completed' && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500">Your rating</p>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star}
                                  className={`h-3 w-3 ${star <= ride.userRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBookAgain(ride)}
                    className="text-purple border-purple hover:bg-purple-soft/20"
                  >
                    Book Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
