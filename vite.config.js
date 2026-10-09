import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/pse/', // 
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
    cors: true,
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
    cors: true,
  }
})
