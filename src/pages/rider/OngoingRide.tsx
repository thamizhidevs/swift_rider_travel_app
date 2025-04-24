import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, MapPin, Clock, AlertTriangle, Car, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import QuickTips from "@/components/rider/QuickTips";

export default function OngoingRide() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [remainingTime, setRemainingTime] = useState(960); // 16 minutes in seconds
  const [isRideComplete, setIsRideComplete] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [cancelReason, setCancelReason] = useState("driver-late");
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  
  // Mock driver info
  const driver = {
    name: "Michael S.",
    car: "Toyota Camry",
    plate: "ABC 1234",
    color: "White",
    phone: "+1 555-123-4567",
    rating: 4.8,
    image: null
  };
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Countdown timer
  useEffect(() => {
    if (remainingTime > 0 && !isRideComplete) {
      const timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (remainingTime <= 0 && !isRideComplete) {
      // Auto complete ride for demo purposes
      setIsRideComplete(true);
      setRatingDialogOpen(true);
    }
  }, [remainingTime, isRideComplete]);
  
  const handleCallDriver = () => {
    toast({
      title: "Calling driver",
      description: "Connecting to Michael S."
    });
  };
  
  const handleCancelRide = () => {
    toast({
      title: "Ride Cancelled",
      description: "Your ride has been cancelled successfully.",
    });
    navigate("/rider/dashboard");
  };
  
  const handleSOS = () => {
    toast({
      title: "Emergency Alert Sent",
      description: "Help is on the way. Stay calm.",
      variant: "destructive"
    });
  };
  
  const submitRating = () => {
    toast({
      title: "Thanks for your feedback!",
      description: `You rated your trip ${rating} stars.`
    });
    setRatingDialogOpen(false);
    navigate("/rider/dashboard");
  };
  
  const mockCoordinates = [
    { lat: 40.712776, lng: -74.005974 },
    { lat: 40.714976, lng: -74.003974 },
    { lat: 40.716176, lng: -74.002974 },
    { lat: 40.718376, lng: -74.001974 },
  ];
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight mb-4">Your Ride</h1>
      {/* Ongoing ride themed illustration */}
      <div className="w-full flex justify-center mb-4">
        <img
          src="https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=400&q=80"
          alt="On the way"
          className="rounded-2xl shadow-xl w-72 h-32 object-cover"
        />
      </div>
      <QuickTips />
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <div className="w-full md:w-2/5 space-y-4">
          {/* Driver card */}
          <Card className="border-purple-soft overflow-hidden">
            <CardHeader className="bg-purple-soft/30 pb-3">
              <CardTitle className="flex items-center text-purple text-lg">
                <Car className="mr-2 h-5 w-5" /> {isRideComplete ? 'Ride Completed' : 'Your Driver'}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-4">
              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-full bg-purple-soft flex items-center justify-center text-purple font-bold">
                  {driver.image ? <img src={driver.image} alt={driver.name} /> : driver.name.charAt(0) + 'S'}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{driver.name}</p>
                      <div className="flex items-center mt-0.5">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm ml-1">{driver.rating}</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1"
                      onClick={handleCallDriver}
                    >
                      <Phone className="h-3 w-3" />
                      Call
                    </Button>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-600">{driver.car} • {driver.color}</p>
                    <p className="text-sm font-medium">{driver.plate}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="bg-gray-50 px-6 py-3">
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-purple mr-1" />
                    <span className="text-sm font-medium">
                      {isRideComplete ? 'Completed' : `ETA: ${formatTime(remainingTime)}`}
                    </span>
                  </div>
                  <div className="text-sm font-medium">
                    Trip #SW12345
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
          
          {/* Ride details */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">
                  <div className="w-3 h-3 rounded-full bg-purple-soft border-2 border-purple"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Pickup</p>
                  <p className="font-medium">Main Street Station</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-6 bg-gray-300"></div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">
                  <div className="w-3 h-3 rounded-full bg-purple"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Destination</p>
                  <p className="font-medium">Downtown Mall</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Distance</span>
                  <span className="font-medium">3.2 miles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Estimated fare</span>
                  <span className="font-medium">$12.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Payment method</span>
                  <span className="font-medium">Cash</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between border-t px-6 py-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="text-red-500 border-red-200 hover:border-red-300 hover:bg-red-50">Cancel Ride</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cancel Ride</DialogTitle>
                    <DialogDescription>
                      Please tell us why you want to cancel this ride.
                    </DialogDescription>
                  </DialogHeader>
                  <RadioGroup value={cancelReason} onValueChange={setCancelReason} className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="driver-late" id="driver-late" />
                      <Label htmlFor="driver-late">Driver is taking too long</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="plans-changed" id="plans-changed" />
                      <Label htmlFor="plans-changed">My plans changed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="wrong-address" id="wrong-address" />
                      <Label htmlFor="wrong-address">I entered wrong address</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other reason</Label>
                    </div>
                  </RadioGroup>
                  <DialogFooter>
                    <Button variant="outline" className="mr-2">No, Keep My Ride</Button>
                    <Button 
                      onClick={handleCancelRide}
                      className="bg-red-500 text-white hover:bg-red-600"
                    >
                      Yes, Cancel Ride
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button 
                variant="outline"
                className="border-red-500 bg-red-50 text-red-500 hover:bg-red-100"
                onClick={handleSOS}
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                SOS
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Map */}
        <div className="w-full md:w-3/5 h-[500px] bg-gray-200 rounded-lg relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <Car className="w-10 h-10 text-purple mb-2" />
            <p className="text-gray-600">Map with live tracking will be displayed here</p>
            <p className="text-sm text-gray-500 mt-2">(Interactive map with driver's real-time location)</p>
            
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm">
                {!isRideComplete ? (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">On the way to destination</p>
                      <p className="text-sm text-gray-600">3.2 miles remaining</p>
                    </div>
                    <div className="text-2xl font-bold text-purple">
                      {formatTime(remainingTime)}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <p className="font-medium text-green-600">Ride Completed</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Rating Dialog */}
      <Dialog open={ratingDialogOpen} onOpenChange={setRatingDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rate Your Trip</DialogTitle>
            <DialogDescription>
              How was your trip with {driver.name}?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    rating && star <= rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  <Star className={`h-8 w-8 ${rating && star <= rating ? 'fill-yellow-400' : ''}`} />
                </button>
              ))}
            </div>
            <Textarea 
              placeholder="Share your experience (optional)"
              className="resize-none"
            />
          </div>
          <DialogFooter>
            <Button 
              onClick={submitRating}
              className="bg-purple text-white hover:bg-purple-dark w-full"
              disabled={rating === null}
            >
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
