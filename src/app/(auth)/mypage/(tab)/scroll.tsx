'use client';

import { useContext } from 'react';

import { ScrollContext } from '@/contexts/scroll';

export default function ScrollContainerWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { scrollContainerRef } = useContext(ScrollContext);

  return (
    <div ref={scrollContainerRef} className="flex-1">
      {children}
    </div>
  );
}
