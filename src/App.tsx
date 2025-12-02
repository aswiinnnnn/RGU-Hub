/**
 * RGU Hub Frontend - Main Application Component
 * 
 * This is the root component of the RGU Hub React application. It sets up the
 * routing, global providers, and defines all application routes.
 * 
 * Features:
 * - React Router for client-side routing
 * - TanStack Query for API state management
 * - Toast notifications (Toaster + Sonner)
 * - Tooltip provider for UI components
 * 
 * Route Structure:
 * - /: Homepage with latest updates
 * - /course: Course selection (BSCN, BPT, etc.)
 * - [REMOVED] Batch and Year flows are no longer used
 * - /semester: Semester selection (1st Sem, 2nd Sem, etc.)
 * - [REMOVED] Year-based subject flow
 * - /semester-subjects/:semesterId: Subject selection for semester-based programs
 * - [REMOVED] Year-based material selection
 * - /semester-materials/:semesterId/:subjectId: Material selection for semester-based programs
 * - [REMOVED] Year-based download page
 * - /semester-download/:semesterId/:subjectId/:materialType: Download page for semester-based programs
 * - /recruitment: Job postings and opportunities
 * - /*: 404 Not Found page
 * 
 * Author: RGU Hub Development Team
 * Last Updated: 2025
 */

import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Lazy-load Vercel Analytics in production to avoid top-level await and dev issues
const AnalyticsComponent = import.meta.env.PROD
  ? React.lazy(() => import("@vercel/analytics/react").then(m => ({ default: m.Analytics })))
  : null;
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSEO } from "@/hooks/use-seo";
import { AdditionalSEOTags } from "@/components/AdditionalSEOTags";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Page Components
import Index from "./pages/Index";
import SemesterSelection from "./pages/SemesterSelection";
import SemesterSubjectSelection from "./pages/SemesterSubjectSelection";
import SemesterMaterialSelection from "./pages/SemesterMaterialSelection";
import SemesterDownloadPage from "./pages/SemesterDownloadPage";
import PyqDownloadPage from "./pages/PyqDownloadPage";
import NotFound from "./pages/NotFound";
import CourseSelection from "./pages/CourseSelection.tsx"; 
import Recruitment from "./pages/Recruitment";
import YearSelection from "./pages/YearSelection";
import YearSubjectSelection from "./pages/YearSubjectSelection";
import ComingSoonNursing from "./pages/ComingSoonNursing";

// Create TanStack Query client for API state management
const queryClient = new QueryClient();

/**
 * SEO Wrapper Component
 * 
 * Wraps page components to automatically handle SEO updates
 */
const SEOWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useSEO();
  return <>{children}</>;
};

/**
 * Main App Component
 * 
 * Sets up the application with all necessary providers and routing.
 * Uses React Router for navigation and TanStack Query for API state management.
 */
const router = createBrowserRouter([
  { path: '/', element: <SEOWrapper><Index /></SEOWrapper> },
  { path: '/course', element: <SEOWrapper><CourseSelection /></SEOWrapper> },
  { path: '/year', element: <SEOWrapper><YearSelection /></SEOWrapper> },
  { path: '/year-subjects/:yearId', element: <SEOWrapper><YearSubjectSelection /></SEOWrapper> },
  { path: '/semester', element: <SEOWrapper><SemesterSelection /></SEOWrapper> },
  { path: '/semester-subjects/:semesterId', element: <SEOWrapper><SemesterSubjectSelection /></SEOWrapper> },
  { path: '/pyq-download/:semesterId/:subjectId', element: <SEOWrapper><PyqDownloadPage /></SEOWrapper> },
  { path: '/semester-materials/:semesterId/:subjectId', element: <SEOWrapper><SemesterMaterialSelection /></SEOWrapper> },
  { path: '/semester-download/:semesterId/:subjectId/:materialType', element: <SEOWrapper><SemesterDownloadPage /></SEOWrapper> },
  { path: '/recruitment', element: <SEOWrapper><Recruitment /></SEOWrapper> },
  { path: '/coming-soon-nursing', element: <SEOWrapper><ComingSoonNursing /></SEOWrapper> },
  { path: '*', element: <SEOWrapper><NotFound /></SEOWrapper> },
], { future: { v7_relativeSplatPath: true, v7_startTransition: true } });

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdditionalSEOTags />
      <Toaster />
      <Sonner />
      <RouterProvider router={router} />
      {AnalyticsComponent ? (
        <Suspense fallback={null}>
          <AnalyticsComponent />
        </Suspense>
      ) : null}
      <SpeedInsights />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
