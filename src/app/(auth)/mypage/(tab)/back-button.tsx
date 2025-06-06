'use client';

import { useRouter } from '@/navigation';
import { IconChevronLeft } from '@tabler/icons-react';

export default function MobileBackButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()}>
      <IconChevronLeft size={24} />
    </button>
  );
}
