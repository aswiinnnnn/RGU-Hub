/**
 * SEO Hook for RGU Hub
 * 
 * This hook provides a convenient way to manage SEO meta tags
 * and structured data in React components.
 * 
 * Features:
 * - Automatic SEO updates on route changes
 * - Dynamic SEO data generation
 * - Cleanup on component unmount
 * 
 * Author: RGU Hub Development Team
 * Last Updated: 2025
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSEOData, updateDocumentHead, SEOData } from '../lib/seo';

/**
 * Hook to manage SEO for the current page
 * 
 * @param customSEO - Optional custom SEO data to override defaults
 */
export function useSEO(customSEO?: Partial<SEOData>) {
  const location = useLocation();

  useEffect(() => {
    // Get base SEO data for the current path
    const baseSEO = getSEOData(location.pathname);
    
    // Merge with custom SEO data if provided
    const finalSEO = { ...baseSEO, ...customSEO };
    
    // Update document head
    updateDocumentHead(finalSEO);
    
    // Cleanup function (optional - could restore previous values)
    return () => {
      // In a real app, you might want to restore previous SEO values
      // For now, we'll just ensure the title is updated
      document.title = 'RGU Hub - RGUHS Notes, PYQ, Question Papers for Nursing & Physiotherapy';
    };
  }, [location.pathname, customSEO]);
}

/**
 * Hook to manage SEO with dynamic data
 * 
 * @param seoData - Complete SEO data object
 */
export function useCustomSEO(seoData: SEOData) {
  useEffect(() => {
    updateDocumentHead(seoData);
    
    return () => {
      // Restore default title
      document.title = 'RGU Hub - RGUHS Notes, PYQ, Question Papers for Nursing & Physiotherapy';
    };
  }, [seoData]);
}
