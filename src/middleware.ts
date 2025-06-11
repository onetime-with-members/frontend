import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';

import { Session } from './lib/auth';
import { SERVER_API_URL } from './lib/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const redirectResponse = NextResponse.redirect(request.nextUrl);

  response.headers.set('x-pathname', request.nextUrl.pathname);
  redirectResponse.headers.set('x-pathname', request.nextUrl.pathname);

  const sessionCookie = request.cookies.get('session')?.value;
  if (!sessionCookie) return response;
  const session: Session = JSON.parse(sessionCookie);

  const decodedAccessToken = jwt.decode(session.accessToken) as { exp: number };
  if (dayjs().isBefore(dayjs(decodedAccessToken.exp * 1000), 'second')) {
    return response;
  }

  const res = await fetch(`${SERVER_API_URL}/tokens/action-reissue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify({
      refresh_token: session.refreshToken,
    }),
  });
  if (!res.ok) {
    const error = await res.json();
    if (error.code === 'TOKEN-009') {
      return response;
    }
    redirectResponse.cookies.delete('session');
    redirectResponse.cookies.delete('access-token');
    redirectResponse.cookies.delete('refresh-token');
    return redirectResponse;
  }
  const data = await res.json();
  const { access_token: accessToken, refresh_token: refreshToken } =
    data.payload;

  redirectResponse.cookies.set(
    'session',
    JSON.stringify({
      accessToken,
      refreshToken,
    } satisfies Session),
    {
      expires: dayjs().add(1, 'month').toDate(),
    },
  );

  return redirectResponse;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
