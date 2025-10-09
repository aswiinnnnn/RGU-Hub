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
const rawApiBaseUrl = (import.meta as any).env?.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
export const API_BASE_URL = rawApiBaseUrl.replace(/\/$/, '');
