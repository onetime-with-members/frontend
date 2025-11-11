import { hasSignOutCookie } from '@/features/auth/lib/sign-out-cookie';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (await hasSignOutCookie()) {
    redirect('/');
  }

  const { isLoggedIn } = await auth();

  if (!isLoggedIn) {
    redirect('/login');
  }

  return children;
}
