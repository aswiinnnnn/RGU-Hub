import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BookOpen, ChevronRight } from "lucide-react";

const SemesterSelection = () => {
  const navigate = useNavigate();

  const semesters = [
    { semester: "Semester 1", academicYear: "1st Year", subjectCount: 5, current: false },
    { semester: "Semester 2", academicYear: "1st Year", subjectCount: 5, current: false },
    { semester: "Semester 3", academicYear: "2nd Year", subjectCount: 5, current: false },
    { semester: "Semester 4", academicYear: "2nd Year", subjectCount: 5, current: false },
    { semester: "Semester 5", academicYear: "3rd Year", subjectCount: 4, current: false },
    { semester: "Semester 6", academicYear: "3rd Year", subjectCount: 4, current: false },
    { semester: "Semester 7", academicYear: "4th Year", subjectCount: 4, current: false },
    { semester: "Semester 8", academicYear: "4th Year", subjectCount: 4, current: false }
  ];

  const handleSemesterClick = (semesterIndex: number) => {
    navigate(`/semester-subjects/${semesterIndex + 1}`);
  };

  

  return (
    <div className="min-h-screen bg-gradient-hero">
      <AppHeader />
      <div className="container mx-auto px-4 pt-0 pb-6">
        <Breadcrumbs 
          items={[
            { label: "Select Batch", path: "/course" },
            { label: "Select Semester" }
          ]} 
        />
        
        <div className="mt-3 mb-6 animate-fade-in">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/course')}
            className="px-3 py-1  text-black text-sm font-semibold mb-5 border-[0.7px] border-black/20 shadow-nav  "
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to course Selection
          </Button>
          
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Select Your Semester
          </h1>
          <p className="text-muted-foreground">
            Choose your current semester to access study materials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {semesters.map((sem, index) => (
            <Card
              key={index}
              className={`p-6 hover:shadow-lg transition-all cursor-pointer ${
                sem.current 
                  ? 'bg-gradient-primary border-primary shadow-medium' 
                  : 'bg-gradient-card border-border hover:border-primary'
              } group`}
              onClick={() => handleSemesterClick(index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${
                    sem.current 
                      ? 'bg-primary-foreground/20' 
                      : 'bg-primary/10 group-hover:bg-primary/20'
                  } transition-colors`}>
                    <BookOpen className={`w-6 h-6 ${
                      sem.current ? 'text-primary-foreground' : 'text-primary'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold mb-1 ${
                      sem.current ? 'text-primary-foreground' : 'text-foreground'
                    }`}>
                      {sem.semester}
                    </h3>
                    <p className={`text-sm ${
                      sem.current ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}>
                      {sem.academicYear} • {sem.subjectCount} Subjects
                    </p>
                    {sem.current && (
                      <span className="inline-block mt-2 px-2 py-1 bg-primary-foreground/20 rounded-full text-xs font-medium text-primary-foreground">
                        Current Semester
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                  sem.current ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-primary'
                }`} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SemesterSelection;