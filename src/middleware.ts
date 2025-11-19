import { routing } from './i18n/routing';
import { auth } from './lib/auth';
import createMiddleware from 'next-intl/middleware';
import { getLocale } from 'next-intl/server';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const localePath = `/${await getLocale()}`;

  if (pathname === localePath) {
    const { isLoggedIn } = await auth();

    const targetPath = isLoggedIn ? '/dashboard' : '/landing';

    return NextResponse.redirect(
      new URL(`${localePath}${targetPath}`, request.url),
    );
  }

  const handleI18nRouting = createMiddleware(routing);
  const response = handleI18nRouting(request);

  response.headers.set('x-pathname', pathname);

  return response;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
