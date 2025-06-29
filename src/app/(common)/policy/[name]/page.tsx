import PolicyContent from './content';
import NotFound from '@/app/not-found';
import { POLICY_KEY_LIST } from '@/lib/constants';
import { PolicyKeyType } from '@/lib/types';
import { policyPageTitle } from '@/lib/utils';
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
    title: `${policyPageTitle(name, locale)} | OneTime`,
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

  const page: PolicyKeyType =
    name === 'privacy'
      ? 'privacy_policy_agreement'
      : 'service_policy_agreement';
  const pageTitle = policyPageTitle(name, locale);

  return (
    <div className="flex h-full flex-col">
      <PolicyContent page={page} pageTitle={pageTitle} />
    </div>
  );
}
