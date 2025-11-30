import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(_, config) {
      config.env.apiUrl = process.env.SERVER_API_URL;
      config.env.token = process.env.TEST_ACCESS_TOKEN;
      config.env.expiredToken = process.env.EXPIRED_TEST_ACCESS_TOKEN;

      return config;
    },
  },
  retries: {
    openMode: 0,
    runMode: 1,
  },
});
