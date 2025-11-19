import { routing } from './i18n/routing';
import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const handleI18nRouting = createMiddleware(routing);
  const response = handleI18nRouting(request);

  response.headers.set('x-pathname', pathname);

  return response;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
