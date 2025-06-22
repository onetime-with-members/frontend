'use client';

import PolicyDetailScreen from '@/components/user/policy-detail-screen';
import { PolicyKeyType, UserType } from '@/lib/types';
import { useRouter } from 'next/navigation';

export default function PolicyContent({
  page,
  pageTitle,
  user,
}: {
  page: PolicyKeyType;
  pageTitle: string;
  user: UserType | null;
}) {
  const router = useRouter();

  return (
    <PolicyDetailScreen
      page={page}
      pageTitle={pageTitle}
      onClose={() => router.back()}
      user={user}
    />
  );
}
