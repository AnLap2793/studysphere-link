import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  type: string;
}

interface Chapter {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface CourseCurriculumProps {
  chapters: Chapter[];
  totalLessons: number;
  courseDuration: string;
  courseId: string;
  enrolled: boolean;
}

export function CourseCurriculum({ 
  chapters, 
  totalLessons, 
  courseDuration, 
  courseId, 
  enrolled 
}: CourseCurriculumProps) {
  const [activeLesson, setActiveLesson] = useState<number | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Content</CardTitle>
        <p className="text-sm text-muted-foreground">
          {chapters?.length || 0} chapters • {totalLessons} lessons • {courseDuration} total length
        </p>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {chapters?.map((chapter) => {
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
                            : enrolled 
                              ? 'hover:bg-accent/50' 
                              : 'opacity-60'
                        }`}
                        onClick={() => enrolled && setActiveLesson(lesson.id)}
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
                        
                        {enrolled && (
                          <Link to={`/course/${courseId}/learn/${lesson.id}`}>
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
  );
}