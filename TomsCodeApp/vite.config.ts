import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
   plugins: [react()],
  base: '/frontend/dist/', 
  server: {
    open: true,
  },
  build: {
    outDir: 'frontend/dist', 
    sourcemap: true, // הפעלת Source Maps
  },
});
