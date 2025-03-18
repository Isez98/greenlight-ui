import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import deno from '@deno/vite-plugin'

import 'react'
import 'react-dom'

export default defineConfig({
  root: './client',
  server: {
    port: 3000,
    host: '0.0.0.0',
    origin: 'https://greenlight.isez.dev',
  },
  plugins: [react(), deno()],
  base: './',
  optimizeDeps: {
    include: ['react/jsx-runtime'],
  },
})
