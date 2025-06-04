import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
//@ts-ignore
import deno from '@deno/vite-plugin'

import 'react'
import 'react-dom'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    root: './client',
    server: {
      port: 3000,
      host: '0.0.0.0',
      origin: 'https://greenlight.isez.dev',
    },
    plugins: [react(), deno()],
    base: '/',
    optimizeDeps: {
      include: ['react/jsx-runtime'],
    },
  })
}
