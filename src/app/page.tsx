import auth from '@/lib/auth/auth.server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { isLoggedIn } = await auth();

  if (isLoggedIn) {
    redirect('/dashboard');
  }

  redirect('/landing');
}
