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
const isProd = (import.meta as any).env?.PROD === true || (import.meta as any).env?.MODE === 'production';
// In development, use a relative /api base and let Vite proxy forward to Django.
// This avoids CORS and HTTPS vs HTTP mismatches entirely.
const DEFAULT_DEV_URL = '/api';
const candidate = (import.meta as any).env?.VITE_API_BASE_URL ?? (isProd ? undefined : DEFAULT_DEV_URL);

if (isProd && !candidate) {
  throw new Error('VITE_API_BASE_URL is required in production');
}

let normalized: string;
try {
  const u = new URL(candidate as string);
  if (isProd && u.protocol !== 'https:') {
    throw new Error('API base URL must use HTTPS in production');
  }
  if (isProd && (u.hostname === 'localhost' || u.hostname === '127.0.0.1')) {
    throw new Error('Localhost API is not allowed in production');
  }
  if (!isProd) {
    // If using relative /api, keep as-is
    if ((candidate as string).startsWith('/')) {
      normalized = candidate as string;
    } else if ((u.hostname === 'localhost' || u.hostname === '127.0.0.1') && u.protocol === 'https:') {
      // Prevent accidental https to localhost which causes SSL errors
      normalized = `http://${u.host}`;
    } else {
      normalized = u.origin.replace(/\/$/, '');
    }
  } else {
    normalized = u.origin.replace(/\/$/, '');
  }
} catch {
  throw new Error('Invalid VITE_API_BASE_URL');
}

export const API_BASE_URL = normalized;