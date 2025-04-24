
import { useState } from "react";
import { User, Lock, Car, FileText, Bell, Languages, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function DriverSettings() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Driver",
    email: "john.driver@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, New York, NY 10001",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [vehicleData, setVehicleData] = useState({
    make: "Toyota",
    model: "Camry",
    year: "2020",
    color: "Silver",
    licensePlate: "ABC-1234",
    registrationNumber: "REG123456789"
  });
  
  const [documentExpiry, setDocumentExpiry] = useState({
    driversLicense: "2027-05-15",
    vehicleInsurance: "2025-10-22",
    vehicleRegistration: "2025-12-31"
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    rideRequests: true,
    rideUpdates: true,
    earnings: true,
    promotions: false,
    appUpdates: true,
    email: true,
    push: true,
    sms: false
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  
  const handleVehicleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVehicleData({
      ...vehicleData,
      [name]: value
    });
  };
  
  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDocumentExpiry({
      ...documentExpiry,
      [name]: value
    });
  };
  
  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (profileData.newPassword !== profileData.confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        description: "Please make sure your new passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    if (!profileData.currentPassword) {
      toast({
        title: "Current Password Required",
        description: "Please enter your current password.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
    
    setProfileData({
      ...profileData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };
  
  const handleVehicleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Vehicle Information Updated",
      description: "Your vehicle information has been updated successfully.",
    });
  };
  
  const handleDocumentUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Document Dates Updated",
      description: "Your document expiration dates have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-600">Manage your account preferences</p>
        </div>
      </section>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="vehicle" className="flex items-center">
            <Car className="h-4 w-4 mr-2" />
            Vehicle
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your account details</CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileUpdate}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <Input 
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <Input 
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <Input 
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <Input 
                      name="address"
                      value={profileData.address}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                
                <div className="mt-3">
                  <label className="block text-sm font-medium mb-1">Profile Photo</label>
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-full bg-purple-soft flex items-center justify-center text-purple font-bold text-xl">
                      JD
                    </div>
                    <Button variant="outline" type="button">
                      Change Photo
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <form onSubmit={handlePasswordChange}>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Current Password</label>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"}
                      name="currentPassword"
                      value={profileData.currentPassword}
                      onChange={handleProfileChange}
                      placeholder="Enter current password"
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-800"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">New Password</label>
                    <Input 
                      type="password"
                      name="newPassword"
                      value={profileData.newPassword}
                      onChange={handleProfileChange}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                    <Input 
                      type="password"
                      name="confirmPassword"
                      value={profileData.confirmPassword}
                      onChange={handleProfileChange}
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Update Password</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="vehicle" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Information</CardTitle>
              <CardDescription>Update your vehicle details</CardDescription>
            </CardHeader>
            <form onSubmit={handleVehicleUpdate}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Make</label>
                    <Input 
                      name="make"
                      value={vehicleData.make}
                      onChange={handleVehicleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Model</label>
                    <Input 
                      name="model"
                      value={vehicleData.model}
                      onChange={handleVehicleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Year</label>
                    <Input 
                      name="year"
                      value={vehicleData.year}
                      onChange={handleVehicleChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Color</label>
                    <Input 
                      name="color"
                      value={vehicleData.color}
                      onChange={handleVehicleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">License Plate</label>
                    <Input 
                      name="licensePlate"
                      value={vehicleData.licensePlate}
                      onChange={handleVehicleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Registration Number</label>
                    <Input 
                      name="registrationNumber"
                      value={vehicleData.registrationNumber}
                      onChange={handleVehicleChange}
                    />
                  </div>
                </div>
                
                <div className="mt-3">
                  <label className="block text-sm font-medium mb-1">Vehicle Photos</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                    <div className="h-24 bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <Button variant="ghost" className="h-full w-full">+ Front</Button>
                    </div>
                    <div className="h-24 bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <Button variant="ghost" className="h-full w-full">+ Back</Button>
                    </div>
                    <div className="h-24 bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <Button variant="ghost" className="h-full w-full">+ Side</Button>
                    </div>
                    <div className="h-24 bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <Button variant="ghost" className="h-full w-full">+ Interior</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Save Vehicle Information</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Management</CardTitle>
              <CardDescription>Update your important document information</CardDescription>
            </CardHeader>
            <form onSubmit={handleDocumentUpdate}>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Driver's License</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiration Date</label>
                      <Input 
                        type="date"
                        name="driversLicense"
                        value={documentExpiry.driversLicense}
                        onChange={handleDocumentChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Upload License</label>
                      <Input 
                        type="file"
                        className="py-1.5"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Vehicle Insurance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiration Date</label>
                      <Input 
                        type="date"
                        name="vehicleInsurance"
                        value={documentExpiry.vehicleInsurance}
                        onChange={handleDocumentChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Upload Insurance</label>
                      <Input 
                        type="file"
                        className="py-1.5"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Vehicle Registration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiration Date</label>
                      <Input 
                        type="date"
                        name="vehicleRegistration"
                        value={documentExpiry.vehicleRegistration}
                        onChange={handleDocumentChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Upload Registration</label>
                      <Input 
                        type="file"
                        className="py-1.5"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Update Documents</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Control what notifications you receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Notification Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Ride Requests</p>
                      <p className="text-sm text-gray-500">Get notified about new ride requests</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.rideRequests}
                      onCheckedChange={() => handleNotificationToggle('rideRequests')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Ride Updates</p>
                      <p className="text-sm text-gray-500">Get notified about changes to rides</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.rideUpdates}
                      onCheckedChange={() => handleNotificationToggle('rideUpdates')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Earnings Updates</p>
                      <p className="text-sm text-gray-500">Get notified about your earnings</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.earnings}
                      onCheckedChange={() => handleNotificationToggle('earnings')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Promotions & Offers</p>
                      <p className="text-sm text-gray-500">Get notified about special promotions</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.promotions}
                      onCheckedChange={() => handleNotificationToggle('promotions')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">App Updates</p>
                      <p className="text-sm text-gray-500">Get notified about new features and updates</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.appUpdates}
                      onCheckedChange={() => handleNotificationToggle('appUpdates')}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Notification Methods</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.email}
                      onCheckedChange={() => handleNotificationToggle('email')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-gray-500">Receive notifications on your device</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.push}
                      onCheckedChange={() => handleNotificationToggle('push')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-gray-500">Receive notifications via text message</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.sms}
                      onCheckedChange={() => handleNotificationToggle('sms')}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Language Preferences</h3>
                <div className="flex items-center space-x-2">
                  <Languages className="h-5 w-5 text-gray-500" />
                  <select className="flex-1 h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2">
                    <option value="en">English (US)</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese (Simplified)</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button variant="outline">Reset to Default</Button>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
