import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import eslint from 'vite-plugin-eslint';

// export default defineConfig({
//   plugins: [react(), eslint()],
//   resolve: {
//     alias: {
//       '@': '/src',
//     },
//   },

// });

export default defineConfig({
  plugins: [react()],
  build:{
    outDir: "build"
  }
})
