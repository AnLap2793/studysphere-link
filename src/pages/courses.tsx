import { useState } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CourseCard } from "@/components/course-card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import course images
import courseProgImg from "@/assets/course-programming.jpg";
import courseMarketingImg from "@/assets/course-marketing.jpg";
import courseDesignImg from "@/assets/course-design.jpg";

const mockCourses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, Node.js and build 10+ projects",
    instructor: "Dr. Angela Yu",
    duration: "65 hours",
    students: 856743,
    rating: 4.8,
    price: "$89",
    image: courseProgImg,
    level: "Beginner" as const,
    category: "Programming",
  },
  {
    id: "2",
    title: "Digital Marketing Masterclass",
    description: "Master Facebook Ads, Google Ads, SEO, Social Media Marketing & More",
    instructor: "John Smith",
    duration: "42 hours",
    students: 234567,
    rating: 4.7,
    price: "$69",
    image: courseMarketingImg,
    level: "Intermediate" as const,
    category: "Marketing",
  },
  {
    id: "3",
    title: "UI/UX Design Complete Course",
    description: "Learn Figma, Adobe XD, Design Thinking, and User Experience Design",
    instructor: "Sarah Wilson",
    duration: "38 hours",
    students: 445821,
    rating: 4.9,
    price: "$79",
    image: courseDesignImg,
    level: "Beginner" as const,
    category: "Design",
  },
  {
    id: "4",
    title: "Advanced React Development",
    description: "Deep dive into React hooks, context, performance optimization and more",
    instructor: "Mark Thompson",
    duration: "28 hours",
    students: 123456,
    rating: 4.6,
    price: "$129",
    image: courseProgImg,
    level: "Advanced" as const,
    category: "Programming",
  },
  {
    id: "5",
    title: "Content Marketing Strategy",
    description: "Create compelling content that converts and builds brand awareness",
    instructor: "Lisa Chen",
    duration: "25 hours",
    students: 89012,
    rating: 4.5,
    price: "$59",
    image: courseMarketingImg,
    level: "Intermediate" as const,
    category: "Marketing",
  },
  {
    id: "6",
    title: "Graphic Design Fundamentals",
    description: "Master the principles of design, typography, and visual communication",
    instructor: "David Rodriguez",
    duration: "35 hours",
    students: 167543,
    rating: 4.8,
    price: "$49",
    image: courseDesignImg,
    level: "Beginner" as const,
    category: "Design",
  },
];

const categories = ["All", "Programming", "Design", "Marketing", "Business", "Data Science"];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "All Levels" || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary-light/10">
      {/* Header */}
      <div className="bg-background/80 backdrop-blur-sm border-b">
        <div className="container py-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Explore Courses
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover thousands of courses to boost your skills and advance your career
          </p>
        </div>
      </div>

      <div className="container py-8">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 p-6 bg-card/50 backdrop-blur-sm rounded-xl border">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              Showing {filteredCourses.length} courses
            </span>
            {selectedCategory !== "All" && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {selectedCategory}
              </Badge>
            )}
            {selectedLevel !== "All Levels" && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {selectedLevel}
              </Badge>
            )}
          </div>
        </div>

        {/* Courses Grid */}
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search filters to find more courses
            </p>
          </div>
        )}
      </div>
    </div>
  );
}