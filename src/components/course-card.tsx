import { Star, Clock, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  price: string;
  image: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  progress?: number;
  enrolled?: boolean;
}

export const CourseCard = ({
  id,
  title,
  description,
  instructor,
  duration,
  students,
  rating,
  price,
  image,
  level,
  progress,
  enrolled = false,
}: CourseCardProps) => {
  const levelColors = {
    Beginner: "bg-success-light text-success",
    Intermediate: "bg-warning-light text-warning",
    Advanced: "bg-destructive/10 text-destructive",
  };

  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 bg-gradient-to-br from-card to-accent/30">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge
            className={`absolute top-3 left-3 ${levelColors[level]}`}
            variant="secondary"
          >
            {level}
          </Badge>
          <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="w-3 h-3 fill-warning text-warning" />
            <span className="text-xs font-medium">{rating}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {description}
        </p>
        <p className="text-sm text-foreground/70 mb-4">By {instructor}</p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{students.toLocaleString()} students</span>
          </div>
        </div>

        {enrolled && progress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-muted-foreground">Progress</span>
              <span className="text-xs font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">{price}</span>
          {price !== "Free" && (
            <span className="text-sm text-muted-foreground line-through">
              ${(parseInt(price.replace('$', '')) * 1.5).toFixed(0)}
            </span>
          )}
        </div>
        
        <Button 
          variant={enrolled ? "success" : "default"} 
          size="sm"
          className="group/btn"
        >
          {enrolled ? "Continue" : "Enroll Now"}
          <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};