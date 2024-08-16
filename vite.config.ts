// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build:{
    rollupOptions: {
      input: {
        main: '/src/main.tsx',
        ssr: '/src/entry-server.tsx'
      },
    },
  },
  ssr: {
    noExternal: ['react-router-dom']
  }
})
