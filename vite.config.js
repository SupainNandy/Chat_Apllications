import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  envPrefix: ['VITE_', 'FIREBASE_', 'SERVER_'],
  plugins: [
    tailwindcss(),  
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
