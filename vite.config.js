import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // opcional si querés exponer en tu red local, pero no necesario para ngrok
    port: 5175, // puerto que querés usar
  },
})
