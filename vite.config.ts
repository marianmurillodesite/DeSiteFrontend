import { defineConfig } from 'vite'
import {fileURLToPath , URL} from 'node:url'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Define scr to @ in the all url 
  resolve: {
      alias:{
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
  },
  build: {
    rollupOptions: {
      external: []
    }
  }
})
