import { hasSignOutCookie } from '@/features/auth/lib/sign-out-cookie';
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

  if (await hasSignOutCookie()) {
    redirect({ href: '/', locale });
  }

  const { isLoggedIn } = await auth();

  if (!isLoggedIn) {
    redirect({ href: '/login', locale });
  }

  return children;
}
