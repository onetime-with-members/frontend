import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  if (!(await auth())) {
    redirect('/login');
  }

  return children;
}
