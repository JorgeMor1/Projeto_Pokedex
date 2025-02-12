import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: '/src/App.jsx',  // Aqui deve estar apontando para o arquivo correto (main.js ou index.js)
    }
  }
});