import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { toast } from "sonner";
import certificateTemplate from "@/assets/certificate-template.jpg";

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

    // Load the certificate template image
    const templateImage = new Image();
    templateImage.crossOrigin = 'anonymous';
    templateImage.onload = () => {
      // Draw the template image as background
      ctx.drawImage(templateImage, 0, 0, 800, 600);

      // Add text overlays
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Title
      ctx.fillStyle = '#2c5530';
      ctx.font = 'bold 36px serif';
      ctx.fillText('CHỨNG CHỈ HOÀN THÀNH', 400, 180);
      
      ctx.font = 'italic 20px serif';
      ctx.fillText('Certificate of Completion', 400, 210);

      // Student name
      ctx.fillStyle = '#1a4d1f';
      ctx.font = 'bold 32px serif';
      ctx.fillText(studentName, 400, 280);

      // Course details
      ctx.font = '18px sans-serif';
      ctx.fillStyle = '#333333';
      ctx.fillText('đã hoàn thành xuất sắc khóa học', 400, 320);
      
      ctx.font = 'bold 24px sans-serif';
      ctx.fillStyle = '#2c5530';
      ctx.fillText(`"${courseName}"`, 400, 360);

      // Instructor
      ctx.fillStyle = '#333333';
      ctx.font = '16px sans-serif';
      ctx.fillText(`Giảng viên: ${instructorName}`, 400, 400);

      // Date
      ctx.font = '16px sans-serif';
      ctx.fillText(`Ngày hoàn thành: ${completionDate}`, 400, 430);

      // Signature area
      ctx.fillStyle = '#666666';
      ctx.font = '14px sans-serif';
      ctx.fillText('Chữ ký giảng viên', 600, 500);

      setCertificateGenerated(true);
    };

    templateImage.onerror = () => {
      // Fallback: create a simple background if image fails to load
      const gradient = ctx.createLinearGradient(0, 0, 800, 600);
      gradient.addColorStop(0, '#f8fafc');
      gradient.addColorStop(1, '#e2e8f0');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 800, 600);

      // Simple border
      ctx.strokeStyle = '#2c5530';
      ctx.lineWidth = 4;
      ctx.strokeRect(20, 20, 760, 560);

      // Add text with fallback styling
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      ctx.fillStyle = '#2c5530';
      ctx.font = 'bold 36px serif';
      ctx.fillText('CHỨNG CHỈ HOÀN THÀNH', 400, 180);
      
      ctx.fillStyle = '#1a4d1f';
      ctx.font = 'bold 32px serif';
      ctx.fillText(studentName, 400, 280);
      
      ctx.font = '18px sans-serif';
      ctx.fillStyle = '#333333';
      ctx.fillText('đã hoàn thành xuất sắc khóa học', 400, 320);
      
      ctx.font = 'bold 24px sans-serif';
      ctx.fillStyle = '#2c5530';
      ctx.fillText(`"${courseName}"`, 400, 360);
      
      ctx.fillStyle = '#333333';
      ctx.font = '16px sans-serif';
      ctx.fillText(`Giảng viên: ${instructorName}`, 400, 400);
      ctx.fillText(`Ngày hoàn thành: ${completionDate}`, 400, 430);

      setCertificateGenerated(true);
    };

    // Try to load the template image
    templateImage.src = certificateTemplate;
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