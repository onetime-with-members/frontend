import LandingPage from '@/features/home/pages/LandingPage';
import { redirect } from '@/i18n/navigation';
import { auth } from '@/lib/auth';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const { isLoggedIn } = await auth();

  if (isLoggedIn) {
    redirect({ href: '/dashboard', locale });
  }

  return <LandingPage />;
}
