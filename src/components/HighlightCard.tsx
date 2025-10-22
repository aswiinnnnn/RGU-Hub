import { LucideIcon } from "lucide-react";

interface HighlightCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: string;
  onClick?: () => void;
}

export const HighlightCard = ({ 
  icon: Icon, 
  title, 
  description, 
  color = "primary",
  onClick 
}: HighlightCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="group bg-gradient-card hover:bg-card-hover border border-border rounded-2xl p-4 shadow-card hover:shadow-medium transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-center gap-3 md:block">
        <div className={`inline-flex p-3 rounded-xl bg-${color}/10 group-hover:bg-${color}/20 transition-colors md:mb-4`}>
          <Icon className={`w-6 h-6 text-${color}`} />
        </div>
        <h3 className="text-lg font-semibold text-foreground truncate md:mb-2">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed break-words mt-1 md:mt-0">{description}</p>
    </div>
  );
};