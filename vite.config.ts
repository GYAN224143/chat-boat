import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://chatbot-adwance-server.netlify.app', // your Express server port
        changeOrigin: true,
        secure: false,
      },
    },
    watch: {
      ignored: ['**/tsconfig*.json'], // Ignore tsconfig changes in production
    },
  },
});
