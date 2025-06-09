'use client';

import { useRouter } from '@/navigation';
import { IconX } from '@tabler/icons-react';

export default function BackButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()}>
      <IconX size={24} />
    </button>
  );
}
