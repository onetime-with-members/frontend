'use client';

import PolicyDetailScreen from '@/components/user/policy-detail-screen';
import { PolicyFormType } from '@/lib/validation/form-types';
import { useRouter } from 'next/navigation';

export default function PolicyPage({
  page,
  pageTitle,
}: {
  page: keyof PolicyFormType;
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
