import type { NextConfig } from 'next';

import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'onetime-bucket.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
const nextConfigWithNextIntl = withNextIntl(nextConfig);
delete nextConfigWithNextIntl.experimental?.turbo;

export default nextConfigWithNextIntl;
