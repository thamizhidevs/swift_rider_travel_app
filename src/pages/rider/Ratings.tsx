import { useState } from "react";
import { Star, Search, MessageSquare, Edit, Trash, Check, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import InfographicRatings from "@/components/rider/InfographicRatings";
import TestimonialCarousel from "@/components/rider/TestimonialCarousel";

// Mock data
const reviewData = [
  {
    id: "review-1",
    driver: {
      name: "Michael S.",
      image: null,
      vehicle: "Toyota Camry"
    },
    date: "2023-06-15",
    rating: 5,
    comment: "Excellent and smooth ride. Michael was professional and friendly. Car was clean and comfortable.",
    driverResponse: null
  },
  {
    id: "review-2",
    driver: {
      name: "Amanda J.",
      image: null,
      vehicle: "Honda Civic"
    },
    date: "2023-06-12",
    rating: 4,
    comment: "Good ride overall. Amanda was punctual and polite. The car was a bit warm though.",
    driverResponse: "Thank you for your feedback! I'll make sure to adjust the AC next time. Hope to see you again!"
  },
  {
    id: "review-3",
    driver: {
      name: "Robert K.",
      image: null,
      vehicle: "Ford Focus"
    },
    date: "2023-06-08",
    rating: 5,
    comment: "One of the best rides I've had. Robert was very friendly and gave me some great local tips!",
    driverResponse: null
  },
  {
    id: "review-4",
    driver: {
      name: "Sarah L.",
      image: null,
      vehicle: "Hyundai Sonata"
    },
    date: "2023-06-01",
    rating: 3,
    comment: "The ride was okay but took longer than expected due to Sarah taking a different route than what was shown on the map.",
    driverResponse: "I apologize for the delay. There was construction on the usual route so I had to take a detour. I'll communicate better next time."
  }
];

export default function Ratings() {
  const { toast } = useToast();
  const [reviews, setReviews] = useState(reviewData);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingReview, setEditingReview] = useState<typeof reviewData[0] | null>(null);
  const [editedRating, setEditedRating] = useState(5);
  const [editedComment, setEditedComment] = useState("");
  
  const handleDeleteReview = (reviewId: string) => {
    setReviews(reviews.filter(review => review.id !== reviewId));
    
    toast({
      title: "Review deleted",
      description: "Your review has been deleted successfully."
    });
  };
  
  const handleEditReview = (review: typeof reviewData[0]) => {
    setEditingReview(review);
    setEditedRating(review.rating);
    setEditedComment(review.comment);
  };
  
  const handleSaveEdit = () => {
    if (!editingReview) return;
    
    const updatedReviews = reviews.map(review => 
      review.id === editingReview.id 
        ? { ...review, rating: editedRating, comment: editedComment } 
        : review
    );
    
    setReviews(updatedReviews);
    setEditingReview(null);
    
    toast({
      title: "Review updated",
      description: "Your review has been updated successfully."
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
  
  // Filter reviews by driver name or comment
  const filteredReviews = reviews.filter(review => 
    review.driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.comment.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight mb-4">Your Ratings & Reviews</h1>
      <InfographicRatings />
      <TestimonialCarousel />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Average rating */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Your Average</CardTitle>
            <CardDescription>
              Based on your ratings given to drivers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-purple">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex my-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 ${
                      star <= Math.round(averageRating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">From {reviews.length} reviews</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Rating breakdown */}
        <Card className="col-span-1 sm:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Rating Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviews.filter(review => review.rating === rating).length;
              const percentage = (count / reviews.length) * 100;
              
              return (
                <div key={rating} className="flex items-center space-x-4">
                  <div className="flex items-center w-10">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star className="h-4 w-4 ml-1 text-yellow-400 fill-yellow-400" />
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded">
                    <div 
                      className="h-full bg-yellow-400 rounded" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-10 text-right text-sm text-gray-500">
                    {count}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search reviews by driver name or content"
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Star className="h-10 w-10 text-gray-300 mb-2" />
              <h3 className="text-lg font-medium">No reviews found</h3>
              <p className="text-sm text-gray-500 text-center mt-1">
                {searchQuery 
                  ? "Try adjusting your search" 
                  : "You haven't given any reviews yet"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredReviews.map((review) => (
            <Card key={review.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-purple-soft flex items-center justify-center text-purple font-medium">
                      {review.driver.image ? (
                        <img 
                          src={review.driver.image} 
                          alt={review.driver.name} 
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        review.driver.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{review.driver.name}</CardTitle>
                      <CardDescription>{review.driver.vehicle} • {formatDate(review.date)}</CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= review.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-700">{review.comment}</p>
                
                {review.driverResponse && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <div className="flex items-start space-x-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{review.driver.name}'s Response</p>
                        <p className="text-sm text-gray-600 mt-1">{review.driverResponse}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-end space-x-2 pt-0">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-1 text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => handleDeleteReview(review.id)}
                >
                  <Trash className="h-4 w-4" />
                  Delete
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-1 text-purple hover:text-purple-dark hover:bg-purple-soft/20"
                  onClick={() => handleEditReview(review)}
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
      
      {/* Edit Review Dialog */}
      {editingReview && (
        <Dialog open={!!editingReview} onOpenChange={(open) => !open && setEditingReview(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Review</DialogTitle>
              <DialogDescription>
                Update your review for {editingReview.driver.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex justify-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setEditedRating(star)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      star <= editedRating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    <Star className={`h-8 w-8 ${star <= editedRating ? 'fill-yellow-400' : ''}`} />
                  </button>
                ))}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="comment" className="text-sm font-medium">
                  Your Review
                </label>
                <Textarea
                  id="comment"
                  placeholder="Write your review here..."
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingReview(null)} className="gap-1">
                <X className="h-4 w-4" />
                Cancel
              </Button>
              <Button 
                onClick={handleSaveEdit}
                className="bg-purple text-white hover:bg-purple-dark gap-1"
              >
                <Check className="h-4 w-4" />
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
