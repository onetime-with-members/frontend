'use client';

import PolicyDetailScreen from '@/components/user/policy-detail-screen';
import { PolicyKeyType } from '@/lib/types';
import { useRouter } from 'next/navigation';

export default function PolicyContent({
  page,
  pageTitle,
}: {
  page: PolicyKeyType;
  pageTitle: string;
}) {
  const router = useRouter();

  return (
    <PolicyDetailScreen
      page={page}
      pageTitle={pageTitle}
      onClose={() => router.back()}
    />
  );
}
