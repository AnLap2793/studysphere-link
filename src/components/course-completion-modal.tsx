import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Award, 
  CheckCircle, 
  BookOpen, 
  Share2,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CertificateGenerator } from "@/components/certificate-generator";

interface Course {
  title: string;
  instructor: string;
}

interface CourseCompletionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  course: Course;
  totalLessons: number;
  onAction: (action: 'dashboard' | 'courses' | 'certificate') => void;
}

export function CourseCompletionModal({
  isOpen,
  onOpenChange,
  course,
  totalLessons,
  onAction
}: CourseCompletionModalProps) {
  const { toast } = useToast();
  const [showCertificate, setShowCertificate] = useState(false);

  const handleCourseCompletion = (action: 'dashboard' | 'courses' | 'certificate') => {
    if (action === 'certificate') {
      setShowCertificate(true);
    } else {
      onAction(action);
    }
  };

  const handleShare = () => {
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
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            🎉 Chúc Mừng Bạn Đã Hoàn Thành Khóa Học!
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-6 py-6">
          {!showCertificate ? (
            <>
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
                  <Award className="w-4 h-4" />
                  Xem Chứng Chỉ
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleShare}
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
            </>
          ) : (
            <>
              {/* Certificate View */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 justify-center">
                  <Button
                    variant="outline" 
                    onClick={() => setShowCertificate(false)}
                    size="sm"
                  >
                    ← Quay lại
                  </Button>
                </div>
                
                <CertificateGenerator
                  studentName="Học Viên" // This should come from user context
                  courseName={course.title}
                  instructorName={course.instructor}
                  completionDate={new Date().toLocaleDateString('vi-VN')}
                  onDownload={(dataUrl) => {
                    toast({
                      title: "Thành công!",
                      description: "Chứng chỉ đã được tải xuống thành công."
                    });
                  }}
                />
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}