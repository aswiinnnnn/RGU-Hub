import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DownloadCard } from "@/components/DownloadCard";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppHeader from "@/components/AppHeader";
import useBreadcrumbBack from "@/hooks/use-breadcrumb-back";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/config/api";

type Material = {
  id: number;
  title: string;
  description: string;
  url: string;
  created_at: string;
  subject_id: number;
  subject_code: string;
  subject_name: string;
};

const SemesterDownloadPage = () => {
  const { semesterId, subjectId, materialType } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  useBreadcrumbBack();

  const semesterNumber = parseInt(semesterId || "1");
  
  // Get subject from navigation state or try to reconstruct it
  const subject = location.state?.subject || {
    id: subjectId,
    name: location.state?.subjectName || "Subject",
    slug: subjectId
  };

  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!subject?.slug) {
      
      setLoading(false);
      return;
    }

    // Get material type from URL params
    const materialTypeSlug = materialType;
    

    const apiUrl = `${API_BASE_URL}/materials/?subject=${subject.slug}&type=${materialTypeSlug}`;
    
    
    setLoading(true);
    setError(null);

    fetch(apiUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        
        setMaterials(data);
        setLoading(false);
      })
      .catch(err => {
        
        setError(err.message);
        setLoading(false);
      });
  }, [subject?.slug, materialType]);

  const formatMaterialType = (type: string | undefined) => {
    return type?.replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') || '';
  };

  const handleBackToMaterials = () => {
    
    // Navigate back to materials page with proper state
    navigate(`/semester-materials/${semesterId}/${subject.id}`, {
      state: {
        subject: subject,
        course: location.state?.course || "BN",
        type: location.state?.type || "sem",
        value: semesterNumber
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <AppHeader />
      <div className="container mx-auto px-4 pt-0 pb-6 ">
        <Breadcrumbs 
          items={[
            { label: "Select Course", path: "/course" },
            { label: "Select Semester", path: "/semester" },
            { label: `Semester ${semesterNumber}`, path: `/semester-subjects/${semesterId}` },
            { label: subject?.name || "", path: `/semester-materials/${semesterId}/${subject.id}` },
            { label: formatMaterialType(materialType) }
          ]} 
        />

        <div className="mt-3 mb-6 animate-fade-in">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToMaterials}
            className="px-3 py-1  text-black text-sm font-semibold mb-5 border-[0.7px] border-black/20 shadow-nav  rounded-"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Materials
          </Button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {formatMaterialType(materialType)}
              </h1>
              <p className="text-muted-foreground">
                {subject?.name} • {loading ? "Loading..." : `${materials.length} files available`}
              </p>
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading materials...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-500">Error loading materials: {error}</p>
          </div>
        )}

        {!loading && !error && materials.length === 0 && (
          <div className="text-center py-8">
            <div className="max-w-md mx-auto">
              <div className="text-4xl mb-3">📄</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No Materials Found</h3>
              <p className="text-muted-foreground mb-3">
                No materials available for this subject and type.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-amber-800 text-sm">
                  Contact admin to request material uploads.
                </p>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && materials.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
            {materials.map((material) => (
              <DownloadCard
                key={material.id}
                title={material.title}
                type="PDF"
                uploadDate={new Date(material.created_at).toLocaleDateString()}
                downloadUrl={material.url}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SemesterDownloadPage;


