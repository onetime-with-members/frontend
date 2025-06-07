import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';

import { Session } from './lib/auth';
import { SERVER_API_URL } from './lib/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set('x-pathname', request.nextUrl.pathname);

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
    console.error(await res.json());
    response.cookies.delete('session');
    response.cookies.delete('access-token');
    response.cookies.delete('refresh-token');
    return response;
  }
  const data = await res.json();
  const { access_token: accessToken, refresh_token: refreshToken } =
    data.payload;

  response.cookies.set(
    'session',
    JSON.stringify({
      accessToken,
      refreshToken,
    } satisfies Session),
    {
      expires: dayjs().add(1, 'month').toDate(),
    },
  );

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
