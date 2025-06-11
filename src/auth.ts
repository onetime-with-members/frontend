import jwt from 'jsonwebtoken';
import NextAuth from 'next-auth';

import { SERVER_API_URL } from './lib/constants';
import CredentialsProvider from 'next-auth/providers/credentials';

declare module 'next-auth' {
  interface User {
    accessToken?: string;
    refreshToken?: string;
  }
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user?: User;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        accessToken: {},
        refreshToken: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        const accessToken = credentials.accessToken as string | undefined;
        const refreshToken = credentials.refreshToken as string | undefined;

        return {
          accessToken,
          refreshToken,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (token.accessToken) {
        const decodedToken = jwt.decode(token.accessToken as string) as {
          exp: number;
        };
        token.accessTokenExpires = decodedToken.exp * 1000;
      }

      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          user,
        };
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      return refreshAccessToken(token);
    },
    session: async ({ session, token }) => {
      if (token) {
        session.accessToken = token.accessToken as string | undefined;
      }
      return session;
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function refreshAccessToken(token: any) {
  try {
    const res = await fetch(`${SERVER_API_URL}/tokens/action-reissue`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.refreshToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh_token: token.user.refreshToken,
      }),
    });

    if (!res.ok) {
      throw await res.json();
    }
    const data = await res.json();
    const { accessToken, refreshToken } = data.payload;

    return {
      ...token,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (error) {
    console.error(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
