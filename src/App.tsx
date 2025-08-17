import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { AuthProvider } from "@/contexts/auth-context";
import Index from "./pages/index";
import Courses from "./pages/courses";
import CourseDetail from "./pages/course-detail";
import CourseLearning from "./pages/course-learning";
import Dashboard from "./pages/dashboard";
import MyLearning from "./pages/my-learning";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/course/:courseId" element={<CourseDetail />} />
              <Route path="/course/:courseId/learn" element={<CourseLearning />} />
              <Route path="/course/:courseId/learn/:lessonId" element={<CourseLearning />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/my-learning" element={<MyLearning />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
