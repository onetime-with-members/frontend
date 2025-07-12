'use client';

import PolicyDetailScreen from '@/components/user/policy-detail-screen';
import { PolicyKeyType } from '@/lib/types';
import { useRouter } from 'next/navigation';

export default function PolicyPage({
  page,
  pageTitle,
}: {
  page: PolicyKeyType;
  pageTitle: string;
}) {
  const router = useRouter();

  return (
    <div className="flex h-full flex-col">
      <PolicyDetailScreen
        page={page}
        pageTitle={pageTitle}
        onClose={() => router.back()}
      />
    </div>
  );
}
