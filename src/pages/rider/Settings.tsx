
import { useState } from "react";
import { Bell, Camera, Check, Globe, Home, Lock, MapPin, Save, User, Wallet, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("profile");
  
  // Saved locations
  const [savedLocations, setSavedLocations] = useState([
    {
      id: "location-1",
      name: "Home",
      address: "123 Main Street, Apt 4B",
      icon: "home"
    },
    {
      id: "location-2",
      name: "Work",
      address: "456 Business Ave, Floor 12",
      icon: "briefcase"
    },
    {
      id: "location-3",
      name: "Gym",
      address: "789 Fitness Blvd",
      icon: "pin"
    }
  ]);
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    rides: true,
    promotions: false,
    rideUpdates: true,
    payments: true,
    news: false,
    email: true,
    push: true,
    sms: false
  });
  
  const handleSaveProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully."
    });
  };
  
  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully."
    });
  };
  
  const handleDeleteLocation = (locationId: string) => {
    setSavedLocations(savedLocations.filter(location => location.id !== locationId));
    
    toast({
      title: "Location removed",
      description: "The saved location has been removed from your account."
    });
  };
  
  const handleAddLocation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newLocation = {
      id: `location-${Date.now()}`,
      name: formData.get("locationName") as string,
      address: formData.get("address") as string,
      icon: "pin"
    };
    
    setSavedLocations([...savedLocations, newLocation]);
    
    // Reset the form
    e.currentTarget.reset();
    
    toast({
      title: "Location added",
      description: `${newLocation.name} has been added to your saved locations.`
    });
  };
  
  const handleUpdateNotifications = (key: keyof typeof notifications, value: boolean) => {
    setNotifications({
      ...notifications,
      [key]: value
    });
    
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been updated."
    });
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight mb-4">Settings</h1>
      
      <Tabs 
        defaultValue={selectedTab} 
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="profile" className="flex gap-2 items-center">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex gap-2 items-center">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="locations" className="flex gap-2 items-center">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">Locations</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex gap-2 items-center">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex gap-2 items-center">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <form onSubmit={handleSaveProfile}>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile picture */}
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-purple-soft flex items-center justify-center text-purple text-2xl font-bold">
                      JD
                    </div>
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-white"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-1 text-center sm:text-left">
                    <p className="font-medium">Profile Picture</p>
                    <p className="text-sm text-gray-500">
                      PNG or JPG, max 1MB. A clear photo helps your driver identify you.
                    </p>
                    <div className="pt-2">
                      <Button variant="outline" size="sm">Upload New Picture</Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 555-123-4567" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" defaultValue="1990-01-15" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button">Cancel</Button>
                <Button type="submit" className="bg-purple text-white hover:bg-purple-dark">
                  Save Changes
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <form onSubmit={handleChangePassword}>
              <CardHeader>
                <CardTitle>Password & Security</CardTitle>
                <CardDescription>
                  Change your password and manage security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Enable 2FA</p>
                      <p className="text-sm text-gray-500">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch id="twoFactor" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Account Activity</h3>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">
                      Last login: June 15, 2023, 10:45 AM from New York, USA
                    </p>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Lock className="h-4 w-4" />
                      View Login History
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button">Cancel</Button>
                <Button type="submit" className="bg-purple text-white hover:bg-purple-dark">
                  Update Password
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="locations">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Saved Locations</CardTitle>
                <CardDescription>
                  Manage your frequently visited places
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {savedLocations.map((location) => (
                  <div 
                    key={location.id} 
                    className="flex items-center justify-between p-3 border rounded-md"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-soft p-2 rounded-lg">
                        {location.icon === "home" ? (
                          <Home className="h-5 w-5 text-purple" />
                        ) : (
                          <MapPin className="h-5 w-5 text-purple" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{location.name}</p>
                        <p className="text-sm text-gray-500">{location.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-500 hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleDeleteLocation(location.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <form onSubmit={handleAddLocation}>
                <CardHeader>
                  <CardTitle>Add New Location</CardTitle>
                  <CardDescription>
                    Save a new location to your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="locationName">Location Name</Label>
                    <Input 
                      id="locationName" 
                      name="locationName"
                      placeholder="e.g. Home, Work, Gym"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      name="address"
                      placeholder="Enter full address"
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-purple text-white hover:bg-purple-dark gap-1">
                    <Plus className="h-4 w-4" />
                    Add Location
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Customize your app experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Language</h3>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Region & Currency</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Select defaultValue="us">
                      <SelectTrigger id="region">
                        <SelectValue placeholder="Select Region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="eu">Europe</SelectItem>
                        <SelectItem value="asia">Asia</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="jpy">JPY (¥)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">App Settings</h3>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-gray-500">
                      Switch between light and dark themes
                    </p>
                  </div>
                  <Switch id="darkMode" />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Default Payment</p>
                    <p className="text-sm text-gray-500">
                      Set your preferred payment method
                    </p>
                  </div>
                  <Select defaultValue="card">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="wallet">Wallet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Sound Effects</p>
                    <p className="text-sm text-gray-500">
                      Enable sounds for notifications and actions
                    </p>
                  </div>
                  <Switch id="soundEffects" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-purple text-white hover:bg-purple-dark gap-1">
                <Save className="h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Choose what notifications you receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <h3 className="font-medium">Notification Types</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Ride Updates</p>
                      <p className="text-sm text-gray-500">
                        Notifications about your upcoming and active rides
                      </p>
                    </div>
                    <Switch 
                      id="rideUpdates"
                      checked={notifications.rideUpdates}
                      onCheckedChange={(checked) => 
                        handleUpdateNotifications("rideUpdates", checked)
                      }
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Payment Confirmations</p>
                      <p className="text-sm text-gray-500">
                        Notifications about payments and receipts
                      </p>
                    </div>
                    <Switch 
                      id="payments"
                      checked={notifications.payments}
                      onCheckedChange={(checked) => 
                        handleUpdateNotifications("payments", checked)
                      }
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Promotions & Discounts</p>
                      <p className="text-sm text-gray-500">
                        Notifications about deals and special offers
                      </p>
                    </div>
                    <Switch 
                      id="promotions"
                      checked={notifications.promotions}
                      onCheckedChange={(checked) => 
                        handleUpdateNotifications("promotions", checked)
                      }
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">SwiftRide News</p>
                      <p className="text-sm text-gray-500">
                        Updates about new features and service changes
                      </p>
                    </div>
                    <Switch 
                      id="news"
                      checked={notifications.news}
                      onCheckedChange={(checked) => 
                        handleUpdateNotifications("news", checked)
                      }
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-6">
                <h3 className="font-medium">Notification Channels</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch 
                      id="email"
                      checked={notifications.email}
                      onCheckedChange={(checked) => 
                        handleUpdateNotifications("email", checked)
                      }
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-gray-500">
                        Notifications on your device
                      </p>
                    </div>
                    <Switch 
                      id="push"
                      checked={notifications.push}
                      onCheckedChange={(checked) => 
                        handleUpdateNotifications("push", checked)
                      }
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-gray-500">
                        Receive text messages for important updates
                      </p>
                    </div>
                    <Switch 
                      id="sms"
                      checked={notifications.sms}
                      onCheckedChange={(checked) => 
                        handleUpdateNotifications("sms", checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-purple text-white hover:bg-purple-dark">
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Edit(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
