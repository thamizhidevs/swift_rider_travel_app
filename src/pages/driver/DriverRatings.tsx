
import { Star, MessageSquare, ThumbsUp, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Review {
  id: string;
  rider: {
    name: string;
    image?: string;
  };
  rating: number;
  comment: string;
  date: string;
  ride: string;
  replied: boolean;
}

const reviews: Review[] = [
  {
    id: "rev1",
    rider: {
      name: "Emily Johnson"
    },
    rating: 5,
    comment: "Great driver, very professional and the car was clean. Got me to my destination quickly and safely.",
    date: "Apr 20, 2025",
    ride: "Manhattan to JFK Airport",
    replied: false
  },
  {
    id: "rev2",
    rider: {
      name: "Marcus Williams"
    },
    rating: 4,
    comment: "Good ride, arrived on time. Was a bit quiet but that's not necessarily a bad thing.",
    date: "Apr 18, 2025",
    ride: "Brooklyn to Queens",
    replied: true
  },
  {
    id: "rev3",
    rider: {
      name: "Sophia Lee"
    },
    rating: 5,
    comment: "Excellent service! The driver was friendly, helped with my luggage and knew the fastest route.",
    date: "Apr 15, 2025",
    ride: "Downtown to Uptown",
    replied: false
  },
  {
    id: "rev4",
    rider: {
      name: "James Wilson"
    },
    rating: 3,
    comment: "The ride was okay. Driver seemed a bit distracted and took a longer route than necessary.",
    date: "Apr 12, 2025",
    ride: "Midtown to Financial District",
    replied: true
  },
  {
    id: "rev5",
    rider: {
      name: "Olivia Brown"
    },
    rating: 5,
    comment: "Outstanding service! Very smooth ride and polite conversation. Will definitely request this driver again.",
    date: "Apr 10, 2025",
    ride: "Central Park to Brooklyn Bridge",
    replied: false
  }
];

const renderStars = (rating: number) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
      ))}
    </div>
  );
};

export default function DriverRatings() {
  // Calculate rating statistics
  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;
  const ratingsCount = [0, 0, 0, 0, 0];
  
  reviews.forEach(review => {
    ratingsCount[review.rating - 1]++;
  });
  
  const ratingPercentages = ratingsCount.map(count => (count / totalReviews) * 100);

  return (
    <div className="space-y-6">
      <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ratings & Reviews</h1>
          <p className="text-gray-600">See what riders think about your service</p>
        </div>
      </section>
      
      <Tabs defaultValue="reviews" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="reviews">Rider Reviews</TabsTrigger>
          <TabsTrigger value="analytics">Rating Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reviews" className="space-y-6">
          <div className="space-y-4">
            {reviews.map(review => (
              <Card key={review.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-purple-soft flex items-center justify-center text-purple mr-3">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{review.rider.name}</h3>
                        <p className="text-xs text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                      <span className="ml-2 text-sm font-medium">{review.rating}.0</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{review.comment}</p>
                  <div className="mt-2 flex items-center">
                    <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                    <p className="text-xs text-gray-500">{review.ride}</p>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>Helpful review</span>
                  </div>
                  
                  {review.replied ? (
                    <span className="text-xs text-gray-500">You replied to this review</span>
                  ) : (
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rating Overview</CardTitle>
                <CardDescription>Based on {totalReviews} reviews</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center pb-6">
                <div className="flex flex-col items-center mb-6">
                  <p className="text-5xl font-bold text-purple">{averageRating.toFixed(1)}</p>
                  <div className="my-2">
                    {renderStars(Math.round(averageRating))}
                  </div>
                </div>
                
                <div className="w-full space-y-3">
                  {[5, 4, 3, 2, 1].map((rating, index) => (
                    <div key={rating} className="flex items-center">
                      <div className="w-12 text-sm font-medium">
                        {rating} stars
                      </div>
                      <div className="w-full mx-3">
                        <Progress value={ratingPercentages[5 - rating]} className="h-2" />
                      </div>
                      <div className="w-10 text-sm text-right">
                        {ratingsCount[5 - rating]}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Your Badges</CardTitle>
                <CardDescription>Achievements based on your service</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-purple-light to-purple p-4 rounded-lg text-white text-center">
                    <Star className="h-10 w-10 mx-auto mb-2 fill-yellow-300 text-yellow-300" />
                    <p className="text-lg font-semibold">Top Rated</p>
                    <p className="text-xs opacity-80">Top 10% of all drivers</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-4 rounded-lg text-white text-center">
                    <Shield className="h-10 w-10 mx-auto mb-2" />
                    <p className="text-lg font-semibold">Safe Driver</p>
                    <p className="text-xs opacity-80">100+ rides with no incidents</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-400 to-green-600 p-4 rounded-lg text-white text-center">
                    <CheckCircle className="h-10 w-10 mx-auto mb-2" />
                    <p className="text-lg font-semibold">Punctual</p>
                    <p className="text-xs opacity-80">Always on time</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-amber-400 to-amber-600 p-4 rounded-lg text-white text-center">
                    <MessageSquare className="h-10 w-10 mx-auto mb-2" />
                    <p className="text-lg font-semibold">Great Communicator</p>
                    <p className="text-xs opacity-80">Riders love your service</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Rating Improvement Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex">
                <div className="bg-purple-soft p-2 rounded-full h-8 w-8 flex items-center justify-center text-purple mr-3">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-medium">Keep your vehicle clean</h3>
                  <p className="text-sm text-gray-600">Regular cleaning and maintenance of your vehicle makes a great first impression.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="bg-purple-soft p-2 rounded-full h-8 w-8 flex items-center justify-center text-purple mr-3">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-medium">Follow the navigation</h3>
                  <p className="text-sm text-gray-600">Unless requested otherwise, follow the recommended route for efficiency.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="bg-purple-soft p-2 rounded-full h-8 w-8 flex items-center justify-center text-purple mr-3">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-medium">Be professional and courteous</h3>
                  <p className="text-sm text-gray-600">Maintain a professional attitude and be respectful to all passengers.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Missing import fixed
import { MapPin, Shield, CheckCircle } from "lucide-react";
