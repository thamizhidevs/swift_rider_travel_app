import { useState } from "react";
import { CreditCard, Plus, Trash, Check, X, Wallet, Receipt, Tag, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import WalletInfo from "@/components/rider/WalletInfo";
import TestimonialCarousel from "@/components/rider/TestimonialCarousel";

// Mock data
const paymentMethods = [
  {
    id: "card-1",
    type: "visa",
    last4: "4242",
    expiry: "04/25",
    name: "John Doe",
    isDefault: true
  },
  {
    id: "card-2",
    type: "mastercard",
    last4: "8888",
    expiry: "12/26",
    name: "John Doe",
    isDefault: false
  }
];

const paymentHistory = [
  {
    id: "payment-1",
    date: "2023-06-15",
    amount: 15.50,
    description: "Ride from Main Street to Downtown Mall",
    method: "Visa •••• 4242"
  },
  {
    id: "payment-2",
    date: "2023-06-12",
    amount: 32.75,
    description: "Ride from Airport to Grand Hotel",
    method: "Mastercard •••• 8888"
  },
  {
    id: "payment-3",
    date: "2023-06-08",
    amount: 22.30,
    description: "Ride from Tech Park to Riverside Apts",
    method: "Cash"
  },
  {
    id: "payment-4",
    date: "2023-06-05",
    amount: 12.80,
    description: "Ride from Riverside Apts to Central Station",
    method: "Visa •••• 4242"
  },
  {
    id: "payment-5",
    date: "2023-06-01",
    amount: 18.50,
    description: "Ride from Marina Bay to Oakwood",
    method: "Wallet Credit"
  }
];

export default function Payments() {
  const { toast } = useToast();
  const [cards, setCards] = useState(paymentMethods);
  const [promoCode, setPromoCode] = useState("");
  
  const handleAddCard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const cardNumber = formData.get("cardNumber") as string;
    const last4 = cardNumber.slice(-4);
    
    const newCard = {
      id: `card-${Date.now()}`,
      type: "visa",
      last4,
      expiry: `${formData.get("expMonth")}/${formData.get("expYear")}`,
      name: formData.get("nameOnCard") as string,
      isDefault: false
    };
    
    setCards([...cards, newCard]);
    
    toast({
      title: "Card added successfully",
      description: `Card ending in ${last4} has been added to your account.`
    });
  };
  
  const handleSetDefaultCard = (cardId: string) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === cardId
    })));
    
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated."
    });
  };
  
  const handleDeleteCard = (cardId: string) => {
    setCards(cards.filter(card => card.id !== cardId));
    
    toast({
      title: "Card removed",
      description: "The payment method has been removed from your account."
    });
  };
  
  const handleApplyPromoCode = () => {
    if (!promoCode) return;
    
    toast({
      title: "Promo code applied!",
      description: `The promo code ${promoCode} has been applied to your account.`,
      action: <Check className="text-green-500 h-4 w-4" />
    });
    
    setPromoCode("");
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight mb-4">Payments</h1>

      <WalletInfo />
      <TestimonialCarousel />

      <Tabs defaultValue="methods" className="space-y-4">
        <TabsList>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="promo">Promo Codes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="methods" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cards.map(card => (
              <Card key={card.id} className={`overflow-hidden ${card.isDefault ? 'border-purple' : ''}`}>
                <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className={`h-8 w-12 rounded ${card.type === 'visa' ? 'bg-blue-600' : 'bg-red-500'} flex items-center justify-center text-white font-bold text-xs`}>
                        {card.type === 'visa' ? 'VISA' : 'MC'}
                      </div>
                      <CardTitle className="text-lg">{card.type === 'visa' ? 'Visa' : 'Mastercard'}</CardTitle>
                    </div>
                    <CardDescription>Ending in {card.last4}</CardDescription>
                  </div>
                  {card.isDefault && (
                    <div className="px-2 py-0.5 text-xs bg-purple/10 text-purple rounded-full">
                      Default
                    </div>
                  )}
                </CardHeader>
                
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Name</span>
                      <span className="font-medium">{card.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Expiry</span>
                      <span className="font-medium">{card.expiry}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between border-t p-4">
                  {!card.isDefault ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSetDefaultCard(card.id)}
                    >
                      Set as Default
                    </Button>
                  ) : (
                    <span className="text-sm text-gray-500">Default payment method</span>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500"
                    onClick={() => handleDeleteCard(card.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            <Dialog>
              <DialogTrigger asChild>
                <Card className="border-dashed cursor-pointer hover:bg-gray-50 transition-colors h-full flex flex-col justify-center items-center p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-purple-soft/30 flex items-center justify-center text-purple">
                      <Plus className="h-6 w-6" />
                    </div>
                    <h3 className="mt-3 font-medium">Add Payment Method</h3>
                    <p className="text-sm text-gray-500 mt-1">Add credit or debit card</p>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add new card</DialogTitle>
                  <DialogDescription>
                    Add a new payment method to your account
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleAddCard}>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="nameOnCard">Name on Card</Label>
                      <Input 
                        id="nameOnCard" 
                        name="nameOnCard" 
                        placeholder="John Doe" 
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        name="cardNumber" 
                        placeholder="1234 5678 9012 3456" 
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expMonth">Month</Label>
                        <Input 
                          id="expMonth" 
                          name="expMonth" 
                          placeholder="MM" 
                          maxLength={2} 
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="expYear">Year</Label>
                        <Input 
                          id="expYear" 
                          name="expYear" 
                          placeholder="YY" 
                          maxLength={2} 
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input 
                          id="cvc" 
                          name="cvc" 
                          placeholder="123" 
                          maxLength={3} 
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="setAsDefault" name="setAsDefault" />
                      <Label htmlFor="setAsDefault">Set as default payment method</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-purple text-white hover:bg-purple-dark">
                      Add Card
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Wallet</CardTitle>
              <CardDescription>
                Your SwiftRide wallet balance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Wallet className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">SwiftRide Wallet</p>
                    <p className="text-sm text-gray-500">Top up to get 5% bonus</p>
                  </div>
                </div>
                <div className="text-xl font-bold">$25.00</div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="mr-2">Top Up</Button>
              <Button className="bg-purple text-white hover:bg-purple-dark">Withdraw</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment History</CardTitle>
              <CardDescription>
                View all your payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 bg-gray-50 p-3 text-xs font-medium text-gray-600">
                  <div className="col-span-3">DATE</div>
                  <div className="col-span-4">DESCRIPTION</div>
                  <div className="col-span-3">PAYMENT METHOD</div>
                  <div className="col-span-2 text-right">AMOUNT</div>
                </div>
                
                {paymentHistory.map((payment) => (
                  <div 
                    key={payment.id} 
                    className="grid grid-cols-12 border-t p-3 text-sm items-center"
                  >
                    <div className="col-span-3 flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                      {formatDate(payment.date)}
                    </div>
                    <div className="col-span-4 truncate">{payment.description}</div>
                    <div className="col-span-3">{payment.method}</div>
                    <div className="col-span-2 text-right font-medium">
                      ${payment.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Previous</Button>
              <p className="text-sm text-gray-500">Showing 1-5 of 15</p>
              <Button variant="outline">Next</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Export Transactions</CardTitle>
              <CardDescription>
                Download your payment history
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                You can download your payment history for your records or for tax purposes. 
                Choose a date range and format below.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="from">From Date</Label>
                  <Input 
                    id="from" 
                    type="date"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="to">To Date</Label>
                  <Input 
                    id="to" 
                    type="date"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="format">Format</Label>
                  <select 
                    id="format" 
                    className="w-full px-3 py-2 border rounded-md mt-1"
                  >
                    <option>PDF</option>
                    <option>CSV</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="gap-1">
                <Receipt className="h-4 w-4" />
                <span>Generate Report</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="promo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Promo Codes</CardTitle>
              <CardDescription>
                Apply a promo code to get discounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <div className="flex-grow">
                  <Input 
                    placeholder="Enter promo code" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleApplyPromoCode}
                  className="bg-purple text-white hover:bg-purple-dark"
                  disabled={!promoCode}
                >
                  Apply
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <div className="h-2 bg-gradient-to-r from-purple to-purple-light"></div>
              <CardHeader>
                <CardTitle>WELCOME50</CardTitle>
                <CardDescription>Expires Jun 30, 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Get 50% off on your first ride with us
                </p>
                <div className="mt-4 p-2 bg-purple-soft/30 rounded-md flex items-center justify-between">
                  <code className="font-mono font-bold text-purple">WELCOME50</code>
                  <Button variant="ghost" size="sm">Copy</Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-purple text-white hover:bg-purple-dark">Apply Now</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <div className="h-2 bg-gradient-to-r from-purple to-purple-light"></div>
              <CardHeader>
                <CardTitle>WEEKEND25</CardTitle>
                <CardDescription>Expires Jun 30, 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  25% off on all weekend rides
                </p>
                <div className="mt-4 p-2 bg-purple-soft/30 rounded-md flex items-center justify-between">
                  <code className="font-mono font-bold text-purple">WEEKEND25</code>
                  <Button variant="ghost" size="sm">Copy</Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-purple text-white hover:bg-purple-dark">Apply Now</Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Invite Friends</CardTitle>
              <CardDescription>
                Get more discounts by inviting friends
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                For every friend you invite who takes their first ride, 
                both of you get $10 in ride credits.
              </p>
              
              <div className="flex items-center space-x-2">
                <div className="flex-grow">
                  <Input 
                    value="JOHNRIDE10" 
                    readOnly
                  />
                </div>
                <Button variant="outline">Copy</Button>
                <Button className="bg-purple text-white hover:bg-purple-dark gap-1">
                  <Tag className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
