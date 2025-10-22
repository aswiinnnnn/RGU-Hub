/**
 * RGU Hub Frontend - Application Header Component
 * 
 * This component renders the main application header with logo and navigation.
 * It provides a sticky header that remains visible while scrolling.
 * 
 * Features:
 * - Sticky positioning for better UX
 * - Logo and brand name
 * - Backdrop blur effect for modern look
 * - Responsive design
 * - Accessibility support with aria-label
 * 
 * Styling:
 * - Uses Tailwind CSS classes
 * - Primary color theme
 * - Backdrop blur for glass effect
 * - Container with responsive padding
 * 
 * Author: RGU Hub Development Team
 * Last Updated: 2025
 */

import { FC } from "react";
import { Link } from "react-router-dom";

/**
 * AppHeader Component
 * 
 * Renders the main application header with logo and brand name.
 * Provides navigation back to home page.
 */
export const AppHeader: FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-primary/70 backdrop-blur">
      <div className="container mx-auto px-4 h-14 flex items-center justify-start">
        {/* Logo - Links to Homepage */}
        <Link to="/" className="flex items-center gap-2" aria-label="Go to home">
          <img 
            src="/logo.png" 
            alt="RGU Hub" 
            className="h-8 w-auto" 
          />
        </Link>
      </div>
    </header>
  );
};

export default AppHeader;


