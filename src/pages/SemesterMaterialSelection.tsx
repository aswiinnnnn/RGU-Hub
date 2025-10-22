import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MaterialTypeCard } from "@/components/MaterialTypeCard";
import { ArrowLeft, BookOpen, FileText, GraduationCap, Lightbulb, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppHeader from "@/components/AppHeader";
import useBreadcrumbBack from "@/hooks/use-breadcrumb-back";
import { DownloadCard } from "@/components/DownloadCard";
import { 
  HelpCircle, 
  ClipboardList, 
  Stethoscope 
} from "lucide-react";
import { API_BASE_URL } from "@/config/api";

type Material = {
  id: number;
  title: string;
  description: string;
  url: string;
  created_at: string;
  year?: number;
  month?: string;
  material_type: {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
  };
  // Add other fields if needed
};

type MaterialType = {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
};

type Subject = {
  id: number;
  name: string;
  code: string;
  slug: string;
  subject_type: string;
  term_slug: string;
  // ...other fields if needed
};

const SemesterMaterialSelection = () => {
  const { semesterId, subjectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  useBreadcrumbBack();

  const semesterNumber = parseInt(semesterId || "1");

  // Get subject from navigation state
  const subject: Subject | undefined = location.state?.subject;

  // Remove debug logs for production

  const [materials, setMaterials] = useState<Material[]>([]);
  const [materialTypes, setMaterialTypes] = useState<MaterialType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch material types
  useEffect(() => {
    fetch(`${API_BASE_URL}/material-types/`)
      .then(res => res.json())
      .then(data => {
        
        setMaterialTypes(data);
      })
      .catch(err => {
        console.error("[SemesterMaterialSelection] Error fetching material types:", err);
      });
  }, []);

  useEffect(() => {
    if (!subject?.slug) {
      
      setError("No subject slug available");
      return;
    }
    
    const apiUrl = `${API_BASE_URL}/materials/?subject=${subject.slug}`;
    const requestOptions = { method: "GET" };
    
    
    setLoading(true);
    setError(null);
    
    fetch(apiUrl, requestOptions)
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
      .catch(error => {
        
        setError(error.message);
        setLoading(false);
      });
  }, [subject?.slug]);

  const isYearFlow = (location.state?.type || "sem") === "year";

  const handleBack = () => {
    if (isYearFlow) {
      navigate(`/year-subjects/${location.state?.value ?? semesterNumber}`, {
        state: {
          course: location.state?.course || "bpt",
          type: "year",
          value: location.state?.value ?? semesterNumber,
        },
      });
    } else {
      navigate(`/semester-subjects/${semesterId}`, { 
        state: { 
          course: location.state?.course || "BN", 
          type: "sem", 
          value: semesterNumber 
        } 
      });
    }
  };

  const handleMaterialTypeClick = (materialType: MaterialType) => {
    if (!subject?.slug) {
      
      return;
    }
    
    
    
    if (materialType.slug === 'pyq') {
      navigate(`/pyq-download/${semesterId}/${subject.slug}`, {
        state: {
          subject: subject,
          course: location.state?.course || "BN",
          type: location.state?.type || "sem",
          value: semesterNumber,
          materialType: materialType
        }
      });
    } else {
      navigate(`/semester-download/${semesterId}/${subject.slug}/${materialType.slug}`, {
        state: {
          subject: subject,
          course: location.state?.course || "BN",
          type: location.state?.type || "sem",
          value: semesterNumber,
          materialType: materialType
        }
      });
    }
  };

  // If no subject is available, show error or redirect
  if (!subject) {
    
    return (
      <div className="min-h-screen bg-gradient-hero">
        <AppHeader />
        <div className="container mx-auto px-4 pt-0 pb-6">
          <div className="mt-3 mb-6 animate-fade-in">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="px-3 py-1 text-black text-sm font-semibold mb-5 border-[0.7px] border-black/20 shadow-nav"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Subjects
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Subject Not Found
            </h1>
            <p className="text-muted-foreground">
              The subject information could not be loaded. Please go back and try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <AppHeader />
      <div className="container mx-auto px-4 pt-0 pb-6">
        <Breadcrumbs 
          items={isYearFlow ? [
            { label: "Select Course", path: "/course" },
            { label: "Select Year", path: "/year" },
            { label: `Year ${location.state?.value ?? semesterNumber}`, path: `/year-subjects/${location.state?.value ?? semesterNumber}` },
            { label: subject?.name || "" }
          ] : [
            { label: "Select Course", path: "/course" },
            { label: "Select Course", path: "/course" },
            { label: "Select Semester", path: "/semester" },
            { label: `Semester ${semesterNumber}`, path: `/semester-subjects/${semesterId}` },
            { label: subject?.name || "" }
          ]} 
        />

        <div className="mt-3 mb-6 animate-fade-in">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="px-3 py-1  text-black text-sm font-semibold mb-5 border-[0.7px] border-black/20 shadow-nav  "
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Subjects
          </Button>

          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {subject?.name}
          </h1>
          <p className="text-muted-foreground">
            {loading ? "Loading..." : `${materials.length} total materials available`} • Choose the type of material you want to access
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {materialTypes.map((materialType) => (
            <MaterialTypeCard
              key={materialType.id}
              icon={getIconComponent(materialType.icon)}
              title={materialType.name}
              description={materialType.description}
              count={materials.filter(m => m.material_type && m.material_type.slug === materialType.slug).length}
              color={materialType.color}
              onClick={() => handleMaterialTypeClick(materialType)}
            />
          ))}
        </div>

        

        {!loading && !error && materials.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No Materials Available</h3>
              <p className="text-muted-foreground mb-4">
                This subject doesn't have any study materials uploaded yet.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-amber-800 text-sm">
                  Contact admin or course coordinator to request material uploads.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Display fetched materials from API */}
        {loading && (
          <div className="mt-10 text-center py-8">
            <p className="text-muted-foreground">Loading study materials...</p>
          </div>
        )}

        {error && (
          <div className="mt-10 text-center py-8 text-red-500">
            <p>{error}</p>
          </div>
        )}

{materials.length > 0 && (
  <div className="mt-10">
    <h2 className="text-xl font-bold ">Uncategorized Materials</h2>
    <div className="mt-1  mb-10 ">
            <p className="text-muted-foreground">These materials will be categorized soon.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">

      
    {materials
        .filter((material) => !material.material_type)
        .map((material) => (
          <DownloadCard
            key={material.id}
            title={material.title}
            type="PDF"
            uploadDate={new Date(material.created_at).toLocaleDateString()}
            downloadUrl={material.url}
          />
        ))}
    </div>
  </div>
)}


        {materials.length === 0 && !loading && !error && (
          <div className="mt-10 text-center py-8">
            <p className="text-muted-foreground">No study materials available for this subject yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to get icon component
const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: import('lucide-react').LucideIcon } = {
    'BookOpen': BookOpen,
    'FileText': FileText,
    'HelpCircle': HelpCircle,
    'ClipboardList': ClipboardList,
    'Stethoscope': Stethoscope,
  };
  return iconMap[iconName] || BookOpen;
};

export default SemesterMaterialSelection;


