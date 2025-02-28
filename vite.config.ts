import chromium from 'chrome-aws-lambda';
import path from 'path';
import { defineConfig } from 'vite';

import prerender from '@prerenderer/rollup-plugin';
import react from '@vitejs/plugin-react';

// chrome-aws-lambda의 Chromium 실행 파일 경로와 옵션을 비동기로 가져옴
const getPrerenderOptions = async () => {
  const executablePath = await chromium.executablePath;
  return {
    routes: [
      '/',
      '/events/new',
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
      // chrome-aws-lambda에서 제공하는 Puppeteer 실행 인자와 실행 파일 경로를 사용
      args: chromium.args,
      executablePath,
      headless: chromium.headless,
    },
    postProcess(renderedRoute: { html: string }) {
      // Vercel 배포 도메인으로 URL을 변환
      const vercelUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'https://onetime-test.vercel.app';
      renderedRoute.html = renderedRoute.html
        .replace(/http:/gi, 'https:')
        .replace(/(https:\/\/)?(localhost|127\.0\.0\.1):\d+/gi, vercelUrl);
    },
  };
};

export default defineConfig(async () => {
  const prerenderOptions = await getPrerenderOptions();
  return {
    plugins: [react(), prerender(prerenderOptions)],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
  };
});
