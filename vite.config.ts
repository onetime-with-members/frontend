import path from 'path';
import { defineConfig } from 'vite';

import prerender from '@prerenderer/rollup-plugin';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: [
        '/',
        '/event/new',
        '/policy/privacy',
        '/policy/service',
        '/login',
      ],
      renderer: '@prerenderer/renderer-puppeteer',
      server: {
        port: 5173,
        host: 'localhost',
      },
      rendererOptions: {
        maxConcurrentRoutes: 1,
        renderAfterTime: 500,
      },
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html
          .replace(/http:/i, 'https:')
          .replace(
            /(https:\/\/)?(localhost|127\.0\.0\.1):\d*/i,
            'https://onetime-test.vercel.app/',
          );
      },
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
