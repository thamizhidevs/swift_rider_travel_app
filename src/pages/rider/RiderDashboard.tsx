import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Home, MapPin, Star, User, Car } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import BannerWelcome from "@/components/rider/BannerWelcome";
import TestimonialCarousel from "@/components/rider/TestimonialCarousel";
import QuickTips from "@/components/rider/QuickTips";

const rideData = [
  { name: 'Mon', rides: 2 },
  { name: 'Tue', rides: 5 },
  { name: 'Wed', rides: 3 },
  { name: 'Thu', rides: 0 },
  { name: 'Fri', rides: 7 },
  { name: 'Sat', rides: 4 },
  { name: 'Sun', rides: 2 },
];

const promotions = [
  {
    id: 1,
    title: "50% Off First Ride",
    code: "WELCOME50",
    expires: "2023-06-30",
    description: "Get 50% off on your first ride with us"
  },
  {
    id: 2,
    title: "Weekend Special",
    code: "WEEKEND25",
    expires: "2023-06-30",
    description: "25% off on all weekend rides"
  }
];

export default function RiderDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");
  
  return (
    <div className="space-y-6">
      {/* Immersive welcome banner */}
      <BannerWelcome />
      
      {/* Dashboard calls to action */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, John!</h1>
          <p className="text-muted-foreground">Ready for your next ride?</p>
        </div>
        <Button className="bg-purple text-white hover:bg-purple-dark">
          <MapPin className="mr-2 h-4 w-4" /> Book a Ride
        </Button>
      </div>
      
      {/* Dashboard tips and carousel */}
      <QuickTips />
      <TestimonialCarousel />

      <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          {/* Active Ride Card (if any) */}
          <Card className="relative border-purple-soft overflow-hidden">
            <div className="absolute top-0 right-0 h-24 w-24 -mt-8 -mr-8 bg-purple rounded-full opacity-10"></div>
            <div className="absolute bottom-0 left-0 h-16 w-16 -mb-6 -ml-6 bg-purple-soft rounded-full opacity-20"></div>
            
            <CardHeader>
              <CardTitle className="flex items-center text-purple">
                <Car className="mr-2 h-5 w-5" /> Upcoming Ride
              </CardTitle>
              <CardDescription>You have a ride scheduled for today</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pickup</p>
                  <p className="font-medium">Main Street Station</p>
                  <p className="text-sm text-muted-foreground">Today, 5:30 PM</p>
                </div>
                
                <div className="hidden sm:block h-auto w-px bg-border"></div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Destination</p>
                  <p className="font-medium">Downtown Mall</p>
                  <p className="text-sm text-muted-foreground">ETA: 5:45 PM</p>
                </div>
                
                <div className="hidden sm:block h-auto w-px bg-border"></div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Driver</p>
                  <p className="font-medium">Michael S.</p>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-purple text-purple" />
                    <span className="text-sm ml-1">4.8</span>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">Cancel</Button>
              <Button className="bg-purple text-white hover:bg-purple-dark" size="sm">View Details</Button>
            </CardFooter>
          </Card>
          
          {/* Weekly Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Ride Summary</CardTitle>
              <CardDescription>Your ride activity for the past week</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={rideData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorRides" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7E69AB" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#7E69AB" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="rides" 
                      stroke="#7E69AB" 
                      fillOpacity={1} 
                      fill="url(#colorRides)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-purple-soft/20 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Total Rides</p>
                  <p className="text-xl font-semibold">23</p>
                </div>
                <div className="bg-purple-soft/20 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Distance</p>
                  <p className="text-xl font-semibold">142 km</p>
                </div>
                <div className="bg-purple-soft/20 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Spent</p>
                  <p className="text-xl font-semibold">$78.50</p>
                </div>
                <div className="bg-purple-soft/20 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Avg. Rating</p>
                  <div className="flex items-center">
                    <p className="text-xl font-semibold mr-1">4.9</p>
                    <Star className="h-4 w-4 fill-purple text-purple" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="favorites" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Saved Locations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Saved Locations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-soft p-2 rounded-lg">
                    <Home className="h-5 w-5 text-purple" />
                  </div>
                  <div>
                    <p className="font-medium">Home</p>
                    <p className="text-sm text-muted-foreground">123 Main Street, Apt 4B</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-soft p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-purple" />
                  </div>
                  <div>
                    <p className="font-medium">Work</p>
                    <p className="text-sm text-muted-foreground">456 Business Ave, Floor 12</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-soft p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-purple" />
                  </div>
                  <div>
                    <p className="font-medium">Gym</p>
                    <p className="text-sm text-muted-foreground">789 Fitness Blvd</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Add New Location
                </Button>
              </CardFooter>
            </Card>
            
            {/* Favorite Drivers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Favorite Drivers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-purple-soft flex items-center justify-center text-purple font-medium">
                      MS
                    </div>
                    <div>
                      <p className="font-medium">Michael S.</p>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-purple text-purple" />
                        <span className="text-xs ml-1">4.8 • 12 rides</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Request</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-purple-soft flex items-center justify-center text-purple font-medium">
                      AJ
                    </div>
                    <div>
                      <p className="font-medium">Amanda J.</p>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-purple text-purple" />
                        <span className="text-xs ml-1">4.9 • 8 rides</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Request</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="promotions">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {promotions.map((promo) => (
              <Card key={promo.id} className="overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-purple to-purple-light"></div>
                <CardHeader>
                  <CardTitle>{promo.title}</CardTitle>
                  <CardDescription>Expires on {new Date(promo.expires).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{promo.description}</p>
                  <div className="mt-4 p-2 bg-purple-soft/30 rounded-md flex items-center justify-between">
                    <code className="font-mono font-bold text-purple">{promo.code}</code>
                    <Button variant="ghost" size="sm">Copy</Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-purple text-white hover:bg-purple-dark">Apply Now</Button>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="border-dashed flex flex-col items-center justify-center p-6">
              <p className="text-muted-foreground mb-4 text-center">Have a promo code?</p>
              <Button variant="outline">Redeem Code</Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
