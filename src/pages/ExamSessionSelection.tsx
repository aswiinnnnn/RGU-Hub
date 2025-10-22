import { useParams, useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import { subjects, semesterSubjects } from "@/data/academicData";

const ExamSessionSelection = () => {
  const { type, yearId, subjectId, materialType } = useParams();
  const navigate = useNavigate();
  
  const isYearBased = type === 'year';
  const subject = isYearBased 
    ? subjects.find(s => s.id === subjectId)
    : semesterSubjects.find(s => s.id === subjectId);

  const examSessions = [
    { month: "January", year: "2025", papers: 3 },
    { month: "July", year: "2024", papers: 5 },
    { month: "January", year: "2024", papers: 4 },
    { month: "July", year: "2023", papers: 6 },
    { month: "January", year: "2023", papers: 2 },
    { month: "July", year: "2022", papers: 4 }
  ];

  const handleSessionClick = (session: { month: string; year: string }) => {
    const sessionId = `${session.month.toLowerCase()}-${session.year}`;
    if (isYearBased) {
      // Year-based download flow removed; route to semester download as a fallback
      navigate(`/semester-download/${yearId}/${subjectId}/${materialType}?session=${sessionId}`);
    } else {
      navigate(`/semester-download/${yearId}/${subjectId}/${materialType}?session=${sessionId}`);
    }
  };

  const backPath = isYearBased 
    ? `/semester-materials/${yearId}/${subjectId}`
    : `/semester-materials/${yearId}/${subjectId}`;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <AppHeader />
      <div className="container mx-auto px-4 pt-0 pb-6">
        <Breadcrumbs 
          items={[
            { label: "Select Course", path: "/course" },
            { label: "Semester", path: "/semester" },
            { label: subject?.name || "" },
            { label: "Select Exam Session" }
          ]} 
        />
        
        <div className="mt-8 mb-6 animate-fade-in">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(backPath)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Material Types
          </Button>
          
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Select Exam Session
          </h1>
          <p className="text-muted-foreground">
            Choose the exam session for Previous Year Questions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
          {examSessions.map((session, index) => (
            <Card
              key={index}
              className="p-5 hover:shadow-lg transition-all cursor-pointer bg-gradient-card border-border hover:border-primary group"
              onClick={() => handleSessionClick(session)}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    {session.month} {session.year}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {session.papers} papers available
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamSessionSelection;