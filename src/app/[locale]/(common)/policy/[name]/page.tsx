import { Metadata } from 'next';
import { Locale } from 'next-intl';

import NotFound from '@/app/[locale]/not-found';
import { POLICY_KEY_LIST } from '@/constants';
import PolicyDetailPage from '@/features/user/pages/PolicyDetailPage';
import { PolicySchema } from '@/features/user/types';
import { policyPageTitle } from '@/features/user/utils';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string; locale: Locale }>;
}): Promise<Metadata> {
  const { name, locale } = await params;

  if (!POLICY_KEY_LIST.includes(name as 'privacy' | 'service')) {
    notFound();
  }

  return {
    title: policyPageTitle(name, locale),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ name: string; locale: Locale }>;
}) {
  const { name, locale } = await params;

  if (!POLICY_KEY_LIST.includes(name as 'privacy' | 'service')) {
    return NotFound();
  }

  const page: keyof PolicySchema =
    name === 'privacy' ? 'privacyPolicy' : 'servicePolicy';
  const pageTitle = policyPageTitle(name, locale);

  return <PolicyDetailPage page={page} pageTitle={pageTitle} />;
}
