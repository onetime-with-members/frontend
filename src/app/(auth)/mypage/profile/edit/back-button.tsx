'use client';

import { IconChevronLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export function MobileBackButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()}>
      <IconChevronLeft size={24} className="text-gray-80" />
    </button>
  );
}

export function DesktopBackButton() {
  const router = useRouter();

  return (
    <button className="text-gray-90" onClick={() => router.back()}>
      <IconChevronLeft size={32} />
    </button>
  );
}
