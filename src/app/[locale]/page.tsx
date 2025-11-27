import { redirect } from '@/i18n/navigation';
import { auth } from '@/lib/auth';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const { isLoggedIn } = await auth();

  if (isLoggedIn) {
    redirect({
      href: '/dashboard',
      locale,
    });
  }

  redirect({ href: '/landing', locale });
}
