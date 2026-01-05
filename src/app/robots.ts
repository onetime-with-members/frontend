import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_DOMAIN

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard',
          '/mypage/',
          '/events/*/edit',
          '/policy/edit',
          '/withdraw',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
