import path from 'path';
import { defineConfig } from 'vite';

import prerender from '@prerenderer/rollup-plugin';
import react from '@vitejs/plugin-react';

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
        port: Number(process.env.PORT) || 5173,
        host: '0.0.0.0',
      },
      rendererOptions: {
        maxConcurrentRoutes: 1,
        renderAfterTime: 500,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
      postProcess(renderedRoute) {
        const vercelUrl = process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : 'https://onetime-test.vercel.app';
        renderedRoute.html = renderedRoute.html
          .replace(/http:/gi, 'https:')
          .replace(/(https:\/\/)?(localhost|127\.0\.0\.1):\d+/gi, vercelUrl);
      },
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
