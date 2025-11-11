import { useEffect } from 'react';

import { useUserPolicyQuery } from '@/features/user/api/user.query';
import { useAuth } from '@/lib/auth';
import { useProgressRouter } from '@/navigation';
import { usePathname } from 'next/navigation';

export default function usePolicyEditRedirect() {
  const pathname = usePathname();

  const progressRouter = useProgressRouter();
  const { isLoggedIn } = useAuth();

  const { data: policy } = useUserPolicyQuery({ enabled: isLoggedIn });

  useEffect(() => {
    if (pathname.startsWith('/policy') || pathname === '/withdraw') return;
    if (!policy) return;
    if (policy.servicePolicy && policy.privacyPolicy) return;
    progressRouter.push('/policy/edit');
  }, [pathname, policy]);
}
