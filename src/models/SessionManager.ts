import { Session } from '.';
import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

import dayjs from '../lib/dayjs';
import { SERVER_API_URL } from '@/lib/constants';

class SessionManager {
  private accessToken = '';
  private refreshToken = '';

  private _isLoggedIn = false;

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  async init() {
    const sessionCookie = await getCookie('session');
    if (sessionCookie) {
      const session: Session = JSON.parse(sessionCookie as string);

      this.accessToken = session.accessToken;
      this.refreshToken = session.refreshToken;

      this._isLoggedIn = true;
    }
  }

  async get() {
    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    } satisfies Session;
  }

  async set({ accessToken, refreshToken }: Session) {
    await setCookie(
      'session',
      JSON.stringify({
        accessToken,
        refreshToken,
      } satisfies Session),
      { expires: dayjs().add(1, 'month').toDate() },
    );

    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    this._isLoggedIn = true;
  }

  async reissue() {
    const res = await axios.post(
      `${SERVER_API_URL}/tokens/action-reissue`,
      { refresh_token: this.refreshToken },
      { headers: { Authorization: `Bearer ${this.accessToken}` } },
    );
    const { access_token: newAccessToken, refresh_token: newRefreshToken } =
      res.data.payload;

    this.set({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async remove() {
    await deleteCookie('session');
    window.location.reload();

    this.accessToken = '';
    this.refreshToken = '';
  }
}

export const sessionManager = new SessionManager();
await sessionManager.init();
