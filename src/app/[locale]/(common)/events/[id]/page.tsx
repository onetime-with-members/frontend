import { Locale } from 'next-intl';

import { redirect } from '@/i18n/navigation';
import { RedirectType } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; locale: Locale }>;
}) {
  const { id: eventId, locale } = await params;

  redirect(
    { href: `/events/dashboard/${eventId}`, locale },
    RedirectType.replace,
  );
}
