/**
 * RGU Hub Frontend - API Configuration
 * 
 * This module contains the API configuration for the RGU Hub frontend.
 * It defines the base URL for all API requests to the Django backend.
 * 
 * Configuration:
 * - API_BASE_URL: Base URL for all API endpoints
 * - Reads from Vite env var `VITE_API_BASE_URL` at build time
 * - Falls back to local development server during dev
 * 
 * Usage:
 * Import this constant in components that need to make API calls:
 * 
 * ```typescript
 * import { API_BASE_URL } from "@/config/api";
 * 
 * const response = await fetch(`${API_BASE_URL}/materials/`);
 * ```
 * 
 * API Endpoints:
 * - GET /materials/ - List all study materials
 * - GET /materials/?subject=slug - Filter by subject
 * - GET /materials/?type=slug - Filter by material type
 * - GET /subjects/ - List all subjects
 * - GET /subjects/?course=BSCN - Filter by program
 * - GET /recruitments/ - List job postings
 * - GET /latest-updates/ - Get recent materials and jobs
 * 
 * Author: RGU Hub Development Team
 * Last Updated: 2025
 */

/**
 * Base URL for the Django REST API backend
 * 
 * Development: http://127.0.0.1:8000
 * Production: set VITE_API_BASE_URL in .env or host settings
 */
/**
 * Base URL for the Django REST API backend
 * 
 * Development: Uses /api which is proxied by Vite to the Render backend
 * Production: Uses VITE_API_BASE_URL from environment (must be set)
 * 
 * To use a different backend in dev, set VITE_API_PROXY_TARGET in vite.config.ts
 */
const isProd = import.meta.env.PROD || import.meta.env.MODE === 'production';

// In development, use relative /api path which Vite proxies to Render backend
// This avoids CORS issues and allows local development with remote backend
const DEFAULT_DEV_URL = '/api';

// Get API URL from environment or use defaults
let apiUrl: string;
if (isProd) {
  // Production: must use absolute URL from environment
  const prodUrl = import.meta.env.VITE_API_BASE_URL;
  if (!prodUrl) {
    throw new Error('VITE_API_BASE_URL is required in production');
  }
  try {
    const url = new URL(prodUrl);
    if (url.protocol !== 'https:') {
      throw new Error('API base URL must use HTTPS in production');
    }
    apiUrl = url.origin.replace(/\/$/, '');
  } catch (error) {
    throw new Error(`Invalid VITE_API_BASE_URL: ${error instanceof Error ? error.message : 'Invalid URL'}`);
  }
} else {
  // Development: use relative path to leverage Vite proxy
  // The proxy is configured in vite.config.ts to forward to Render backend
  apiUrl = DEFAULT_DEV_URL;
}

export const API_BASE_URL = apiUrl;