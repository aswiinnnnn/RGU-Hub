import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import useBreadcrumbBack from "@/hooks/use-breadcrumb-back";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SubjectCard } from "@/components/SubjectCard";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/config/api";
import { BookOpen } from "lucide-react";

type Subject = {
  id: number;
  code: string;
  name: string;
  subject_type: string;
  slug: string;
  term: number;
  term_slug: string;
  materials_count: number;
};

const SemesterSubjectSelection = () => {
  const { semesterId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  useBreadcrumbBack();

  // Get course, type, and value from location.state or fallback
  const { course = "BN", type = "sem", value = semesterId ? parseInt(semesterId) : 1 } = location.state || {};

  // Remove debug logs for production

  const semesterNumber = value;
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = `${API_BASE_URL}/subjects/?course=${course}&sem=${semesterNumber}`;
    
    
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
        
    setSubjects(data || []); // use the data array directly

        setLoading(false);
      })
      .catch(err => {
        
        setError(err.message);
        setLoading(false);
      });
  }, [course, semesterNumber]);

  const handleBack = () => {
    
    navigate('/semester');
  };

  const handleSubjectClick = (subject: Subject) => {
    
    navigate(`/semester-materials/${semesterNumber}/${subject.id}`, { 
      state: { 
        subject: subject,  // Pass the complete subject object
        course, 
        type, 
        value: semesterNumber 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <AppHeader />
      <div className="container mx-auto px-4 pt-0 pb-6">
        <Breadcrumbs 
          items={[
            { label: "Select Course", path: "/course" },
            { label: "Select Course", path: "/course" },
            { label: "Select Semester", path: "/semester" },
            { label: `Semester ${semesterNumber}` }
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
            Back to Semesters
          </Button>
          
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Semester {semesterNumber} Subjects
          </h1>
          <p className="text-muted-foreground">
            Choose a subject to access study materials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
          {loading && (
            <div className="col-span-2 text-center py-8">
              <p className="text-muted-foreground">Loading subjects...</p>
            </div>
          )}
          {error && (
            <div className="col-span-2 text-center py-8">
              <p className="text-red-500">Error loading subjects: {error}</p>
            </div>
          )}
          {!loading && !error && subjects.length === 0 && (
            <div className="col-span-2 flex justify-center">
            <div className="text-center py-8">
              <div className="max-w-md mx-auto">
                <div className="text-4xl mb-3">📄</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No Subjects Found</h3>
                <p className="text-muted-foreground mb-3">
                  Subjects for this course or term are not available.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                  <p className="text-amber-800 text-sm">
                    Contact admin to request updates for this course.
                  </p>
                </div>
               
              </div>
            </div>
          </div>
          )}
          {!loading && !error && subjects.map((subject) => (
            <div
              key={subject.id}
              onClick={() => handleSubjectClick(subject)}
              className="p-6 border rounded-lg bg-card hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {subject.name}
                  </h3>
                </div>
                <div className="text-sm text-muted-foreground">
                  {subject.materials_count || 0} materials
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-primary font-medium">{subject.code}</span>
                {subject.materials_count === 0 && (
                  <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                    Contact admin to upload materials
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SemesterSubjectSelection;