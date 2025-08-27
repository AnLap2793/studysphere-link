import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  CheckCircle, 
  Award,
  ArrowLeft,
  Download,
  MessageCircle,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CourseComments } from "@/components/course/course-comments";
import { CourseRating } from "@/components/course/course-rating";

// Import course images
import courseProgImg from "@/assets/course-programming.jpg";
import courseMarketingImg from "@/assets/course-marketing.jpg";
import courseDesignImg from "@/assets/course-design.jpg";

const mockCourseData = {
  "1": {
    id: "1",
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, Node.js and build 10+ projects. This comprehensive bootcamp will take you from zero to hero in web development.",
    instructor: "Dr. Angela Yu",
    instructorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    instructorBio: "Full-Stack Web Developer and Instructor with 10+ years experience. Taught over 1M students worldwide.",
    duration: "65 hours",
    students: 856743,
    rating: 4.8,
    reviews: 234567,
    price: "$89",
    image: courseProgImg,
    level: "Beginner" as const,
    category: "Programming",
    enrolled: true,
    progress: 35,
    chapters: [
      {
        id: 1,
        title: "Getting Started with Web Development",
        lessons: [
          {
            id: 1,
            title: "Introduction to Web Development",
            duration: "15 min",
            completed: true,
            type: "video"
          },
          {
            id: 2,
            title: "Setting up Development Environment",
            duration: "20 min",
            completed: true,
            type: "video"
          }
        ]
      },
      {
        id: 2,
        title: "HTML & CSS Fundamentals",
        lessons: [
          {
            id: 3,
            title: "HTML Basics",
            duration: "45 min",
            completed: true,
            type: "video"
          },
          {
            id: 4,
            title: "CSS Fundamentals",
            duration: "60 min",
            completed: true,
            type: "video"
          },
          {
            id: 5,
            title: "Responsive Design",
            duration: "50 min",
            completed: false,
            type: "video"
          }
        ]
      },
      {
        id: 3,
        title: "JavaScript Programming",
        lessons: [
          {
            id: 6,
            title: "JavaScript Introduction",
            duration: "90 min",
            completed: false,
            type: "video"
          },
          {
            id: 7,
            title: "DOM Manipulation",
            duration: "75 min",
            completed: false,
            type: "video"
          },
          {
            id: 8,
            title: "Event Handling",
            duration: "60 min",
            completed: false,
            type: "video"
          }
        ]
      },
      {
        id: 4,
        title: "Building Real Projects",
        lessons: [
          {
            id: 9,
            title: "Project: Todo App",
            duration: "120 min",
            completed: false,
            type: "project"
          },
          {
            id: 10,
            title: "Project: Weather App",
            duration: "150 min",
            completed: false,
            type: "project"
          }
        ]
      }
    ],
    whatYouWillLearn: [
      "Build responsive websites with HTML, CSS & JavaScript",
      "Master React.js and build modern web applications",
      "Learn Node.js and Express for backend development",
      "Work with databases (MongoDB & PostgreSQL)",
      "Deploy applications to the cloud",
      "Complete 10+ real-world projects"
    ],
    requirements: [
      "No programming experience needed",
      "Access to a computer with internet connection",
      "Willingness to learn and practice"
    ]
  }
};

export default function CourseDetail() {
  const { courseId } = useParams();
  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  
  const course = courseId ? mockCourseData[courseId as keyof typeof mockCourseData] : null;

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary-light/10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Link to="/courses">
            <Button variant="outline">Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate lessons from chapters with safety checks
  const allLessons = course.chapters?.flatMap(chapter => chapter.lessons) || [];
  const completedLessons = allLessons.filter(lesson => lesson.completed).length;
  const totalLessons = allLessons.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary-light/10">
      {/* Header */}
      <div className="bg-background/80 backdrop-blur-sm border-b">
        <div className="container py-6">
          <Link to="/courses" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-success-light text-success">
                  {course.level}
                </Badge>
                <Badge variant="outline">
                  {course.category}
                </Badge>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                {course.title}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-6">
                {course.description}
              </p>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-sm text-muted-foreground">({course.reviews.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{course.duration}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                  <AvatarFallback>{course.instructor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{course.instructor}</p>
                  <p className="text-sm text-muted-foreground">Instructor</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Button
                      size="icon"
                      className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background"
                    >
                      <Play className="w-8 h-8 text-primary" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <span className="text-3xl font-bold text-primary">{course.price}</span>
                  </div>
                  
                  {course.enrolled && (
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Your Progress</span>
                        <span className="text-sm font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2 mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {completedLessons} of {totalLessons} lessons completed
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <Link to={`/course/${course.id}/learn`}>
                      <Button className="w-full" size="lg">
                        {course.enrolled ? "Continue Learning" : "Enroll Now"}
                      </Button>
                    </Link>
                    
                    {course.enrolled && (
                      <>
                        <Button variant="outline" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Download Resources
                        </Button>
                        <Button variant="outline" className="w-full">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Ask Question
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  What you'll learn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2"></div>
                      <span className="text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="curriculum">
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {course.chapters?.length || 0} chapters • {totalLessons} lessons • {course.duration} total length
                </p>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" className="w-full">
                  {course.chapters?.map((chapter) => {
                    const chapterLessons = chapter.lessons || [];
                    const completedInChapter = chapterLessons.filter(lesson => lesson.completed).length;
                    
                    return (
                      <AccordionItem key={chapter.id} value={`chapter-${chapter.id}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center justify-between w-full mr-4">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                {chapter.id}
                              </div>
                              <div className="text-left">
                                <h4 className="font-medium">{chapter.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {completedInChapter}/{chapterLessons.length} lessons completed
                                </p>
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 ml-11">
                            {chapterLessons.map((lesson, lessonIndex) => (
                              <div
                                key={lesson.id}
                                className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${
                                  lesson.completed 
                                    ? 'bg-success/5 border-success/20' 
                                    : course.enrolled 
                                      ? 'hover:bg-accent/50' 
                                      : 'opacity-60'
                                }`}
                                onClick={() => course.enrolled && setActiveLesson(lesson.id)}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-background border">
                                    {lesson.completed ? (
                                      <CheckCircle className="w-3 h-3 text-success" />
                                    ) : (
                                      <span className="text-xs font-medium">{lessonIndex + 1}</span>
                                    )}
                                  </div>
                                  <div>
                                    <h5 className="font-medium text-sm">{lesson.title}</h5>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                      <Play className="w-3 h-3" />
                                      <span>{lesson.duration}</span>
                                      <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                        {lesson.type}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                
                                {course.enrolled && (
                                  <Link to={`/course/${course.id}/learn/${lesson.id}`}>
                                    <Button variant="ghost" size="sm" className="text-xs">
                                      {lesson.completed ? "Review" : "Start"}
                                    </Button>
                                  </Link>
                                )}
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  }) || null}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="instructor">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                    <AvatarFallback>{course.instructor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{course.instructor}</CardTitle>
                    <p className="text-muted-foreground">Senior Web Developer & Instructor</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-6">{course.instructorBio}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{course.rating}</div>
                    <div className="text-sm text-muted-foreground">Instructor Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{course.reviews.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Reviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{course.students.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">15</div>
                    <div className="text-sm text-muted-foreground">Courses</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews">
            <CourseRating courseId={course.id} />
          </TabsContent>
          
          <TabsContent value="comments">
            <CourseComments courseId={course.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}