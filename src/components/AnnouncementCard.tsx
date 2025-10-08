import { Calendar, FileText, Upload } from "lucide-react";

interface AnnouncementCardProps {
  type: "added" | "updated";
  title: string;
  date: string;
}

export const AnnouncementCard = ({ type, title, date }: AnnouncementCardProps) => {
  const isAdded = type === "added";
  
  return (
    <div className="flex items-start space-x-3 p-4 bg-card hover:bg-card-hover rounded-xl border border-border shadow-soft hover:shadow-medium transition-all duration-300">
      <div className={`p-2 rounded-lg ${isAdded ? 'bg-success/10' : 'bg-accent/10'}`}>
        {isAdded ? (
          <Upload className="w-4 h-4 text-success" />
        ) : (
          <FileText className="w-4 h-4 text-accent" />
        )}
      </div>
      <div className="flex-1">
        <span className={`text-xs font-semibold ${isAdded ? 'text-success' : 'text-accent'}`}>
          {isAdded ? 'ADDED' : 'UPDATED'}
        </span>
        <h4 className="text-sm font-medium text-foreground mt-1">{title}</h4>
        <div className="flex items-center mt-2 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3 mr-1" />
          {date}
        </div>
      </div>
    </div>
  );
};