import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

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
          const facadeModuleId = chunk.facadeModuleId;
          if (!facadeModuleId) {
            return '';
          }

          // NOTE:
          // There might be better ways for example create a custom plugin, or
          // even there is a built-in way to preserve directives. Will do more
          // research later.
          const code = fs.readFileSync(facadeModuleId, 'utf8');
          const firstLine = code.trim().split('\n', 1)[0];
          if (!firstLine) {
            return '';
          }

          const directives = ['use client'];

          for (const directive of directives) {
            if (
              firstLine.includes(`"${directive}"`) ||
              firstLine.includes(`'${directive}'`)
            ) {
              return `'${directive}'\n`;
            }
          }

          return '';
        },
      },
    },
    sourcemap: true,
  },
});
