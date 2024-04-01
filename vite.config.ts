import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import pluginChecker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        pluginChecker({ typescript: true }),
    ],
    build: {
        rollupOptions: {
            // Exclure env-config.js du processus de bundling
            external: ['/env-config.js']
        }
    }
});

