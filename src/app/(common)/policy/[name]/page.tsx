import PolicyPage from './policy-detail';
import NotFound from '@/app/not-found';
import { PolicySchema } from '@/features/user/types';
import { policyPageTitle } from '@/features/user/utils';
import { POLICY_KEY_LIST } from '@/lib/constants';
import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const locale = await getLocale();

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
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const locale = await getLocale();

  if (!POLICY_KEY_LIST.includes(name as 'privacy' | 'service')) {
    return NotFound();
  }

  const page: keyof PolicySchema =
    name === 'privacy' ? 'privacyPolicy' : 'servicePolicy';
  const pageTitle = policyPageTitle(name, locale);

  return <PolicyPage page={page} pageTitle={pageTitle} />;
}
