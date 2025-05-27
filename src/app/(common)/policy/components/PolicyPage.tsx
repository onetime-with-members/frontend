'use client';

import PolicyDetailScreen from '@/components/policy/PolicyDetailScreen/PolicyDetailScreen';
import { PolicyKeyType } from '@/lib/types';
import { useRouter } from '@/navigation';

interface PolicyPageProps {
  page: PolicyKeyType;
  pageTitle: string;
}

export default function PolicyPage({ page, pageTitle }: PolicyPageProps) {
  const router = useRouter();

  function handlePageDetailClose() {
    router.back();
  }

  return (
    <div className="flex h-full flex-col">
      <PolicyDetailScreen
        page={page}
        pageTitle={pageTitle}
        onClose={handlePageDetailClose}
      />
    </div>
  );
}
