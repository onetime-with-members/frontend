'use client';

import useDeleteRedirectUrlCookieAfterLogin from '@/features/auth/hooks/useDeleteRedirectUrlCookieAfterLogin';
import useSignOutCookieClear from '@/features/auth/hooks/useSignOutCookieClear/useSignOutCookieClear';
import useSignOutWhenTokenExpired from '@/features/auth/hooks/useSignOutWhenTokenExpired/useSignOutWhenTokenExpired';
import useDeleteOldLocaleCookie from '@/features/set-up/hooks/useDeleteOldLocaleCookie';
import usePolicyEditRedirect from '@/features/user/hooks/usePolicyEditRedirect';
import useSetUpCookieWithUserData from '@/features/user/hooks/useSetUpCookieWithUserData';

export default function SetUpProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useDeleteOldLocaleCookie();

  useSignOutCookieClear();
  useDeleteRedirectUrlCookieAfterLogin();
  useSignOutWhenTokenExpired();

  useSetUpCookieWithUserData();
  usePolicyEditRedirect();

  return children;
}
