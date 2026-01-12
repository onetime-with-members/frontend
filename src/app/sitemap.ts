import { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_DOMAIN 

  const eventRoutes = [
    '/ko/events/new',
    '/ko/events/view/team-meeting',
    '/ko/events/view/business-one-on-one',
    '/ko/events/view/social-gatherings',
  ];

  const routes: MetadataRoute.Sitemap = [];

  routing.locales.forEach((locale) => {
    eventRoutes.forEach((route) => {
      const localizedRoute = route.replace(/^\/ko\//, `/${locale}/`);
      const fullUrl = `${baseUrl}${localizedRoute}`;
      
      routes.push({
        url: fullUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => {
              const altRoute = route.replace(/^\/ko\//, `/${loc}/`);
              return [loc, `${baseUrl}${altRoute}`];
            }),
          ),
        },
      });
    });
  });

  return routes;
}
