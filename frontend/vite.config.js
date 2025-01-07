import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/food_recipe_finder/",
  build: {
    outDir: 'build',
  },
  server: {
    mimeTypes: {
      'text/css': ['css'],
    },
  },
  plugins: [react()],
})

