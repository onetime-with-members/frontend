import { hasSignOutCookie } from '@/features/auth/lib/sign-out-cookie';
import getHomeUrl from '@/features/home/lib/home-url';
import { redirect } from '@/i18n/navigation';
import { auth } from '@/lib/auth';

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const homeUrl = await getHomeUrl();

  if (await hasSignOutCookie()) {
    redirect({ href: homeUrl, locale });
  }

  const { isLoggedIn } = await auth();

  if (!isLoggedIn) {
    redirect({ href: '/login', locale });
  }

  return children;
}
