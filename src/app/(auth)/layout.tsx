import auth from '@/lib/auth/auth.server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isSignedOut = cookieStore.get('sign-out')?.value;

  if (isSignedOut) {
    redirect('/');
  }

  const { isLoggedIn } = await auth();

  if (!isLoggedIn) {
    redirect('/login');
  }

  return children;
}
