import { useState } from "react";
import { Star, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface CourseRatingProps {
  courseId: string;
}

interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: "1",
    user: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    rating: 5,
    comment: "Excellent course! Very comprehensive and well-structured. The instructor explains concepts clearly.",
    date: "2 days ago"
  },
  {
    id: "2", 
    user: "Sarah Wilson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    rating: 4,
    comment: "Great content and hands-on projects. Would recommend to anyone starting with web development.",
    date: "1 week ago"
  },
  {
    id: "3",
    user: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face", 
    rating: 5,
    comment: "Outstanding course! The projects are really helpful in understanding the concepts.",
    date: "2 weeks ago"
  }
];

export function CourseRating({ courseId }: CourseRatingProps) {
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [hasRated, setHasRated] = useState(false);
  const { toast } = useToast();

  const handleSubmitRating = () => {
    if (userRating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting.",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    setHasRated(true);
    toast({
      title: "Rating submitted!",
      description: "Thank you for your feedback."
    });
    
    // Reset form
    setUserRating(0);
    setReviewComment("");
  };

  const StarRating = ({ rating, interactive = false }: { rating: number; interactive?: boolean }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-warning text-warning"
                : "fill-muted text-muted-foreground"
            } ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
            onClick={interactive ? () => setUserRating(star) : undefined}
            onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Submit Rating Section */}
      {!hasRated && (
        <Card>
          <CardHeader>
            <CardTitle>Rate This Course</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Your Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer transition-all hover:scale-110 ${
                      star <= (hoverRating || userRating)
                        ? "fill-warning text-warning"
                        : "fill-muted text-muted-foreground hover:text-warning/50"
                    }`}
                    onClick={() => setUserRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {userRating > 0 && (
                    <>
                      {userRating} star{userRating !== 1 ? "s" : ""}
                    </>
                  )}
                </span>
              </div>
            </div>
            
            <div>
              <label htmlFor="review" className="text-sm font-medium mb-2 block">
                Write a Review (Optional)
              </label>
              <Textarea
                id="review"
                placeholder="Share your experience with this course..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <Button 
              onClick={handleSubmitRating}
              className="w-full sm:w-auto"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Rating
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle>Student Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockReviews.map((review) => (
              <div key={review.id} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={review.avatar} alt={review.user} />
                    <AvatarFallback>{review.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{review.user}</span>
                      <StarRating rating={review.rating} />
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}