import { auth } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = await auth();

  const cookieStore = await cookies();
  const isSignedOut = cookieStore.get('sign-out')?.value;

  if (isSignedOut) {
    redirect('/');
  }

  if (!isLoggedIn) {
    redirect('/login');
  }

  return children;
}
