import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    hmr: false,
    allowedHosts: [
      '164.92.137.136.sslip.io',
      '.sslip.io'
    ],
    watch: {
      usePolling: true,
    },
  },
});