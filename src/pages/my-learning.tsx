import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, Award, Play, Calendar, Target } from "lucide-react";
import { Link } from "react-router-dom";

const enrolledCourses = [
  {
    id: "1",
    title: "React Development Fundamentals",
    instructor: "John Smith",
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    lastAccessed: "2 hours ago",
    nextLesson: "State Management with Redux",
    timeSpent: "12h 30m",
    certificate: false,
    image: "/src/assets/course-programming.jpg"
  },
  {
    id: "2", 
    title: "UI/UX Design Principles",
    instructor: "Sarah Johnson",
    progress: 45,
    totalLessons: 20,
    completedLessons: 9,
    lastAccessed: "1 day ago",
    nextLesson: "Color Theory and Psychology",
    timeSpent: "8h 15m",
    certificate: false,
    image: "/src/assets/course-design.jpg"
  },
  {
    id: "3",
    title: "Digital Marketing Strategy",
    instructor: "Mike Wilson",
    progress: 100,
    totalLessons: 16,
    completedLessons: 16,
    lastAccessed: "3 days ago",
    nextLesson: "Course Completed",
    timeSpent: "15h 45m",
    certificate: true,
    image: "/src/assets/course-marketing.jpg"
  }
];

const achievements = [
  { title: "First Course Completed", icon: Award, earned: true },
  { title: "5 Hours Studied", icon: Clock, earned: true },
  { title: "10 Lessons Completed", icon: BookOpen, earned: true },
  { title: "Week Streak", icon: Target, earned: false },
];

const recentActivity = [
  { action: "Completed lesson", course: "React Development", lesson: "Component Lifecycle", time: "2 hours ago" },
  { action: "Started lesson", course: "UI/UX Design", lesson: "User Research", time: "1 day ago" },
  { action: "Earned certificate", course: "Digital Marketing", lesson: "Course Completion", time: "3 days ago" },
];

export default function MyLearning() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">My Learning Journey</h1>
          <p className="text-muted-foreground text-lg">Track your progress and continue your learning path</p>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full lg:w-48 h-32 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-semibold text-foreground mb-1">{course.title}</h3>
                            <p className="text-muted-foreground">by {course.instructor}</p>
                          </div>
                          <div className="flex gap-2">
                            {course.certificate && (
                              <Badge variant="secondary" className="bg-primary/10 text-primary">
                                <Award className="w-3 h-3 mr-1" />
                                Certified
                              </Badge>
                            )}
                            <Badge variant="outline">
                              {course.progress === 100 ? "Completed" : "In Progress"}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{course.completedLessons}/{course.totalLessons} lessons</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                          <div className="text-sm text-muted-foreground">{course.progress}% complete</div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>Time: {course.timeSpent}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>Last: {course.lastAccessed}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-muted-foreground" />
                            <span>{course.totalLessons} lessons</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          {course.progress < 100 ? (
                            <>
                              <Button asChild className="sm:flex-1">
                                <Link to={`/course/${course.id}/learn`}>
                                  <Play className="w-4 h-4 mr-2" />
                                  Continue Learning
                                </Link>
                              </Button>
                              <Button variant="outline" asChild>
                                <Link to={`/course/${course.id}`}>View Course</Link>
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button variant="secondary" asChild className="sm:flex-1">
                                <Link to={`/course/${course.id}/learn`}>
                                  <BookOpen className="w-4 h-4 mr-2" />
                                  Review Course
                                </Link>
                              </Button>
                              <Button variant="outline" asChild>
                                <Link to={`/course/${course.id}`}>View Details</Link>
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-primary">3</CardTitle>
                  <CardDescription>Courses Enrolled</CardDescription>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-primary">36h 30m</CardTitle>
                  <CardDescription>Total Study Time</CardDescription>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-primary">43</CardTitle>
                  <CardDescription>Lessons Completed</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest learning activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.course} - {activity.lesson}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className={`text-center ${achievement.earned ? 'bg-primary/5 border-primary/20' : 'opacity-60'}`}>
                  <CardContent className="p-6">
                    <achievement.icon className={`w-12 h-12 mx-auto mb-3 ${achievement.earned ? 'text-primary' : 'text-muted-foreground'}`} />
                    <h3 className="font-semibold mb-1">{achievement.title}</h3>
                    <Badge variant={achievement.earned ? "default" : "secondary"}>
                      {achievement.earned ? "Earned" : "Locked"}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}