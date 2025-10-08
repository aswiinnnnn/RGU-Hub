import { Download, FileText, Calendar, FileType } from "lucide-react";
import { Button } from "./ui/button";
import useResponsiveToast from "@/hooks/use-toast";

interface DownloadCardProps {
  title: string;
  type: string;
 
  uploadDate: string;
  downloadUrl: string;
}

export const DownloadCard = ({ 
  title, 
  type, 
 
  uploadDate, 
  downloadUrl 
}: DownloadCardProps) => {
  const { show } = useResponsiveToast();
  const truncatedTitle = title && title.length > 35 ? `${title.slice(0, 35)}...` : title;
  
  // Frontend-only download that preserves filename by streaming the blob
  const downloadViaBlob = async (url: string, filename: string) => {
    try {
      const response = await fetch(url, { credentials: 'omit' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = filename;
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (e) {
      // Fallback: open in new tab if download fails
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };
  const getFileIcon = () => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-white" />;
      case 'doc':
      case 'docx':
        return <FileType className="w-5 h-5 text-white" />;
      case 'ppt':
      case 'pptx':
        return <FileType className="w-5 h-5 text-white" />;
      default:
        return <FileText className="w-5 h-5 text-muted-white" />;
    }
  };

  return (
    <div className="bg-card hover:bg-card-hover border border-border rounded-xl p-5 shadow-soft hover:shadow-medium transition-all duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start space-x-3 flex-1">
          <div className="p-2 bg-primary rounded-lg">
            {getFileIcon()}
          </div>
          <div className="flex-1">
            <h4 className="text-base font-semibold text-foreground mb-1" title={title}>{truncatedTitle}</h4>
            <div className="text-xs text-muted-foreground">
              <div className="hidden sm:flex items-center space-x-3">
                <span className="font-medium uppercase">{type}</span>
                <span>•</span>
               
                
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {uploadDate}
                </div>
              </div>
              <div className="flex sm:hidden flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium uppercase">{type}</span>
                 
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{uploadDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button 
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary"
          onClick={() => {
            if (!downloadUrl || downloadUrl === '#') {
              show('error', 'File not found', 'Please try again later.');
              return;
            }
            const safeName = `${title || 'file'}.${(type || 'pdf').toLowerCase()}`.replace(/[^a-zA-Z0-9._-]+/g, '_');
            downloadViaBlob(downloadUrl, safeName);
          }}
        >
          <Download className="w-4 h-4 mr-1" />
          Download
        </Button>
      </div>
    </div>
  );
};