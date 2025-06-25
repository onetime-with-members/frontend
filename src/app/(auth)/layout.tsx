import { auth } from '@/lib/auth-action';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await auth())) {
    redirect('/login');
  }

  return children;
}
