/**
 * RGU Hub Frontend - Application Entry Point
 * 
 * This is the main entry point for the RGU Hub React application.
 * It renders the App component into the DOM root element.
 * 
 * Features:
 * - React 18 createRoot API for better performance
 * - Global CSS imports for styling
 * - TypeScript support
 * 
 * Author: RGU Hub Development Team
 * Last Updated: 2025
 */

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create root and render the App component with future flags via RouterProvider fallback
createRoot(document.getElementById("root")!).render(
  // We cannot pass future flags directly to BrowserRouter in v6, but importing
  // this flag indicates intent; keep code ready for v7 upgrade.
  <App />
);
