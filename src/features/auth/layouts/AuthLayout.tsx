'use client';

import { useEffect } from 'react';

import { useAuth } from '../lib/auth.client';
import {
  deleteSignOutSession,
  hasSignOutSession,
} from '../lib/sign-out-session';
import { useRouter } from '@/i18n/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (hasSignOutSession()) {
      router.replace('/landing');
      deleteSignOutSession();
    } else if (!isLoggedIn) {
      router.replace('/login');
    }
  }, [isLoggedIn, router]);

  return children;
}
