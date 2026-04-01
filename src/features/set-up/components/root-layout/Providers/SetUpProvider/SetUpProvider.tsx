'use client';

import useDeleteRedirectUrlCookieAfterLogin from '@/features/auth/hooks/useDeleteRedirectUrlCookieAfterLogin';
import useSignOutWhenTokenEvent from '@/features/auth/hooks/useSignOutWhenTokenEvent';
import usePolicyEditRedirect from '@/features/user/hooks/usePolicyEditRedirect';
import useSetUpCookieWithUserData from '@/features/user/hooks/useSetUpCookieWithUserData';

export default function SetUpProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useDeleteRedirectUrlCookieAfterLogin();
  useSignOutWhenTokenEvent();

  useSetUpCookieWithUserData();
  usePolicyEditRedirect();

  return children;
}
