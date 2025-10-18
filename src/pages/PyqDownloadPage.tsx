import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
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

  const triggerDownload = (url: string, title?: string, fileType?: string) => {
    let base = safeTitleBase(title);
    let ext = (fileType || "pdf").toLowerCase();
    try {
      const u = new URL(url);
      const m = u.pathname.match(/\.([a-zA-Z0-9]{1,10})$/);
      if (m && m[1]) ext = m[1].toLowerCase();
    } catch {}
    const rawName = `${base}.${ext}`;
    const safeName = rawName.replace(/[^a-zA-Z0-9._-]+/g, "_");

    if ((import.meta as any).env?.PROD) {
      const apiUrl = `/api/download?url=${encodeURIComponent(url)}&name=${encodeURIComponent(safeName)}`;
      const a = document.createElement("a");
      a.href = apiUrl;
      a.download = safeName;
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      // dev: fetch blob (CSP allows Cloudinary in index.html)
      fetch(url)
        .then((r) => r.blob())
        .then((blob) => {
          const objectUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = objectUrl;
          link.download = safeName;
          link.rel = "noopener";
          document.body.appendChild(link);
          link.click();
          link.remove();
          URL.revokeObjectURL(objectUrl);
        })
        .catch(() => {
          window.open(url, "_blank", "noopener,noreferrer");
        });
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
                {subject?.name} • {loading ? "Loading..." : `${items.length} files available`}
              </p>
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading PYQ files...</p>
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
              const displayTitle = m.title && m.title.length > 28 ? `${m.title.slice(0, 28)}...` : m.title;

              return (
                <div
                  key={m.id}
                  className="relative bg-card hover:bg-card-hover border border-border rounded-xl p-5 shadow-soft hover:shadow-medium transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-start justify-start sm:justify-between gap-3">
                    <div className="flex items-start flex-1 min-w-0">
                      <div className="flex-1 min-w-0 pr-24 sm:pr-0">
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
                        onClick={() => triggerDownload(m.url, m.title, m.file_type || "pdf")}
                      >
                        Download
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
