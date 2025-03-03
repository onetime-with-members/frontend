import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  let locale = 'en';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: 'UTC',
  };
});
