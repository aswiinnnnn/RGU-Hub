import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    strictPort: false, // If 8080 is taken, try next available port
    open: false, // Don't auto-open browser
    proxy: {
      // Proxy API calls in development to avoid CORS
      // Proxies /api/* requests to the Render backend
      '/api': {
        target: 'https://rgu-hub-backend.onrender.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, res) => {
            console.log('Proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Proxying:', req.method, req.url, '->', proxyReq.path);
          });
        },
      },
    },
  },
  plugins: [
    react(),
  ],
  // Use root base in development to avoid 404s locally; use subpath in prod
  base: mode === 'development' ? '/' : (process.env.VITE_BASE_PATH || '/rgu-hub'),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
