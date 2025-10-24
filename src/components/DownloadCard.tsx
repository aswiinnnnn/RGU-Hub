import { Download, FileText, Calendar, FileType } from "lucide-react";
import { Button } from "./ui/button";

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
  const truncatedTitle = title && title.length > 35 ? `${title.slice(0, 35)}...` : title;
  
  // Frontend-only download that preserves filename by streaming the blob
  const downloadViaBlob = async (url: string, filename: string) => {
    try {
      const response = await fetch(url, { credentials: 'omit' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const cd = response.headers.get('Content-Disposition') || response.headers.get('content-disposition');
      if (cd) {
        const match = cd.match(/filename\*=UTF-8''([^;\n]+)/i) || cd.match(/filename="?([^";\n]+)"?/i);
        if (match && match[1]) {
          try {
            const decoded = decodeURIComponent(match[1]);
            filename = decoded;
          } catch {
            // Ignore decode errors, use default filename
          }
        }
      }
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
              console.warn('File not found');
              return;
            }
            const base = (title || 'file').replace(/\.[a-zA-Z0-9]{1,10}$/i, '');
            let ext = (type || 'pdf').toLowerCase();
            try {
              const u = new URL(downloadUrl);
              const m = u.pathname.match(/\.([a-zA-Z0-9]{1,10})$/);
              if (m && m[1]) ext = m[1].toLowerCase();
            } catch {
              // Ignore URL parsing errors
            }
            const rawName = `${base}.${ext}`;
            const safeName = rawName.replace(/[^a-zA-Z0-9._-]+/g, '_');

            if (import.meta.env?.PROD) {
              // In production (Vercel), route via serverless to force attachment
              const apiUrl = `/api/download?url=${encodeURIComponent(downloadUrl)}&name=${encodeURIComponent(safeName)}`;
              try {
                const a = document.createElement('a');
                a.href = apiUrl;
                a.download = safeName; // hint for some browsers
                a.rel = 'noopener';
                document.body.appendChild(a);
                a.click();
                a.remove();
              } catch {
                downloadViaBlob(downloadUrl, safeName);
              }
            } else {
              // In development, download directly to avoid missing local API route
              downloadViaBlob(downloadUrl, safeName);
            }
          }}
        >
          <Download className="w-4 h-4 mr-1" />
          Download
        </Button>
      </div>
    </div>
  );
};