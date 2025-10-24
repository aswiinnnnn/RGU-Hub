import { LucideIcon, Download } from "lucide-react";
import "./BadgeSpinner.css";

interface MaterialTypeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  count: number;
  onClick: () => void;
  color?: string;
  loading?: boolean;
}

export const MaterialTypeCard = ({ 
  icon: Icon, 
  title, 
  description,
  count,
  onClick,
  color = "primary",
  loading = false
}: MaterialTypeCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="group bg-gradient-card hover:bg-card-hover border border-border rounded-2xl p-6 shadow-card hover:shadow-medium transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 bg-green/10 rounded-xl group-hover:bg-${color}/20 transition-colors`}>
          <Icon className={`w-7 h-7 text-primary`} />
        </div>
        {loading ? (
          <span className="bg-primary text-secondary-foreground rounded-full inline-flex items-center justify-center w-6 h-6">
            <span className="badge-loader" aria-label="Loading file count" />
          </span>
        ) : (
          <span className="px-3 py-1 bg-primary text-secondary-foreground text-sm font-semibold rounded-full inline-flex items-center justify-center whitespace-nowrap">
            {count} files
          </span>
        )}
      </div>
      
      <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
      
      <div className="flex items-center text-sm font-medium text-primary group-hover:text-accent transition-colors">
        <span>Access Materials</span>
        <Download className="w-4 h-4 ml-2" />
      </div>
    </div>
  );
};