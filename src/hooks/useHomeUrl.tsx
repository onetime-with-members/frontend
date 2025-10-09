'use client';

import { useAuth } from '@/lib/auth/auth.client';

export default function useHomeUrl() {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? '/dashboard' : '/landing';
}
