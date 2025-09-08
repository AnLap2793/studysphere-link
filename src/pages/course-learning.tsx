import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Play, 
  CheckCircle,
  Clock,
  BookOpen,
  MessageCircle,
  Download,
  ArrowLeft,
  Settings,
  ChevronDown,
  ChevronRight,
  Brain,
  Lock,
  Award,
  Share2,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Import course images
import courseProgImg from "@/assets/course-programming.jpg";

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  type: string;
  videoUrl?: string;
  description: string;
  resources: { name: string; type: string; url: string; }[];
  quiz?: {
    questions: {
      id: number;
      type: string;
      question: string;
      options?: string[];
      correctAnswer: any;
    }[];
  };
}

interface Chapter {
  id: number;
  title: string;
  lessons: Lesson[];
}

const mockCourseData: {
  id: string;
  title: string;
  instructor: string;
  chapters: Chapter[];
} = {
  id: "1",
  title: "Complete Web Development Bootcamp",
  instructor: "Dr. Angela Yu",
  chapters: [
    {
      id: 1,
      title: "Getting Started",
      lessons: [
        {
          id: 1,
          title: "Introduction to Web Development",
          duration: "15 min",
          completed: true,
          type: "video",
          videoUrl: "https://www.youtube.com/embed/UB1O30fR-EE",
          description: "Welcome to the course! In this lesson, we'll overview what web development is and what you'll learn.",
          resources: [
            { name: "Course Slides", type: "pdf", url: "#" },
            { name: "Code Examples", type: "zip", url: "#" }
          ]
        },
        {
          id: 2,
          title: "HTML Basics",
          duration: "45 min",
          completed: true,
          type: "video",
          videoUrl: "https://www.youtube.com/embed/qz0aGYrrlhU",
          description: "Learn the fundamentals of HTML including tags, elements, and document structure.",
          resources: [
            { name: "HTML Reference", type: "pdf", url: "#" },
            { name: "Practice Files", type: "zip", url: "#" }
          ]
        },
        {
          id: 3,
          title: "CSS Fundamentals",
          duration: "60 min",
          completed: true,
          type: "video",
          videoUrl: "https://www.youtube.com/embed/1Rs2ND1ryYc",
          description: "Master CSS styling, selectors, properties, and responsive design principles.",
          resources: [
            { name: "CSS Cheat Sheet", type: "pdf", url: "#" }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      lessons: [
        {
          id: 4,
          title: "JavaScript Introduction",
          duration: "90 min",
          completed: false,
          type: "video",
          videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg",
          description: "Dive into JavaScript programming with variables, functions, and basic concepts.",
          resources: [
            { name: "JavaScript Guide", type: "pdf", url: "#" },
            { name: "Exercise Files", type: "zip", url: "#" }
          ]
        },
        {
          id: 5,
          title: "DOM Manipulation",
          duration: "75 min",
          completed: false,
          type: "video",
          videoUrl: "https://www.youtube.com/embed/0ik6X4DJKCc",
          description: "Learn how to interact with web pages using JavaScript DOM manipulation.",
          resources: []
        },
        {
          id: 6,
          title: "JavaScript Quiz",
          duration: "20 min",
          completed: false,
          type: "quiz",
          description: "Test your JavaScript knowledge with this interactive quiz.",
          resources: [],
          quiz: {
            questions: [
              {
                id: 1,
                type: "multiple_choice",
                question: "What is the correct way to declare a variable in JavaScript?",
                options: ["var myVar;", "variable myVar;", "v myVar;", "declare myVar;"],
                correctAnswer: 0
              },
              {
                id: 2,
                type: "multiple_choice",
                question: "Which method is used to add an element to the end of an array?",
                options: ["append()", "push()", "add()", "insert()"],
                correctAnswer: 1
              },
              {
                id: 3,
                type: "true_false",
                question: "JavaScript is a compiled programming language.",
                correctAnswer: false
              },
              {
                id: 4,
                type: "short_answer",
                question: "What does 'DOM' stand for? (Write the full form)",
                correctAnswer: "Document Object Model"
              },
              {
                id: 5,
                type: "true_false",
                question: "Variables declared with 'let' can be redeclared in the same scope.",
                correctAnswer: false
              }
            ]
          }
        }
      ]
    },
    {
      id: 3,
      title: "Hands-on Projects",
      lessons: [
        {
          id: 7,
          title: "Project: Todo App",
          duration: "120 min",
          completed: false,
          type: "project",
          description: "Build a complete todo application using HTML, CSS, and JavaScript.",
          resources: [
            { name: "Project Requirements", type: "pdf", url: "#" },
            { name: "Starter Files", type: "zip", url: "#" }
          ]
        }
      ]
    }
  ]
};

export default function CourseLearning() {
  const { courseId, lessonId } = useParams();
  const { toast } = useToast();
  const [currentLessonId, setCurrentLessonId] = useState<number>(
    lessonId ? parseInt(lessonId) : 1
  );
  const [notes, setNotes] = useState("");
  const [expandedSections, setExpandedSections] = useState<number[]>([1, 2, 3]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: any }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [courseLessons, setCourseLessons] = useState<Lesson[]>(() => 
    mockCourseData.chapters?.flatMap(chapter => chapter.lessons) || []
  );
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const course = mockCourseData;
  const allLessons = courseLessons;
  const currentLesson = allLessons.find(lesson => lesson.id === currentLessonId);
  
  if (!currentLesson) {
    return <div>Lesson not found</div>;
  }

  const completedLessons = allLessons.filter(lesson => lesson.completed).length;
  const totalLessons = allLessons.length;
  const overallProgress = (completedLessons / totalLessons) * 100;

  // Check if a lesson is unlocked (previous lessons must be completed)
  const isLessonUnlocked = (lessonId: number): boolean => {
    const lessonIndex = allLessons.findIndex(lesson => lesson.id === lessonId);
    if (lessonIndex === 0) return true; // First lesson is always unlocked
    
    // Check if all previous lessons are completed
    for (let i = 0; i < lessonIndex; i++) {
      if (!allLessons[i].completed) {
        return false;
      }
    }
    return true;
  };

  const markLessonComplete = (lessonId: number) => {
    setCourseLessons(prev => 
      prev.map(lesson => 
        lesson.id === lessonId 
          ? { ...lesson, completed: true }
          : lesson
      )
    );
  };

  const handleNextLesson = () => {
    const currentIndex = allLessons.findIndex(lesson => lesson.id === currentLessonId);
    const isLastLesson = currentIndex === allLessons.length - 1;
    
    // Mark current lesson as complete if not already
    if (!currentLesson.completed) {
      markLessonComplete(currentLessonId);
      
      // If this is the last lesson, show completion modal
      if (isLastLesson) {
        setShowCompletionModal(true);
        return;
      }
    }
    
    // Move to next lesson if available
    if (currentIndex < allLessons.length - 1) {
      setCurrentLessonId(allLessons[currentIndex + 1].id);
    }
  };

  const handleCourseCompletion = (action: 'dashboard' | 'courses' | 'certificate') => {
    setShowCompletionModal(false);
    
    switch (action) {
      case 'dashboard':
        window.location.href = '/dashboard';
        break;
      case 'courses':
        window.location.href = '/courses';
        break;
      case 'certificate':
        // Handle certificate download/view
        toast({
          title: "Chứng chỉ đang được tạo",
          description: "Chứng chỉ sẽ được gửi về email của bạn trong vài phút.",
        });
        break;
    }
  };

  const handlePreviousLesson = () => {
    const currentIndex = allLessons.findIndex(lesson => lesson.id === currentLessonId);
    if (currentIndex > 0) {
      setCurrentLessonId(allLessons[currentIndex - 1].id);
    }
  };

  const handleLessonSelect = (lessonId: number) => {
    if (isLessonUnlocked(lessonId)) {
      setCurrentLessonId(lessonId);
    }
  };

  const toggleSection = (sectionId: number) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link to={`/course/${courseId}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              Back to Course
            </Link>
            
            <div className="hidden md:block">
              <h1 className="font-semibold">{course.title}</h1>
              <p className="text-sm text-muted-foreground">by {course.instructor}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Progress:</span>
              <Progress value={overallProgress} className="w-32" />
              <span className="text-sm font-medium">{Math.round(overallProgress)}%</span>
            </div>
            
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Video Player - Only show for non-quiz lessons */}
          {currentLesson.type !== "quiz" && (
            <div className="mb-6">
              <Card>
                <CardContent className="p-0">
                  <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                    {currentLesson.type === "video" ? (
                      <iframe
                        className="w-full h-full"
                        src={currentLesson.videoUrl}
                        title={currentLesson.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-white">
                          <BookOpen className="w-16 h-16 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold mb-2">Project Lesson</h3>
                          <p className="text-white/80">This is a hands-on project lesson</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Lesson Info & Controls */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">{currentLesson.title}</h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{currentLesson.duration}</span>
                  </div>
                  <Badge variant={currentLesson.completed ? "default" : "secondary"}>
                    {currentLesson.type}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handlePreviousLesson}
                  disabled={currentLessonId === 1}
                >
                  Previous
                </Button>
                {(() => {
                  const currentIndex = allLessons.findIndex(lesson => lesson.id === currentLessonId);
                  const isLastLesson = currentIndex === allLessons.length - 1;
                  
                  if (isLastLesson) {
                    return (
                      <Button 
                        onClick={handleNextLesson}
                        className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
                      >
                        {currentLesson.completed ? (
                          <>
                            <Award className="w-4 h-4 mr-2" />
                            Xem Chứng Chỉ
                          </>
                        ) : (
                          <>
                            <Award className="w-4 h-4 mr-2" />
                            Hoàn Thành Khóa Học
                          </>
                        )}
                      </Button>
                    );
                  }
                  
                  return (
                    <Button 
                      onClick={handleNextLesson}
                      disabled={currentIndex >= allLessons.length - 1}
                    >
                      {currentLesson.completed ? "Next Lesson" : "Mark Complete & Next"}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  );
                })()}
              </div>
            </div>
            
            <p className="text-muted-foreground">{currentLesson.description}</p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              {currentLesson.type === "quiz" && <TabsTrigger value="quiz">Quiz</TabsTrigger>}
              <TabsTrigger value="notes">My Notes</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="qa">Q&A</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Lesson Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{currentLesson.description}</p>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Learning Objectives:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Understand the core concepts</li>
                      <li>• Apply practical skills</li>
                      <li>• Complete hands-on exercises</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {currentLesson.type === "quiz" && currentLesson.quiz && (
              <TabsContent value="quiz">
                <Card>
                  <CardHeader>
                    <CardTitle>Quiz Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {currentLesson.quiz.questions.map((question, questionIndex) => (
                        <div key={question.id} className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-3">
                            {questionIndex + 1}. {question.question}
                          </h4>
                          
                          {/* Multiple Choice Questions */}
                          {question.type === "multiple_choice" && question.options && (
                            <div className="space-y-2">
                              {question.options.map((option, optionIndex) => (
                                <label
                                  key={optionIndex}
                                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                                    selectedAnswers[question.id] === optionIndex
                                      ? quizSubmitted
                                        ? optionIndex === question.correctAnswer
                                          ? 'bg-green-50 border-green-200 text-green-700'
                                          : 'bg-red-50 border-red-200 text-red-700'
                                        : 'bg-primary/10 border-primary/20'
                                      : quizSubmitted && optionIndex === question.correctAnswer
                                      ? 'bg-green-50 border-green-200 text-green-700'
                                      : 'hover:bg-accent'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    value={optionIndex}
                                    checked={selectedAnswers[question.id] === optionIndex}
                                    onChange={(e) => {
                                      if (!quizSubmitted) {
                                        setSelectedAnswers(prev => ({
                                          ...prev,
                                          [question.id]: parseInt(e.target.value)
                                        }));
                                      }
                                    }}
                                    disabled={quizSubmitted}
                                    className="mr-3"
                                  />
                                  <span>{option}</span>
                                </label>
                              ))}
                            </div>
                          )}

                          {/* True/False Questions */}
                          {question.type === "true_false" && (
                            <div className="space-y-2">
                              {[true, false].map((value) => (
                                <label
                                  key={value.toString()}
                                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                                    selectedAnswers[question.id] === value
                                      ? quizSubmitted
                                        ? value === question.correctAnswer
                                          ? 'bg-green-50 border-green-200 text-green-700'
                                          : 'bg-red-50 border-red-200 text-red-700'
                                        : 'bg-primary/10 border-primary/20'
                                      : quizSubmitted && value === question.correctAnswer
                                      ? 'bg-green-50 border-green-200 text-green-700'
                                      : 'hover:bg-accent'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    value={value.toString()}
                                    checked={selectedAnswers[question.id] === value}
                                    onChange={() => {
                                      if (!quizSubmitted) {
                                        setSelectedAnswers(prev => ({
                                          ...prev,
                                          [question.id]: value
                                        }));
                                      }
                                    }}
                                    disabled={quizSubmitted}
                                    className="mr-3"
                                  />
                                  <span>{value ? "True" : "False"}</span>
                                </label>
                              ))}
                            </div>
                          )}

                          {/* Short Answer Questions */}
                          {question.type === "short_answer" && (
                            <div className="space-y-2">
                              <Input
                                placeholder="Type your answer here..."
                                value={selectedAnswers[question.id] || ""}
                                onChange={(e) => {
                                  if (!quizSubmitted) {
                                    setSelectedAnswers(prev => ({
                                      ...prev,
                                      [question.id]: e.target.value
                                    }));
                                  }
                                }}
                                disabled={quizSubmitted}
                                className={`${
                                  quizSubmitted
                                    ? typeof selectedAnswers[question.id] === 'string' && 
                                      typeof question.correctAnswer === 'string' &&
                                      selectedAnswers[question.id]?.toLowerCase().trim() === question.correctAnswer?.toLowerCase().trim()
                                      ? 'bg-green-50 border-green-200 text-green-700'
                                      : 'bg-red-50 border-red-200 text-red-700'
                                    : ''
                                }`}
                              />
                              {quizSubmitted && (
                                <p className="text-sm text-muted-foreground">
                                  Correct answer: {question.correctAnswer}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        {!quizSubmitted ? (
                          <Button
                            onClick={() => setQuizSubmitted(true)}
                            disabled={Object.keys(selectedAnswers).length !== currentLesson.quiz!.questions.length}
                            className="w-full"
                          >
                            Submit Quiz
                          </Button>
                        ) : (
                          <div className="w-full">
                            <div className="text-center mb-4">
                              <p className="text-lg font-medium">
                                Quiz Results: {
                                  Object.entries(selectedAnswers).filter(([questionId, answer]) => {
                                    const question = currentLesson.quiz!.questions.find(q => q.id === parseInt(questionId));
                                    if (!question) return false;
                                    
                                    if (question.type === "multiple_choice") {
                                      return question.correctAnswer === answer;
                                    } else if (question.type === "true_false") {
                                      return question.correctAnswer === answer;
                                     } else if (question.type === "short_answer") {
                                       return typeof answer === 'string' && 
                                              typeof question.correctAnswer === 'string' &&
                                              answer?.toLowerCase().trim() === question.correctAnswer?.toLowerCase().trim();
                                     }
                                    return false;
                                  }).length
                                } / {currentLesson.quiz!.questions.length} correct
                              </p>
                            </div>
                            <Button
                              onClick={() => {
                                setSelectedAnswers({});
                                setQuizSubmitted(false);
                              }}
                              variant="outline"
                              className="w-full"
                            >
                              Retake Quiz
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
            
            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>My Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Take notes while you learn..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-40"
                  />
                  <Button className="mt-3">Save Notes</Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <CardTitle>Downloadable Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  {currentLesson.resources && currentLesson.resources.length > 0 ? (
                    <div className="space-y-3">
                      {currentLesson.resources.map((resource, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Download className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{resource.name}</p>
                              <p className="text-sm text-muted-foreground uppercase">{resource.type}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Download</Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No resources available for this lesson.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="qa">
              <Card>
                <CardHeader>
                  <CardTitle>Questions & Answers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">No questions yet for this lesson</p>
                    <Button>Ask a Question</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l p-6">
          <div className="sticky top-6">
            <h3 className="font-semibold mb-4">Course Content</h3>
            
            <div className="space-y-2">
              {course.chapters?.map((chapter) => {
                const chapterLessons = chapter.lessons || [];
                const completedInChapter = chapterLessons.filter(lesson => lesson.completed).length;
                
                return (
                  <Collapsible
                    key={chapter.id}
                    open={expandedSections.includes(chapter.id)}
                    onOpenChange={() => toggleSection(chapter.id)}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-accent rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          {chapter.id}
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{chapter.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {completedInChapter}/{chapterLessons.length} lessons completed
                          </div>
                        </div>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.includes(chapter.id) ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1 ml-11">
                      {chapterLessons.map((lesson, lessonIndex) => {
                        const isUnlocked = isLessonUnlocked(lesson.id);
                        
                        return (
                          <div
                            key={lesson.id}
                            className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                              !isUnlocked 
                                ? 'opacity-50 cursor-not-allowed'
                                : lesson.id === currentLessonId 
                                  ? 'bg-primary/10 text-primary border border-primary/20 cursor-pointer' 
                                  : lesson.completed
                                    ? 'bg-success/5 border border-success/20 cursor-pointer hover:bg-success/10'
                                    : 'hover:bg-accent cursor-pointer'
                            }`}
                            onClick={() => handleLessonSelect(lesson.id)}
                          >
                            <div className="flex items-center justify-center w-6 h-6 rounded-full border">
                              {!isUnlocked ? (
                                <Lock className="w-4 h-4 text-muted-foreground" />
                              ) : lesson.completed ? (
                                <CheckCircle className="w-4 h-4 text-success" />
                              ) : lesson.id === currentLessonId ? (
                                <Play className="w-3 h-3" />
                              ) : (
                                <span className="text-xs">{lessonIndex + 1}</span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{lesson.title}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>{lesson.duration}</span>
                                <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                  {lesson.type}
                                </Badge>
                                {!isUnlocked && (
                                  <span className="text-xs text-muted-foreground">Locked</span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </CollapsibleContent>
                  </Collapsible>
                );
              }) || null}
            </div>
          </div>
        </div>
      </div>

      {/* Course Completion Modal */}
      <Dialog open={showCompletionModal} onOpenChange={setShowCompletionModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              🎉 Chúc Mừng Bạn Đã Hoàn Thành Khóa Học!
            </DialogTitle>
          </DialogHeader>
          
          <div className="text-center space-y-6 py-6">
            {/* Achievement Badge */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                  <Award className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Course Info */}
            <div>
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-muted-foreground">Giảng viên: {course.instructor}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{totalLessons}</div>
                <div className="text-sm text-muted-foreground">Bài Học</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Hoàn Thành</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">Xuất Sắc</div>
              </div>
            </div>

            {/* Achievement Message */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                Bạn đã hoàn thành xuất sắc khóa học này! Hãy tiếp tục học tập và phát triển bản thân.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                onClick={() => handleCourseCompletion('certificate')}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Tải Chứng Chỉ
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  // Share functionality
                  if (navigator.share) {
                    navigator.share({
                      title: `Tôi vừa hoàn thành khóa học: ${course.title}`,
                      text: `Tôi vừa hoàn thành khóa học "${course.title}" với ${totalLessons} bài học!`,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(`Tôi vừa hoàn thành khóa học: ${course.title} 🎉`);
                    toast({
                      title: "Đã sao chép",
                      description: "Nội dung chia sẻ đã được sao chép vào clipboard",
                    });
                  }
                }}
                className="flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Chia Sẻ
              </Button>
              <Button 
                onClick={() => handleCourseCompletion('courses')}
                className="flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Khóa Học Khác
              </Button>
            </div>

            <div className="pt-4 border-t">
              <Button 
                variant="default"
                size="lg"
                onClick={() => handleCourseCompletion('dashboard')}
                className="w-full"
              >
                Về Trang Chủ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}