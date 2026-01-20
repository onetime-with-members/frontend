import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(_, config) {
      config.env.apiUrl = process.env.SERVER_API_URL;
      config.env.shortUrl = process.env.NEXT_PUBLIC_SHORT_URL_DOMAIN;
      config.env.authSecretKey = process.env.TEST_AUTH_SECRET_KEY;
      config.env.expiredToken = process.env.EXPIRED_TEST_ACCESS_TOKEN;

      return config;
    },
  },
  retries: {
    openMode: 0,
    runMode: 1,
  },
});
