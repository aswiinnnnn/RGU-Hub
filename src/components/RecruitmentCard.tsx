import { Building2, MapPin, Clock, Calendar, BanknoteIcon, ExternalLink, Briefcase, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface RecruitmentCardProps {
  companyName: string;
  position: string;
  location: string;
  jobType: 'FT' | 'PT' | 'IN';
  description: string;
  requirements: string;
  salary?: string;
  deadline: string;
  applyLink: string;
  postedOn: string;
  branch: 'bsc-nursing' | 'bsc-physiotherapy';
}

const jobTypeLabels = {
  FT: 'Full-Time',
  PT: 'Part-Time',
  IN: 'Internship'
};

const jobTypeColors = {
  FT: 'bg-primary/10 text-primary border-primary/20',
  PT: 'bg-secondary/10 text-secondary border-secondary/20',
  IN: 'bg-accent/10 text-accent border-accent/20'
};

export const RecruitmentCard = ({
  companyName,
  position,
  location,
  jobType,
  description,
  requirements,
  salary,
  deadline,
  applyLink,
  postedOn,
  branch
}: RecruitmentCardProps) => {
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [expandedRequirements, setExpandedRequirements] = useState(false);
  
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const isActive = deadlineDate >= today;
  const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const isLongDescription = description.length > 150;
  const isLongRequirements = requirements.length > 150;

  return (
    <div className={`group bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-medium transition-all duration-300 relative cursor-pointer hover:border-primary flex flex-col h-full`}
>
      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        {isActive ? (
          <Badge className="bg-success/10 text-success border-success/20 flex items-center gap-1">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            Active
          </Badge>
        ) : (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20">
            Expired
          </Badge>
        )}
      </div>

      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">{position}</h3>
            <p className="text-muted-foreground">{companyName}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className={jobTypeColors[jobType]}>
            <Briefcase className="w-3 h-3 mr-1" />
            {jobTypeLabels[jobType]}
          </Badge>
          <Badge variant="outline" className="bg-muted/50">
            {branch === 'bsc-nursing' ? 'BSc Nursing' : 'BSc Physiotherapy'}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
          {salary && (
            <div className="flex items-center gap-1">
              <BanknoteIcon className="w-4 h-4" />
              {salary}
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-foreground mb-2">Description</h4>
        <p className={`text-sm text-muted-foreground ${!expandedDescription && isLongDescription ? 'line-clamp-3' : ''}`}>
          {description}
        </p>
        {isLongDescription && (
          <button
            onClick={() => setExpandedDescription(!expandedDescription)}
            className="mt-2 text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          >
            {expandedDescription ? (
              <>
                Show less <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                Read more <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Requirements */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-foreground mb-2">Requirements</h4>
        <p className={`text-sm text-muted-foreground ${!expandedRequirements && isLongRequirements ? 'line-clamp-3' : ''}`}>
          {requirements}
        </p>
        {isLongRequirements && (
          <button
            onClick={() => setExpandedRequirements(!expandedRequirements)}
            className="mt-2 text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          >
            {expandedRequirements ? (
              <>
                Show less <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                Read more <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Footer */}
       <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Calendar className="w-3 h-3" />
        Deadline: {new Date(deadline).toLocaleDateString()}
      </div>
      {isActive && daysLeft <= 7 && (
        <div className="flex items-center gap-1 text-xs text-warning">
          <Clock className="w-3 h-3" />
          {daysLeft} days left
        </div>
      )}
    </div>

    <Button
      variant={isActive ? "default" : "grey"}
      size="sm"
      className="gap-1"
      onClick={() => window.open(applyLink, '_blank')}
      disabled={!isActive}
    >
      Apply Now
      <ExternalLink className="w-3 h-3" />
    </Button>
  </div>
</div>
  );
};