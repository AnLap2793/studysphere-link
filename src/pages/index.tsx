import { ArrowRight, BookOpen, Users, Award, Star, Play, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CourseCard } from "@/components/course-card";
import { Link } from "react-router-dom";

// Import images
import heroImage from "@/assets/hero-education.jpg";
import courseProgImg from "@/assets/course-programming.jpg";
import courseMarketingImg from "@/assets/course-marketing.jpg";
import courseDesignImg from "@/assets/course-design.jpg";

const featuredCourses = [
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
  },
];

const features = [
  {
    icon: BookOpen,
    title: "Expert-Led Courses",
    description: "Learn from industry professionals with real-world experience",
  },
  {
    icon: Users,
    title: "Learn Together",
    description: "Join a community of over 2 million learners worldwide",
  },
  {
    icon: Award,
    title: "Get Certified",
    description: "Earn certificates to showcase your new skills",
  },
  {
    icon: Play,
    title: "Learn at Your Pace",
    description: "Access courses anytime, anywhere, on any device",
  },
];

const stats = [
  { number: "50M+", label: "Students" },
  { number: "190+", label: "Countries" },
  { number: "213K+", label: "Courses" },
  { number: "62K+", label: "Instructors" },
];

const benefits = [
  "Lifetime access to courses",
  "30-day money-back guarantee",
  "Certificate of completion",
  "Mobile and desktop access",
  "Regular content updates",
  "Expert instructor support",
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-light via-accent/30 to-background">
        <div className="container grid lg:grid-cols-2 gap-8 items-center py-16 lg:py-24">
          <div className="space-y-6">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              🚀 New courses every week
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Learn{" "}
              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                without limits
              </span>{" "}
              with our online courses
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md">
              Build skills with courses, certificates, and degrees online from world-class 
              universities and companies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/courses">
                <Button variant="hero" size="lg" className="group">
                  Start Learning Today
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="lg">
                  View Dashboard
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-dark border-2 border-background"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  2M+ happy learners
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-warning text-warning" />
                <span className="font-semibold">4.8</span>
                <span className="text-sm text-muted-foreground">(50k+ reviews)</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Students learning"
                className="w-full h-auto"
              />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-success to-success/80 rounded-xl flex items-center justify-center shadow-lg">
              <Award className="w-8 h-8 text-success-foreground" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-r from-warning to-warning/80 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-warning-foreground" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50 backdrop-blur-sm border-y">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why choose our platform?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need to advance your career and achieve your learning goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-accent/30">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gradient-to-br from-accent/20 to-primary-light/10">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Featured Courses
            </h2>
            <p className="text-lg text-muted-foreground">
              Start with our most popular and highly-rated courses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/courses">
              <Button variant="outline" size="lg">
                View All Courses
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Everything you need to succeed
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our platform provides all the tools and resources you need to learn effectively 
                and achieve your goals.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-success" />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/courses">
                  <Button variant="success" size="lg">
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-card to-accent/30 shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Join Our Community</h3>
                      <p className="text-sm text-muted-foreground">
                        Connect with learners worldwide
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                      <Award className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Earn Certificates</h3>
                      <p className="text-sm text-muted-foreground">
                        Showcase your achievements
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-warning" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Expert Content</h3>
                      <p className="text-sm text-muted-foreground">
                        Learn from industry leaders
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to start learning?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join millions of learners and take the next step in your career
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button variant="secondary" size="lg">
                Browse Courses
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;