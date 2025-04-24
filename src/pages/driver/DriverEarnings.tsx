
import { useState } from "react";
import { BarChart, DollarSign, Calendar, CreditCard, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Sample data
const dailyData = [
  { name: "Mon", earnings: 75 },
  { name: "Tue", earnings: 85 },
  { name: "Wed", earnings: 120 },
  { name: "Thu", earnings: 95 },
  { name: "Fri", earnings: 145 },
  { name: "Sat", earnings: 180 },
  { name: "Sun", earnings: 110 }
];

const weeklyData = [
  { name: "Week 1", earnings: 610 },
  { name: "Week 2", earnings: 720 },
  { name: "Week 3", earnings: 840 },
  { name: "Week 4", earnings: 790 }
];

const monthlyData = [
  { name: "Jan", earnings: 2400 },
  { name: "Feb", earnings: 2210 },
  { name: "Mar", earnings: 2900 },
  { name: "Apr", earnings: 3100 },
  { name: "May", earnings: 2800 },
  { name: "Jun", earnings: 2950 }
];

interface Payment {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: "completed" | "pending" | "failed";
}

export default function DriverEarnings() {
  const [timeView, setTimeView] = useState("daily");
  
  const [payments, setPayments] = useState<Payment[]>([
    { id: "pay-001", date: "Apr 21, 2025", amount: 810.50, method: "Direct Deposit", status: "completed" },
    { id: "pay-002", date: "Apr 14, 2025", amount: 760.25, method: "Bank Transfer", status: "completed" },
    { id: "pay-003", date: "Apr 07, 2025", amount: 890.00, method: "Direct Deposit", status: "completed" },
    { id: "pay-004", date: "Mar 31, 2025", amount: 720.75, method: "Bank Transfer", status: "completed" }
  ]);

  let chartData;
  let totalEarnings = 0;
  let ridesCompleted = 0;

  switch (timeView) {
    case "daily":
      chartData = dailyData;
      totalEarnings = 810.50;
      ridesCompleted = 42;
      break;
    case "weekly":
      chartData = weeklyData;
      totalEarnings = 2960;
      ridesCompleted = 158;
      break;
    case "monthly":
      chartData = monthlyData;
      totalEarnings = 16360;
      ridesCompleted = 782;
      break;
    default:
      chartData = dailyData;
      totalEarnings = 810.50;
      ridesCompleted = 42;
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Earnings</h1>
          <p className="text-gray-600">Track your earnings and view payment history</p>
        </div>
      </section>
      
      <Tabs defaultValue="earnings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="earnings">Earnings Analytics</TabsTrigger>
          <TabsTrigger value="payments">Payment Methods</TabsTrigger>
        </TabsList>
        
        <TabsContent value="earnings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-2xl font-bold">${totalEarnings.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Rides Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Car className="h-4 w-4 text-purple mr-1" />
                  <span className="text-2xl font-bold">{ridesCompleted}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Avg. Per Ride</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <BarChart className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-2xl font-bold">${(totalEarnings / ridesCompleted).toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Earnings Overview</CardTitle>
                <div className="flex space-x-2">
                  <Button 
                    variant={timeView === "daily" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setTimeView("daily")}
                  >
                    Daily
                  </Button>
                  <Button 
                    variant={timeView === "weekly" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setTimeView("weekly")}
                  >
                    Weekly
                  </Button>
                  <Button 
                    variant={timeView === "monthly" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setTimeView("monthly")}
                  >
                    Monthly
                  </Button>
                </div>
              </div>
              <CardDescription>Your earnings for the current {timeView} period</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-80 p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <ReBarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, "Earnings"]} />
                    <Bar dataKey="earnings" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                  </ReBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payments.map(payment => (
                  <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-purple-soft flex items-center justify-center text-purple mr-3">
                        <DollarSign className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{payment.method}</p>
                        <p className="text-sm text-gray-500">{payment.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${payment.amount.toFixed(2)}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        payment.status === "completed" ? "bg-green-100 text-green-700" :
                        payment.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {payment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 pb-2">
              <Button variant="outline" className="w-full">View All Payments</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your connected accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Bank of America</p>
                    <p className="text-sm text-gray-500">Account ending in 4567</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Primary</span>
              </div>
              
              <div className="p-4 border rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-purple-soft flex items-center justify-center text-purple mr-3">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Chase Bank</p>
                    <p className="text-sm text-gray-500">Account ending in 8901</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Set Primary</Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add Payment Method</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Withdraw Earnings</CardTitle>
              <CardDescription>Available balance: $810.50</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" className="text-lg py-6">$100</Button>
                <Button variant="outline" className="text-lg py-6">$250</Button>
                <Button variant="outline" className="text-lg py-6">$500</Button>
              </div>
              
              <div className="pt-4">
                <label className="block text-sm font-medium mb-1">Custom Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input 
                    type="text" 
                    className="pl-10 w-full h-10 rounded-md border border-gray-300 px-3 py-2"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Withdraw Now</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
