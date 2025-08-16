import { BookOpen, Clock, Award, TrendingUp, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CourseCard } from "@/components/course-card";

// Import course images
import courseProgImg from "@/assets/course-programming.jpg";
import courseMarketingImg from "@/assets/course-marketing.jpg";
import courseDesignImg from "@/assets/course-design.jpg";

const enrolledCourses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, Node.js and build 10+ projects",
    instructor: "Dr. Angela Yu",
    duration: "65 hours",
    students: 856743,
    rating: 4.8,
    price: "Enrolled",
    image: courseProgImg,
    level: "Beginner" as const,
    progress: 65,
    enrolled: true,
  },
  {
    id: "2",
    title: "Digital Marketing Masterclass",
    description: "Master Facebook Ads, Google Ads, SEO, Social Media Marketing & More",
    instructor: "John Smith",
    duration: "42 hours",
    students: 234567,
    rating: 4.7,
    price: "Enrolled",
    image: courseMarketingImg,
    level: "Intermediate" as const,
    progress: 32,
    enrolled: true,
  },
  {
    id: "3",
    title: "UI/UX Design Complete Course",
    description: "Learn Figma, Adobe XD, Design Thinking, and User Experience Design",
    instructor: "Sarah Wilson",
    duration: "38 hours",
    students: 445821,
    rating: 4.9,
    price: "Enrolled",
    image: courseDesignImg,
    level: "Beginner" as const,
    progress: 87,
    enrolled: true,
  },
];

const stats = [
  {
    title: "Courses Enrolled",
    value: "12",
    icon: BookOpen,
    description: "Active learning paths",
    color: "text-primary",
  },
  {
    title: "Hours Learned",
    value: "127",
    icon: Clock,
    description: "This month",
    color: "text-success",
  },
  {
    title: "Certificates",
    value: "5",
    icon: Award,
    description: "Completed courses",
    color: "text-warning",
  },
  {
    title: "Skill Level",
    value: "Advanced",
    icon: TrendingUp,
    description: "Keep it up!",
    color: "text-primary",
  },
];

const recentActivity = [
  {
    course: "Web Development Bootcamp",
    lesson: "React Hooks Deep Dive",
    time: "2 hours ago",
    progress: 85,
  },
  {
    course: "Digital Marketing",
    lesson: "Facebook Ads Optimization",
    time: "1 day ago",
    progress: 67,
  },
  {
    course: "UI/UX Design",
    lesson: "Wireframing Best Practices",
    time: "2 days ago",
    progress: 92,
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary-light/10">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Welcome back, Sarah! 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            Continue your learning journey and track your progress
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-card/50 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Continue Learning */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Continue Learning</h2>
            <div className="grid gap-6">
              {enrolledCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Streak */}
            <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-success" />
                  Learning Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-success mb-2">7</div>
                  <p className="text-sm text-muted-foreground mb-4">Days in a row</p>
                  <Button variant="success" size="sm" className="w-full">
                    Keep it going!
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <Play className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{activity.lesson}</p>
                      <p className="text-xs text-muted-foreground">{activity.course}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Progress value={activity.progress} className="h-1 flex-1" />
                        <span className="text-xs text-muted-foreground">
                          {activity.progress}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Courses
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="w-4 h-4 mr-2" />
                  View Certificates
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Track Progress
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}