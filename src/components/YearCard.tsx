import { BookOpen, ChevronRight, GraduationCap } from "lucide-react";

interface YearCardProps {
  year: string;
  academicYear: string;
  subjectCount: number;
  onClick: () => void;
  isActive?: boolean;
}

export const YearCard = ({ 
  year, 
  academicYear, 
  subjectCount, 
  onClick,
  isActive = false 
}: YearCardProps) => {
  return (
    <div 
      onClick={onClick}
      className={`group p-6 rounded-2xl transition-all duration-300 cursor-pointer hover:scale-[1.02]
        bg-gradient-card border border-border hover:border-primary hover:shadow-medium`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
          <GraduationCap className="w-8 h-8 text-primary" />
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors mt-3 group-hover:translate-x-1" />
      </div>
      
      <h3 className="text-2xl font-bold text-foreground mb-1">{year}</h3>
      <p className="text-sm text-muted-foreground mb-3">{academicYear}</p>
      
      <div className="flex items-center text-sm text-muted-foreground">
        <BookOpen className="w-4 h-4 mr-1" />
        <span>{subjectCount} Subjects</span>
      </div>

    </div>
  );
};