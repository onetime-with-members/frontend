'use client';

import PolicyDetailScreen from '@/features/user/components/shared/PolicyDetailScreen';
import { PolicySchema } from '@/features/user/types';
import { useRouter } from '@/i18n/navigation';

export default function PolicyDetailPage({
  page,
  pageTitle,
}: {
  page: keyof PolicySchema;
  pageTitle: string;
}) {
  const router = useRouter();

  function handleClose() {
    router.back();
  }

  return (
    <div className="flex h-full flex-col">
      <PolicyDetailScreen
        page={page}
        pageTitle={pageTitle}
        onClose={handleClose}
      />
    </div>
  );
}
