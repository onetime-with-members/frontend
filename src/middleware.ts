import { auth } from './lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
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
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
