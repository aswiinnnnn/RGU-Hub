import React, { useEffect, useMemo, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";
import { ArrowLeft, Calendar, FileText, HardDriveDownload, Info, Layers } from "lucide-react";
import { API_BASE_URL } from "@/config/api";

// PYQ Material shape – tolerate missing fields gracefully
interface PyqMaterial {
  id: number;
  title: string;
  description?: string | null;
  url: string;
  created_at?: string;
  year?: number;
  month?: string; // e.g., "January"
  file_type?: string; // e.g., "pdf"
  file_size_bytes?: number; // optional size in bytes
  material_type?: { slug: string; name: string } | null;
}

// Minimal PrimeReact-like spinner for inline usage
const InlineSpinner: React.FC<{ size?: number; strokeWidth?: number; durationSec?: number; className?: string }> = ({
  size = 16,
  strokeWidth = 6,
  durationSec = 0.5,
  className,
}) => {
  const radius = (50 - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
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

const formatBytes = (bytes?: number) => {
  if (!bytes || bytes <= 0) return "-";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const v = bytes / Math.pow(1024, i);
  return `${v.toFixed(v >= 10 ? 0 : 1)} ${sizes[i]}`;
};

const safeTitleBase = (title?: string) => (title || "file").replace(/\.[a-zA-Z0-9]{1,10}$/i, "");

const PyqDownloadPage: React.FC = () => {
  const { semesterId, subjectId } = useParams(); // semesterId may be year number for year-flow reuse
  const navigate = useNavigate();
  const location = useLocation();

  const isYearFlow = (location.state?.type || "sem") === "year";
  const termNumber = useMemo(() => parseInt(semesterId || "1"), [semesterId]);

  const subject = location.state?.subject || {
    id: subjectId,
    name: location.state?.subjectName || "Subject",
    slug: subjectId,
  };

  const [items, setItems] = useState<PyqMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [vw, setVw] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [statusById, setStatusById] = useState<Record<number, 'idle' | 'downloading' | 'completed'>>({});
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!subject?.slug) {
      setLoading(false);
      setError("Missing subject");
      return;
    }

    const apiUrl = `${API_BASE_URL}/materials/?subject=${subject.slug}&type=pyq`;
    setLoading(true);
    setError(null);

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message || "Failed to load");
        setLoading(false);
      });
  }, [subject?.slug]);

  const handleBack = () => {
    if (isYearFlow) {
      navigate(`/semester-materials/${semesterId}/${subject.id}`, {
        state: {
          subject,
          course: location.state?.course || "bpt",
          type: "year",
          value: termNumber,
        },
      });
    } else {
      navigate(`/semester-materials/${semesterId}/${subject.id}`, {
        state: {
          subject,
          course: location.state?.course || "BN",
          type: "sem",
          value: termNumber,
        },
      });
    }
  };

  const downloadFile = async (url: string, filename: string) => {
    try {
      // If Cloudinary, avoid fetch/iframe (CSP). Use anchor with fl_attachment in a new tab
      try {
        const u = new URL(url);
        if (u.hostname.endsWith('res.cloudinary.com')) {
          const sep0 = url.includes('?') ? '&' : '?';
          const dl0 = `${url}${sep0}fl_attachment=${encodeURIComponent(filename)}`;
          const a0 = document.createElement('a');
          a0.href = dl0;
          a0.download = filename;
          a0.target = '_blank';
          a0.rel = 'noopener noreferrer';
          a0.style.display = 'none';
          document.body.appendChild(a0);
          a0.click();
          document.body.removeChild(a0);
          await new Promise((r) => setTimeout(r, 300));
          return;
        }
      } catch {}
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

      // Final fallback: anchor with fl_attachment in new tab
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

  const triggerDownload = async (url: string, title?: string, fileType?: string, id?: number) => {
    const base = safeTitleBase(title);
    let ext = (fileType || "pdf").toLowerCase();
    try {
      const u = new URL(url);
      const m = u.pathname.match(/\.([a-zA-Z0-9]{1,10})$/);
      if (m && m[1]) ext = m[1].toLowerCase();
    } catch {
      // Ignore URL parsing errors
    }
    const rawName = `${base}.${ext}`;
    const safeName = rawName.replace(/[^a-zA-Z0-9._-]+/g, "_");

    // Use the enhanced download function with inline spinner
    try {
      if (typeof id === 'number') {
        setDownloadingId(id);
        setStatusById((prev) => ({ ...prev, [id]: 'downloading' }));
      }
      await downloadFile(url, safeName);
      if (typeof id === 'number') {
        setStatusById((prev) => ({ ...prev, [id]: 'completed' }));
        setTimeout(() => {
          setStatusById((prev) => ({ ...prev, [id]: 'idle' }));
        }, 2000);
      }
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <AppHeader />
      <div className="container mx-auto px-4 pt-0 pb-6">
        <Breadcrumbs
          items={isYearFlow ? [
            { label: "Select Course", path: "/course" },
            { label: "Select Year", path: "/year" },
            { label: `Year ${termNumber}`, path: `/year-subjects/${termNumber}` },
            { label: subject?.name || "" },
            { label: "Previous Year Questions" },
          ] : [
            { label: "Select Course", path: "/course" },
            { label: "Select Semester", path: "/semester" },
            { label: `Semester ${termNumber}`, path: `/semester-subjects/${semesterId}` },
            { label: subject?.name || "" },
            { label: "Previous Year Questions" },
          ]}
        />

        <div className="mt-3 mb-6 animate-fade-in">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="px-3 py-1  text-black text-sm font-semibold mb-5 border-[0.7px] border-black/20 shadow-nav"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Materials
          </Button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Previous Year Questions
              </h1>
              <p className="text-muted-foreground">
                {subject?.name} • {loading ? (
                  <span className="inline-flex items-center">Loading from server<Loader inline sizePx={10} className="ml-2" /></span>
                ) : (
                  `${items.length} files available`
                )}
              </p>
            </div>
          </div>
        </div>

        {loading && (
          <div className="w-full flex items-center justify-center text-muted-foreground py-8 min-h-[40vh]">
            <span className="inline-flex items-baseline">
              <span className="align-baseline">Loading previous year questions from server</span>
              <Loader inline sizePx={4} className="ml-1 align-baseline relative top-[1px]" />
            </span>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-500">Error loading PYQ: {error}</p>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="text-center py-8">
            <div className="max-w-md mx-auto">
              <div className="text-4xl mb-3">📄</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No PYQ Found</h3>
              <p className="text-muted-foreground mb-3">
                No PYQ available for this subject yet.
              </p>
            </div>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
            {items.map((m) => {
              const fileType = (m.file_type || "pdf").toUpperCase();
              const uploaded = m.created_at ? new Date(m.created_at).toLocaleDateString() : "-";
              const monthUpper = (m.month ? String(m.month) : "-").toUpperCase();
              const ym = `${monthUpper} ${m.year ? m.year : ""}`.trim();
              const maxLen = vw < 380 ? 22 : vw < 640 ? 28 : vw < 768 ? 34 : vw < 1024 ? 44 : 64;
              const displayTitle = m.title && m.title.length > maxLen ? `${m.title.slice(0, maxLen)}...` : m.title;

              return (
                <div
                  key={m.id}
                  className="relative bg-card hover:bg-card-hover border border-border rounded-xl p-5 shadow-soft hover:shadow-medium transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-start justify-start sm:justify-between gap-3">
                    <div className="flex items-start flex-1 min-w-0 pr-36 md:pr-40">

                      <div className="flex-1 min-w-0 pr-36 md:pr-40">
                        <h4 className="text-base font-semibold text-foreground mb-1 break-words whitespace-normal" title={m.title}>
                          {displayTitle}
                        </h4>
                        {/* Highlight Year + Month just below title */}
                        <div className="text-sm md:text-base font-semibold text-primary mb-1">
                          {ym || "-"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 sm:mt-0">
                            <span className="flex items-center gap-1">{fileType}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{uploaded}</span>
                          </div>
                        </div>
                        {m.description ? (
                          <p className="mt-2 text-sm text-muted-foreground break-words">{m.description}</p>
                        ) : null}
                      </div>
                    </div>
                    <div className="absolute top-5 right-5">
                      <Button
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary"
                        disabled={downloadingId === m.id}
                        onClick={() => triggerDownload(m.url, m.title, m.file_type || "pdf", m.id)}
                      >
                        {downloadingId === m.id ? (
                          <InlineSpinner size={16} strokeWidth={6} durationSec={0.5} className="text-primary-foreground" />
                        ) : (
                          <>Download</>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PyqDownloadPage;
