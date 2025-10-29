import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { isLoggedIn } = await auth();

  if (isLoggedIn) {
    redirect('/dashboard');
  }

  redirect('/landing');
}
