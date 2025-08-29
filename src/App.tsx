import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { AuthProvider } from "@/contexts/auth-context";
import { QueryProvider } from "@/providers/query-provider";
import Index from "./pages/index";
import Courses from "./pages/courses";
import CourseDetail from "./pages/course-detail";
import CourseLearning from "./pages/course-learning";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import NotFound from "./pages/NotFound";
import { AdminLayout } from "./layouts/admin-layout";
import AdminDashboard from "./pages/admin/dashboard";
import AdminUsers from "./pages/admin/users";

function App() {
  return (
    <QueryProvider>
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
                <Route path="/profile" element={<Profile />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={<AdminUsers />} />
                </Route>
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;
