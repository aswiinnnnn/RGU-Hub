import { useEffect, useState } from "react";
import { Download, FileText, Calendar, FileType } from "lucide-react";
import { Button } from "./ui/button";

interface DownloadCardProps {
  title: string;
  type: string;
 
  uploadDate: string;
  downloadUrl: string;
}

// Minimal PrimeReact-like spinner (no external deps)
const InlineSpinner: React.FC<{ size?: number; strokeWidth?: number; durationSec?: number; className?: string }> = ({
  size = 16,
  strokeWidth = 8,
  durationSec = 0.5,
  className,
}) => {
  const radius = (50 - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Create an arc by showing ~60% of the stroke
  const dash = 0.6 * circumference;
  const gap = circumference - dash;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      className={"animate-spin " + (className || "")}
      style={{ animationDuration: `${durationSec}s` }}
      role="progressbar"
      aria-label="Loading"
    >
      <circle
        cx="25"
        cy="25"
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${gap}`}
        transform="rotate(-90 25 25)"
      />
    </svg>
  );
};

export const DownloadCard = ({ 
  title, 
  type, 
 
  uploadDate, 
  downloadUrl 
}: DownloadCardProps) => {
  const fullTitle = title;

  // Responsive truncation by viewport width
  const [vw, setVw] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const maxLen = vw < 380 ? 24 : vw < 640 ? 28 : vw < 768 ? 36 : vw < 1024 ? 48 : 72;
  const displayTitle = fullTitle && fullTitle.length > maxLen ? `${fullTitle.slice(0, maxLen)}...` : fullTitle;
  const [downloading, setDownloading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'downloading' | 'completed'>('idle');
  
  // Enhanced download function with better error handling
  const downloadFile = async (url: string, filename: string) => {
    try {
      // Check for invalid/placeholder URLs
      if (url.includes('your-cloud-name') || url.includes('example.com') || url.includes('placeholder')) {
        throw new Error('Invalid file URL - please contact administrator');
      }

      // Always fetch as blob for proper download (handles Cloudinary and other CDNs)
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit'
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('File not found on server');
        } else if (response.status === 403) {
          throw new Error('Access denied to file');
        } else {
          throw new Error(`Failed to download file: ${response.status}`);
        }
      }

      const blob = await response.blob();

      // Check if blob is valid
      if (blob.size === 0) {
        throw new Error('Downloaded file is empty');
      }

      const blobUrl = URL.createObjectURL(blob);

      // Create download link
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      link.style.display = 'none';

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up blob URL after a short delay
      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 100);

    } catch (error) {
      console.error('Download failed:', error);
      // Final fallback: anchor with fl_attachment (may open a new tab)
      try {
        const sep = url.includes('?') ? '&' : '?';
        const dlUrl = `${url}${sep}fl_attachment=${encodeURIComponent(filename)}`;
        const link = document.createElement('a');
        link.href = dlUrl;
        link.download = filename;
        link.rel = 'noopener noreferrer';
        link.target = '_blank';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        await new Promise((r) => setTimeout(r, 300));
        return;
      } catch {
        const errorMessage = error instanceof Error ? error.message : 'Download failed';
        alert(`Unable to download file: ${errorMessage}\n\nPlease try again later or contact support if the problem persists.`);
      }
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
    <div className="relative bg-card hover:bg-card-hover border border-border rounded-xl p-5 shadow-soft hover:shadow-medium transition-all duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <div className="p-2 bg-primary rounded-lg">
            {getFileIcon()}
          </div>
          <div className="flex-1 min-w-0 pr-36 md:pr-40">
            <h4 className="text-base font-semibold text-foreground mb-1 break-words whitespace-normal" title={title}>{displayTitle}</h4>
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
        <div className="absolute top-5 right-5 ml-2 z-10">
          <Button 
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary"
            disabled={downloading}
            onClick={async () => {
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

              // Use the enhanced download function
              try {
                setDownloading(true);
                setStatus('downloading');
                await downloadFile(downloadUrl, safeName);
                setStatus('completed');
                setTimeout(() => setStatus('idle'), 2000);
              } finally {
                setDownloading(false);
              }
            }}
          >
            {status === 'downloading' ? (
              <span className="inline-flex items-center gap-2">
                <InlineSpinner size={16} strokeWidth={6} durationSec={0.5} className="text-primary-foreground" />
                <span>Downloading</span>
              </span>
            ) : status === 'completed' ? (
              <span>Completed</span>
            ) : (
              <>
                <Download className="w-4 h-4 mr-1" />
                Download
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};