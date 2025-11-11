import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = await auth();

  if (!isLoggedIn) {
    redirect('/login');
  }

  return children;
}
