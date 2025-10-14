import LandingPage from '@/features/home/pages/LandingPage';
import auth from '@/lib/auth/auth.server';
import { redirect } from 'next/navigation';

export default async function Page() {
  const { isLoggedIn } = await auth();

  if (isLoggedIn) {
    redirect('/dashboard');
  }

  return <LandingPage />;
}
