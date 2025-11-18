import { routing } from './i18n/routing';
import { auth } from './lib/auth';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);

  const pathname = request.nextUrl.pathname;
  response.headers.set('x-pathname', pathname);

  const { isLoggedIn } = await auth();

  if (pathname === '/') {
    return NextResponse.redirect(
      new URL(isLoggedIn ? '/dashboard' : '/landing', request.url),
    );
  }

  return response;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
