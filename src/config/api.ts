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

const FALLBACK_API_URL = 'https://rgu-hub-backend.onrender.com';

const rawApiUrl =
  (import.meta as any)?.env?.VITE_API_BASE_URL?.trim() || FALLBACK_API_URL;

let normalizedApiUrl: string;
try {
  const parsed = new URL(rawApiUrl);
  if (parsed.protocol !== 'https:') {
    throw new Error('API base URL must use HTTPS');
  }
  normalizedApiUrl = parsed.origin.replace(/\/$/, '');
} catch (error) {
  throw new Error(
    `Invalid API base URL: ${error instanceof Error ? error.message : 'Invalid URL'}`
  );
}

export const API_BASE_URL = normalizedApiUrl;