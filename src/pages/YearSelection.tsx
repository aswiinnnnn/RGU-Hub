import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { YearCard } from "@/components/YearCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { years } from "@/data/academicData";

const YearSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      <AppHeader />
      <div className="container mx-auto px-4 pt-0 pb-6">
        <Breadcrumbs 
          items={[
            { label: "Select Course", path: "/course" },
            { label: "Select Year" }
          ]} 
        />
        
        <div className="mt-3 mb-6 animate-fade-in">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/course')}
            className="px-3 py-1  text-black text-sm font-semibold mb-5 border-[0.7px] border-black/20 shadow-nav"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Course Selection
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Select Your Academic Year
          </h1>
          <p className="text-muted-foreground">
            Choose your current year to access relevant study materials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {years.map((yearData, index) => (
            <YearCard
              key={index}
              year={yearData.year}
              academicYear={yearData.academicYear}
              subjectCount={yearData.subjectCount}
              isActive={yearData.current}
              // Physiotherapy uses year-based flow
              onClick={() =>
                navigate(`/year-subjects/${index + 1}`, {
                  state: { course: 'bpt', type: 'year', value: index + 1 }
                })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default YearSelection;
