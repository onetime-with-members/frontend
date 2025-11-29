'use client';

import useClearCookieAfterLogin from '@/features/auth/hooks/useClearCookieAfterLogin';
import useSignOutCookieClear from '@/features/auth/hooks/useSignOutCookieClear/useSignOutCookieClear';
import useDeleteOldLocaleCookie from '@/features/set-up/hooks/useDeleteOldLocaleCookie';
import usePolicyEditRedirect from '@/features/set-up/hooks/usePolicyEditRedirect';
import useSetUpCookieWithUserData from '@/features/set-up/hooks/useSetUpCookieWithUserData';

export default function SetUpProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useSetUpCookieWithUserData();
  usePolicyEditRedirect();
  useSignOutCookieClear();
  useDeleteOldLocaleCookie();
  useClearCookieAfterLogin();

  return children;
}
