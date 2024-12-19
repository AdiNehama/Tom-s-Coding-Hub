import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // יפתח את הדפדפן אוטומטית
  },
  build: {
    outDir: 'frontend/dist', // תיקיית יציאה
    sourcemap: true, // הפעלת Source Maps
  },
});
