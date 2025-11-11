'use client';

import usePolicyEditRedirect from '@/features/set-up/hooks/usePolicyEditRedirect';
import useUserSetUp from '@/features/set-up/hooks/useUserSetUp';

export default function SetUpProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useUserSetUp();
  usePolicyEditRedirect();

  return children;
}
