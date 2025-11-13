'use client';

import useSignOutCookieClear from '@/features/auth/hooks/useSignOutCookieClear/useSignOutCookieClear';
import usePolicyEditRedirect from '@/features/set-up/hooks/usePolicyEditRedirect';
import useUserSetUp from '@/features/set-up/hooks/useUserSetUp';

export default function SetUpProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useUserSetUp();
  usePolicyEditRedirect();
  useSignOutCookieClear();

  return children;
}
