import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@hanlogy/react-web-ui': resolve(__dirname, './lib/index.ts'),
    },
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'ReactUI',
      // only esm output, do not need cjs.
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      // More explanation see:
      // https://vite.dev/guide/build#library-mode
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        '@hanlogy/ts-lib',
      ],
      output: {
        preserveModules: true,
        entryFileNames: '[name].js',
        // https://rollupjs.org/configuration-options/#output-banner-output-footer
        banner: (chunk) => {
          const hasUseClient = Object.keys(chunk.modules).some((id) => {
            const code = chunk.modules[id].code;
            return (
              code?.includes('"use client"') || code?.includes("'use client'")
            );
          });

          return hasUseClient ? '"use client";\n' : '';
        },
      },
    },
    sourcemap: true,
  },
});
