import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { toast } from "sonner";

interface CertificateGeneratorProps {
  studentName: string;
  courseName: string;
  instructorName: string;
  completionDate: string;
  onDownload?: (dataUrl: string) => void;
}

export const CertificateGenerator = ({
  studentName,
  courseName,
  instructorName,
  completionDate,
  onDownload
}: CertificateGeneratorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [certificateGenerated, setCertificateGenerated] = useState(false);

  useEffect(() => {
    generateCertificate();
  }, []);

  const generateCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, '#f8fafc');
    gradient.addColorStop(1, '#e2e8f0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);

    // Border
    ctx.strokeStyle = 'hsl(var(--primary))';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, 760, 560);

    // Inner border
    ctx.strokeStyle = 'hsl(var(--primary))';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, 720, 520);

    // Decorative elements
    ctx.fillStyle = 'hsl(var(--primary) / 0.1)';
    ctx.beginPath();
    ctx.arc(100, 100, 40, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(700, 100, 40, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(100, 500, 40, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(700, 500, 40, 0, 2 * Math.PI);
    ctx.fill();

    // Title
    ctx.fillStyle = 'hsl(var(--primary))';
    ctx.font = 'bold 48px serif';
    ctx.textAlign = 'center';
    ctx.fillText('CHỨNG CHỈ', 400, 150);
    
    ctx.font = 'italic 24px serif';
    ctx.fillText('Hoàn thành khóa học', 400, 180);

    // Student name
    ctx.fillStyle = 'hsl(var(--foreground))';
    ctx.font = 'bold 36px serif';
    ctx.fillText(studentName, 400, 260);

    // Course details
    ctx.font = '20px sans-serif';
    ctx.fillText('đã hoàn thành xuất sắc khóa học', 400, 300);
    
    ctx.font = 'bold 28px sans-serif';
    ctx.fillStyle = 'hsl(var(--primary))';
    ctx.fillText(`"${courseName}"`, 400, 340);

    // Instructor
    ctx.fillStyle = 'hsl(var(--foreground))';
    ctx.font = '18px sans-serif';
    ctx.fillText(`Giảng viên: ${instructorName}`, 400, 380);

    // Date
    ctx.font = '16px sans-serif';
    ctx.fillText(`Ngày hoàn thành: ${completionDate}`, 400, 420);

    // Signature line
    ctx.strokeStyle = 'hsl(var(--foreground))';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(520, 480);
    ctx.lineTo(680, 480);
    ctx.stroke();

    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Chữ ký giảng viên', 600, 500);

    // Award icon (simple star)
    ctx.fillStyle = 'hsl(var(--primary))';
    ctx.font = '40px sans-serif';
    ctx.fillText('⭐', 200, 480);

    setCertificateGenerated(true);
  };

  const downloadCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png', 1.0);
    
    // Create download link
    const link = document.createElement('a');
    link.download = `certificate-${studentName.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = dataUrl;
    link.click();

    onDownload?.(dataUrl);
    toast.success("Chứng chỉ đã được tải xuống!");
  };

  const shareCertificate = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        
        if (navigator.share && navigator.canShare) {
          const file = new File([blob], 'certificate.png', { type: 'image/png' });
          await navigator.share({
            title: 'Chứng chỉ hoàn thành khóa học',
            text: `Tôi vừa hoàn thành khóa học "${courseName}"!`,
            files: [file]
          });
        } else {
          // Fallback: copy to clipboard
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          toast.success("Chứng chỉ đã được sao chép vào clipboard!");
        }
      }, 'image/png');
    } catch (error) {
      console.error('Error sharing certificate:', error);
      toast.error("Không thể chia sẻ chứng chỉ");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center border rounded-lg p-4 bg-background">
        <canvas
          ref={canvasRef}
          className="max-w-full h-auto border border-border rounded-lg shadow-lg"
          style={{ maxHeight: '400px' }}
        />
      </div>
      
      <div className="flex gap-2 justify-center">
        <Button
          onClick={downloadCertificate}
          disabled={!certificateGenerated}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Tải xuống
        </Button>
        
        <Button
          onClick={shareCertificate}
          disabled={!certificateGenerated}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Chia sẻ
        </Button>
      </div>
    </div>
  );
};