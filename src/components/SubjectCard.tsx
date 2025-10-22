/**
 * RGU Hub Frontend - Subject Card Component
 * 
 * This component renders a card for displaying subject information.
 * It shows the subject name, material count, and provides click interaction.
 * 
 * Features:
 * - Clickable card with hover effects
 * - Material count display
 * - File icon with color theming
 * - Chevron right indicator for navigation
 * - Responsive design
 * - Smooth transitions and animations
 * 
 * Props:
 * - name: Subject name to display
 * - onClick: Function to call when card is clicked
 * - materialCount: Number of materials available (optional)
 * 
 * Usage:
 * Used in subject selection pages to display available subjects
 * with their material counts and navigation functionality.
 * 
 * Author: RGU Hub Development Team
 * Last Updated: 2025
 */

import { FileText, ChevronRight } from "lucide-react";

/**
 * Props interface for SubjectCard component
 */
interface SubjectCardProps {
  /** Subject name to display */
  name: string;
  /** Function to call when card is clicked */
  onClick: () => void;
  /** Number of materials available for this subject (optional) */
  materialCount?: number;
}

/**
 * SubjectCard Component
 * 
 * Renders a clickable card displaying subject information.
 * Shows subject name, material count, and provides visual feedback on hover.
 */
export const SubjectCard = ({ name, onClick, materialCount = 0 }: SubjectCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="group bg-card hover:bg-card-hover border border-border rounded-xl p-5 shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-start space-x-3 flex-1">
          {/* File Icon with Color Theming */}
          <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          
          {/* Subject Information */}
          <div className="flex-1">
            <h4 className="text-base font-semibold text-foreground leading-tight">{name}</h4>
            {/* Material Count Display */}
            {materialCount > 0 && (
              <p className="text-xs text-muted-foreground mt-1">{materialCount} materials</p>
            )}
          </div>
        </div>
        
        {/* Navigation Indicator */}
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </div>
  );
};