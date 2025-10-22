/**
 * SEO Utility Functions for RGU Hub
 * 
 * This module provides utilities for managing SEO meta tags, structured data,
 * and other SEO-related functionality across the application.
 * 
 * Features:
 * - Dynamic meta tag management
 * - Structured data generation
 * - Canonical URL handling
 * - Social media meta tags
 * 
 * Author: RGU Hub Development Team
 * Last Updated: 2025
 */

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCard?: string;
  structuredData?: Record<string, unknown>;
}

export interface PageSEOConfig {
  [key: string]: SEOData;
}

// Base SEO configuration for the site
const BASE_SEO: SEOData = {
  title: "RGU Hub - RGUHS Notes, PYQ, Question Papers for Nursing & Physiotherapy",
  description: "RGU Hub (RGUHS) notes, PYQ, previous year question papers, and study materials for Nursing and Physiotherapy students under Rajiv Gandhi University of Health Sciences (Karnataka).",
  keywords: [
    "rgu notes", "rgu pyq", "rgu previous year question paper", "rgu question papers",
    "rajiv gandhi university of health sciences notes", "rguhs notes", "rguhs pyq",
    "nursing notes", "physiotherapy notes", "physio notes", "rguhub", "rgu hub",
    "bsc nursing study materials", "bsc physiotherapy study materials", "rgu syllabus",
    "nursing question bank", "physiotherapy question bank", "clinical resources"
  ],
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  ogType: "website",
  ogImage: "https://www.rguhub.site/logo.png",
  twitterCard: "summary_large_image",
  twitterImage: "https://www.rguhub.site/logo.png"
};

// Page-specific SEO configurations
export const PAGE_SEO_CONFIG: PageSEOConfig = {
  // Homepage
  "/": {
    ...BASE_SEO,
    title: "RGU Hub - RGUHS Notes, PYQ, Question Papers for Nursing & Physiotherapy",
    description: "RGU Hub (RGUHS) notes, PYQ, previous year question papers, and study materials for Nursing and Physiotherapy students under Rajiv Gandhi University of Health Sciences (Karnataka).",
    canonical: "https://www.rguhub.site/",
    ogTitle: "RGU Hub - RGUHS Notes & PYQ",
    ogDescription: "RGUHS notes, PYQ, and study materials for Nursing & Physiotherapy students.",
    twitterTitle: "RGU Hub - RGUHS Notes & PYQ",
    twitterDescription: "RGUHS notes, PYQ, question papers, and study materials for Nursing & Physiotherapy."
  },

  // Course Selection
  "/course": {
    ...BASE_SEO,
    title: "Course Selection - RGU Hub | BSC Nursing & Physiotherapy Study Materials",
    description: "Select your course (BSC Nursing or BSC Physiotherapy) to access semester-wise study materials, notes, PYQs, and question banks from RGUHS.",
    canonical: "https://www.rguhub.site/course",
    ogTitle: "Course Selection - RGU Hub",
    ogDescription: "Choose between BSC Nursing and BSC Physiotherapy to access your study materials.",
    twitterTitle: "Course Selection - RGU Hub",
    twitterDescription: "Select your course to access RGUHS study materials, notes, and PYQs."
  },

  // Semester Selection
  "/semester": {
    ...BASE_SEO,
    title: "Semester Selection - RGU Hub | BSC Nursing Study Materials by Semester",
    description: "Select your semester (1st to 8th) to access BSC Nursing study materials, notes, PYQs, and question banks organized by semester from RGUHS.",
    canonical: "https://www.rguhub.site/semester",
    ogTitle: "Semester Selection - RGU Hub",
    ogDescription: "Choose your semester to access BSC Nursing study materials.",
    twitterTitle: "Semester Selection - RGU Hub",
    twitterDescription: "Select your semester for BSC Nursing study materials and PYQs."
  },

  // Year Selection (for Physiotherapy)
  "/year": {
    ...BASE_SEO,
    title: "Year Selection - RGU Hub | BSC Physiotherapy Study Materials by Year",
    description: "Select your academic year to access BSC Physiotherapy study materials, notes, PYQs, and question banks organized by year from RGUHS.",
    canonical: "https://www.rguhub.site/year",
    ogTitle: "Year Selection - RGU Hub",
    ogDescription: "Choose your academic year to access BSC Physiotherapy study materials.",
    twitterTitle: "Year Selection - RGU Hub",
    twitterDescription: "Select your year for BSC Physiotherapy study materials and PYQs."
  },

  // Recruitment
  "/recruitment": {
    ...BASE_SEO,
    title: "Recruitment Portal - RGU Hub | Job Opportunities for Nursing & Physiotherapy",
    description: "Find placement opportunities, internships, and job openings for BSC Nursing and BSC Physiotherapy graduates from RGUHS. Browse active recruitment opportunities.",
    canonical: "https://www.rguhub.site/recruitment",
    ogTitle: "Recruitment Portal - RGU Hub",
    ogDescription: "Job opportunities and placements for Nursing & Physiotherapy graduates.",
    twitterTitle: "Recruitment Portal - RGU Hub",
    twitterDescription: "Find job opportunities for BSC Nursing and Physiotherapy graduates."
  },

  // 404 Page
  "/404": {
    ...BASE_SEO,
    title: "Page Not Found - RGU Hub",
    description: "The page you're looking for doesn't exist. Return to RGU Hub homepage to access study materials, notes, and PYQs for Nursing and Physiotherapy.",
    canonical: "https://www.rguhub.site/404",
    robots: "noindex, nofollow",
    ogTitle: "Page Not Found - RGU Hub",
    ogDescription: "The requested page doesn't exist. Return to RGU Hub homepage.",
    twitterTitle: "Page Not Found - RGU Hub",
    twitterDescription: "Page not found. Return to RGU Hub for study materials."
  }
};

/**
 * Generate dynamic SEO data for semester-based pages
 */
export function generateSemesterSubjectSEO(semesterId: string, subjectName?: string): SEOData {
  const semesterNumber = parseInt(semesterId);
  const semesterText = `${semesterNumber}${getOrdinalSuffix(semesterNumber)} Semester`;
  
  return {
    ...BASE_SEO,
    title: `${semesterText} Subjects - RGU Hub | ${subjectName || 'Study Materials'}`,
    description: `Access ${semesterText} subjects and study materials for BSC Nursing. Download notes, PYQs, question banks, and syllabus for ${subjectName || 'all subjects'} from RGUHS.`,
    canonical: `https://www.rguhub.site/semester-subjects/${semesterId}`,
    ogTitle: `${semesterText} Subjects - RGU Hub`,
    ogDescription: `Study materials and resources for ${semesterText} BSC Nursing subjects.`,
    twitterTitle: `${semesterText} Subjects - RGU Hub`,
    twitterDescription: `Access ${semesterText} study materials, notes, and PYQs.`
  };
}

/**
 * Generate dynamic SEO data for material selection pages
 */
export function generateMaterialSelectionSEO(semesterId: string, subjectId: string, subjectName?: string): SEOData {
  const semesterNumber = parseInt(semesterId);
  const semesterText = `${semesterNumber}${getOrdinalSuffix(semesterNumber)} Semester`;
  
  return {
    ...BASE_SEO,
    title: `${subjectName || 'Subject'} Materials - ${semesterText} | RGU Hub`,
    description: `Download study materials for ${subjectName || 'this subject'} in ${semesterText}. Access notes, PYQs, question banks, syllabus, and practical resources from RGUHS.`,
    canonical: `https://www.rguhub.site/semester-materials/${semesterId}/${subjectId}`,
    ogTitle: `${subjectName || 'Subject'} Materials - RGU Hub`,
    ogDescription: `Study materials for ${subjectName || 'this subject'} in ${semesterText}.`,
    twitterTitle: `${subjectName || 'Subject'} Materials - RGU Hub`,
    twitterDescription: `Download notes, PYQs, and study materials for ${subjectName || 'this subject'}.`
  };
}

/**
 * Generate dynamic SEO data for download pages
 */
export function generateDownloadPageSEO(semesterId: string, subjectId: string, materialType: string, subjectName?: string): SEOData {
  const semesterNumber = parseInt(semesterId);
  const semesterText = `${semesterNumber}${getOrdinalSuffix(semesterNumber)} Semester`;
  const materialTypeFormatted = materialType.charAt(0).toUpperCase() + materialType.slice(1).replace('-', ' ');
  
  return {
    ...BASE_SEO,
    title: `${materialTypeFormatted} Download - ${subjectName || 'Subject'} | ${semesterText} | RGU Hub`,
    description: `Download ${materialTypeFormatted.toLowerCase()} for ${subjectName || 'this subject'} in ${semesterText}. Free study materials from RGUHS for BSC Nursing students.`,
    canonical: `https://www.rguhub.site/semester-download/${semesterId}/${subjectId}/${materialType}`,
    ogTitle: `${materialTypeFormatted} Download - RGU Hub`,
    ogDescription: `Download ${materialTypeFormatted.toLowerCase()} for ${subjectName || 'this subject'} in ${semesterText}.`,
    twitterTitle: `${materialTypeFormatted} Download - RGU Hub`,
    twitterDescription: `Free ${materialTypeFormatted.toLowerCase()} download for ${subjectName || 'this subject'}.`
  };
}

/**
 * Generate dynamic SEO data for PYQ download pages
 */
export function generatePYQDownloadSEO(semesterId: string, subjectId: string, subjectName?: string): SEOData {
  const semesterNumber = parseInt(semesterId);
  const semesterText = `${semesterNumber}${getOrdinalSuffix(semesterNumber)} Semester`;
  
  return {
    ...BASE_SEO,
    title: `PYQ Download - ${subjectName || 'Subject'} | ${semesterText} | RGU Hub`,
    description: `Download Previous Year Question Papers (PYQ) for ${subjectName || 'this subject'} in ${semesterText}. Free PYQ papers from RGUHS for BSC Nursing students.`,
    canonical: `https://www.rguhub.site/pyq-download/${semesterId}/${subjectId}`,
    ogTitle: `PYQ Download - ${subjectName || 'Subject'} | RGU Hub`,
    ogDescription: `Download Previous Year Question Papers for ${subjectName || 'this subject'} in ${semesterText}.`,
    twitterTitle: `PYQ Download - ${subjectName || 'Subject'} | RGU Hub`,
    twitterDescription: `Free PYQ papers download for ${subjectName || 'this subject'}.`
  };
}

/**
 * Generate dynamic SEO data for year-based pages
 */
export function generateYearSubjectSEO(yearId: string, subjectName?: string): SEOData {
  const yearNumber = parseInt(yearId);
  const yearText = `${yearNumber}${getOrdinalSuffix(yearNumber)} Year`;
  
  return {
    ...BASE_SEO,
    title: `${yearText} Subjects - RGU Hub | ${subjectName || 'BSC Physiotherapy Study Materials'}`,
    description: `Access ${yearText} subjects and study materials for BSC Physiotherapy. Download notes, PYQs, question banks, and syllabus for ${subjectName || 'all subjects'} from RGUHS.`,
    canonical: `https://www.rguhub.site/year-subjects/${yearId}`,
    ogTitle: `${yearText} Subjects - RGU Hub`,
    ogDescription: `Study materials and resources for ${yearText} BSC Physiotherapy subjects.`,
    twitterTitle: `${yearText} Subjects - RGU Hub`,
    twitterDescription: `Access ${yearText} study materials, notes, and PYQs for Physiotherapy.`
  };
}

/**
 * Get ordinal suffix for numbers (1st, 2nd, 3rd, etc.)
 */
function getOrdinalSuffix(num: number): string {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
}

/**
 * Update document head with SEO data
 */
export function updateDocumentHead(seoData: SEOData): void {
  // Update title
  document.title = seoData.title;

  // Update or create meta description
  updateMetaTag('name', 'description', seoData.description);

  // Update or create keywords
  if (seoData.keywords) {
    updateMetaTag('name', 'keywords', seoData.keywords.join(', '));
  }

  // Update or create robots meta tag
  if (seoData.robots) {
    updateMetaTag('name', 'robots', seoData.robots);
  }

  // Update canonical URL
  if (seoData.canonical) {
    updateCanonicalLink(seoData.canonical);
  }

  // Update Open Graph tags
  if (seoData.ogTitle) {
    updateMetaTag('property', 'og:title', seoData.ogTitle);
  }
  if (seoData.ogDescription) {
    updateMetaTag('property', 'og:description', seoData.ogDescription);
  }
  if (seoData.ogImage) {
    updateMetaTag('property', 'og:image', seoData.ogImage);
  }
  if (seoData.ogType) {
    updateMetaTag('property', 'og:type', seoData.ogType);
  }

  // Update Twitter Card tags
  if (seoData.twitterTitle) {
    updateMetaTag('name', 'twitter:title', seoData.twitterTitle);
  }
  if (seoData.twitterDescription) {
    updateMetaTag('name', 'twitter:description', seoData.twitterDescription);
  }
  if (seoData.twitterImage) {
    updateMetaTag('name', 'twitter:image', seoData.twitterImage);
  }
  if (seoData.twitterCard) {
    updateMetaTag('name', 'twitter:card', seoData.twitterCard);
  }

  // Update structured data
  if (seoData.structuredData) {
    updateStructuredData(seoData.structuredData);
  }
}

/**
 * Update or create a meta tag
 */
function updateMetaTag(attribute: string, value: string, content: string): void {
  let metaTag = document.querySelector(`meta[${attribute}="${value}"]`) as HTMLMetaElement;
  
  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute(attribute, value);
    document.head.appendChild(metaTag);
  }
  
  metaTag.setAttribute('content', content);
}

/**
 * Update canonical link
 */
function updateCanonicalLink(href: string): void {
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  
  canonicalLink.href = href;
}

/**
 * Update structured data
 */
function updateStructuredData(data: Record<string, unknown>): void {
  let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
  
  if (!scriptTag) {
    scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    document.head.appendChild(scriptTag);
  }
  
  scriptTag.textContent = JSON.stringify(data);
}

/**
 * Get SEO data for a given path
 */
export function getSEOData(path: string): SEOData {
  // Remove query parameters and hash
  const cleanPath = path.split('?')[0].split('#')[0];
  
  // Check for exact match first
  if (PAGE_SEO_CONFIG[cleanPath]) {
    return PAGE_SEO_CONFIG[cleanPath];
  }
  
  // Check for dynamic routes
  if (cleanPath.startsWith('/semester-subjects/')) {
    const semesterId = cleanPath.split('/')[2];
    return generateSemesterSubjectSEO(semesterId);
  }
  
  if (cleanPath.startsWith('/semester-materials/')) {
    const parts = cleanPath.split('/');
    const semesterId = parts[2];
    const subjectId = parts[3];
    return generateMaterialSelectionSEO(semesterId, subjectId);
  }
  
  if (cleanPath.startsWith('/semester-download/')) {
    const parts = cleanPath.split('/');
    const semesterId = parts[2];
    const subjectId = parts[3];
    const materialType = parts[4];
    return generateDownloadPageSEO(semesterId, subjectId, materialType);
  }
  
  if (cleanPath.startsWith('/pyq-download/')) {
    const parts = cleanPath.split('/');
    const semesterId = parts[2];
    const subjectId = parts[3];
    return generatePYQDownloadSEO(semesterId, subjectId);
  }
  
  if (cleanPath.startsWith('/year-subjects/')) {
    const yearId = cleanPath.split('/')[2];
    return generateYearSubjectSEO(yearId);
  }
  
  // Default to homepage SEO
  return PAGE_SEO_CONFIG['/'];
}
