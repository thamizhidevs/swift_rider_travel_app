import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Clock, CreditCard, Car, Bike, Truck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import QuickTips from "@/components/rider/QuickTips";

export default function BookRide() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [vehicleType, setVehicleType] = useState("car");
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isScheduleLater, setIsScheduleLater] = useState(false);

  const getFareEstimate = () => {
    const baseFare = {
      bike: 50,
      tuk: 80,
      car: 120,
      luxury: 200
    };
    return baseFare[vehicleType as keyof typeof baseFare];
  };

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate("/rider/ride");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight mb-4">Book a Ride</h1>
      
      <div className="w-full flex justify-center mb-5">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
          alt="Ride booking"
          className="rounded-2xl shadow-lg w-72 h-32 object-cover"
        />
      </div>
      <QuickTips />
      
      <Tabs defaultValue="ride" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ride">Book Now</TabsTrigger>
          <TabsTrigger value="package">Send Package</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ride" className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="w-full md:w-2/3">
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Pickup & Destination</CardTitle>
                    <CardDescription>Enter your ride details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickup">Pickup Location</Label>
                      <div className="flex">
                        <div className="bg-purple-soft p-2 rounded-l-md flex items-center">
                          <MapPin className="text-purple h-5 w-5" />
                        </div>
                        <Input 
                          id="pickup" 
                          placeholder="Enter pickup location"
                          className="rounded-l-none"
                          value={pickup}
                          onChange={(e) => setPickup(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dropoff">Destination</Label>
                      <div className="flex">
                        <div className="bg-purple-soft p-2 rounded-l-md flex items-center">
                          <MapPin className="text-purple h-5 w-5" />
                        </div>
                        <Input 
                          id="dropoff" 
                          placeholder="Enter destination"
                          className="rounded-l-none"
                          value={dropoff}
                          onChange={(e) => setDropoff(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id="schedule" 
                          className="rounded text-purple"
                          checked={isScheduleLater}
                          onChange={(e) => setIsScheduleLater(e.target.checked)}
                        />
                        <Label htmlFor="schedule">Schedule for Later</Label>
                      </div>
                      
                      {isScheduleLater && (
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label>Choose Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal mt-1",
                                    !scheduledDate && "text-muted-foreground"
                                  )}
                                >
                                  <Calendar className="mr-2 h-4 w-4" />
                                  {scheduledDate ? format(scheduledDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <CalendarComponent
                                  mode="single"
                                  selected={scheduledDate}
                                  onSelect={setScheduledDate}
                                  initialFocus
                                  className={cn("p-3 pointer-events-auto")}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          
                          <div>
                            <Label htmlFor="time">Choose Time</Label>
                            <div className="flex mt-1">
                              <div className="bg-purple-soft p-2 rounded-l-md flex items-center">
                                <Clock className="text-purple h-5 w-5" />
                              </div>
                              <Input 
                                id="time" 
                                type="time"
                                className="rounded-l-none"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button 
                      className="bg-purple text-white hover:bg-purple-dark"
                      onClick={handleContinue}
                      disabled={!pickup || !dropoff}
                    >
                      Continue
                    </Button>
                  </CardFooter>
                </Card>
              )}
              
              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Choose Vehicle Type</CardTitle>
                    <CardDescription>Select your preferred ride option</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      defaultValue="car" 
                      value={vehicleType}
                      onValueChange={setVehicleType}
                      className="grid gap-4"
                    >
                      <div>
                        <RadioGroupItem value="bike" id="bike" className="peer sr-only" />
                        <Label
                          htmlFor="bike"
                          className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-purple"
                        >
                          <div className="flex items-center gap-3">
                            <Bike className="h-5 w-5" />
                            <div>
                              <p className="font-medium">Bike</p>
                              <p className="text-sm text-muted-foreground">Fastest, 1 person</p>
                            </div>
                          </div>
                          <p className="font-bold">${getFareEstimate()}</p>
                        </Label>
                      </div>
                      
                      <div>
                        <RadioGroupItem value="tuk" id="tuk" className="peer sr-only" />
                        <Label
                          htmlFor="tuk"
                          className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-purple"
                        >
                          <div className="flex items-center gap-3">
                            <Truck className="h-5 w-5" />
                            <div>
                              <p className="font-medium">Tuk Tuk</p>
                              <p className="text-sm text-muted-foreground">Budget friendly, 3 people</p>
                            </div>
                          </div>
                          <p className="font-bold">${getFareEstimate()}</p>
                        </Label>
                      </div>
                      
                      <div>
                        <RadioGroupItem value="car" id="car" className="peer sr-only" />
                        <Label
                          htmlFor="car"
                          className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-purple"
                        >
                          <div className="flex items-center gap-3">
                            <Car className="h-5 w-5" />
                            <div>
                              <p className="font-medium">Car</p>
                              <p className="text-sm text-muted-foreground">Comfortable, 4 people</p>
                            </div>
                          </div>
                          <p className="font-bold">${getFareEstimate()}</p>
                        </Label>
                      </div>
                      
                      <div>
                        <RadioGroupItem value="luxury" id="luxury" className="peer sr-only" />
                        <Label
                          htmlFor="luxury"
                          className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-purple"
                        >
                          <div className="flex items-center gap-3">
                            <Award className="h-5 w-5" />
                            <div>
                              <p className="font-medium">Luxury</p>
                              <p className="text-sm text-muted-foreground">Premium, 4 people</p>
                            </div>
                          </div>
                          <p className="font-bold">${getFareEstimate()}</p>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleBack}>Back</Button>
                    <Button 
                      className="bg-purple text-white hover:bg-purple-dark"
                      onClick={handleContinue}
                    >
                      Continue
                    </Button>
                  </CardFooter>
                </Card>
              )}
              
              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Payment & Confirmation</CardTitle>
                    <CardDescription>Choose payment method and confirm your ride</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Payment Method</h3>
                      <RadioGroup 
                        defaultValue="cash" 
                        value={paymentMethod}
                        onValueChange={setPaymentMethod}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                      >
                        <div>
                          <RadioGroupItem value="cash" id="cash" className="peer sr-only" />
                          <Label
                            htmlFor="cash"
                            className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-purple h-full"
                          >
                            <CreditCard className="h-5 w-5 mb-1" />
                            <p className="font-medium">Cash</p>
                          </Label>
                        </div>
                        
                        <div>
                          <RadioGroupItem value="card" id="card" className="peer sr-only" />
                          <Label
                            htmlFor="card"
                            className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-purple h-full"
                          >
                            <CreditCard className="h-5 w-5 mb-1" />
                            <p className="font-medium">Card</p>
                          </Label>
                        </div>
                        
                        <div>
                          <RadioGroupItem value="wallet" id="wallet" className="peer sr-only" />
                          <Label
                            htmlFor="wallet"
                            className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-purple h-full"
                          >
                            <CreditCard className="h-5 w-5 mb-1" />
                            <p className="font-medium">Wallet</p>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <h3 className="font-medium">Ride Summary</h3>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                          <div>
                            <p className="font-medium">Pickup</p>
                            <p className="text-sm text-gray-600">{pickup}</p>
                          </div>
                        </div>
                        
                        {isScheduleLater && scheduledDate && (
                          <div className="text-right text-sm text-gray-600">
                            <p>{format(scheduledDate, "MMM d")}</p>
                            <p>5:30 PM</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                          <div>
                            <p className="font-medium">Destination</p>
                            <p className="text-sm text-gray-600">{dropoff}</p>
                          </div>
                        </div>
                        
                        <div className="text-right text-sm text-gray-600">
                          <p>Est. Time: 25 mins</p>
                          <p>Distance: 12 km</p>
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t">
                        <div className="flex justify-between py-1">
                          <span>Base Fare</span>
                          <span>${getFareEstimate()}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span>Service Fee</span>
                          <span>$5</span>
                        </div>
                        <div className="flex justify-between py-1 font-bold">
                          <span>Total</span>
                          <span>${getFareEstimate() + 5}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleBack}>Back</Button>
                    <Button 
                      className="bg-purple text-white hover:bg-purple-dark"
                      onClick={handleContinue}
                    >
                      Book Now
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
            
            <div className="w-full md:w-1/3">
              <Card className="border-0 overflow-hidden">
                <div className="h-[400px] bg-gray-200 rounded-lg relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <p>Map View</p>
                    <p className="text-sm">(Map integration will be added here)</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="package">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <p className="text-lg font-medium">Package delivery coming soon!</p>
                <p className="text-gray-500">Stay tuned for our package delivery service.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
