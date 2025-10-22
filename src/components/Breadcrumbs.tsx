import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const location = useLocation();

  // Function to truncate long labels
  const truncateLabel = (label: string, maxLength: number = 20) => {
    if (label.length <= maxLength) return label;
    return label.substring(0, maxLength - 3) + "...";
  };

  return (
    <nav className="flex items-center space-x-1 text-sm bg-primary/80 backdrop-blur-sm px-4 py-3 rounded-xl border-[0.7px] border-black/20 shadow-nav">
      <Link
        to="/"
        className="flex items-center hover:text-foreground transition-colors min-w-0"
      >
       <Home className="w-4 h-4 min-w-[16px] min-h-[16px]" />

        <span className="sr-only">Home</span>
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          {item.path ? (
            <Link
              to={item.path}
              className="hover:text-foreground transition-colors truncate max-w-[120px] sm:max-w-[150px] md:max-w-[200px]"
              title={item.label}
            >
              {truncateLabel(item.label)}
            </Link>
          ) : (
            <span 
              className="text-foreground font-medium truncate max-w-[120px] sm:max-w-[150px] md:max-w-[200px]"
              title={item.label}
            >
              {truncateLabel(item.label)}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};