import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const isLoggedIn = !!(await cookies()).get('access-token');

  if (!isLoggedIn) {
    redirect('/login');
  }

  return children;
}
