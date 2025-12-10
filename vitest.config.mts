import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: 'vitest.setup.ts',
    server: {
      deps: {
        inline: ['next-intl'],
      },
    },
    globals: true,
  },
});
