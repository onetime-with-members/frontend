'use client';

import { IconX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()}>
      <IconX size={24} />
    </button>
  );
}
