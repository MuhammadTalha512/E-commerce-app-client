import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', 
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 2000, 
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          antd: ['antd', '@ant-design/v5-patch-for-react-19'],
          bootstrap: ['bootstrap'],
          swiper: ['swiper'],
          vendors: [
            'axios',
            'dayjs',
            'react-icons',
            'aos',
            'recharts',
            'react-slick',
            'slick-carousel'
          ]
        }
      }
    }
  }
});
