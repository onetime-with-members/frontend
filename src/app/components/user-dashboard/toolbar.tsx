'use client';

import useScroll from '@/hooks/useScroll';
import cn from '@/lib/cn';

export default function ToolbarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isScrolling } = useScroll();

  return (
    <div
      className={cn(
        'fixed z-30 mx-auto w-full max-w-[calc(768px+2rem)] bg-gray-00 duration-150',
        {
          'shadow-lg': isScrolling,
        },
      )}
    >
      {children}
    </div>
  );
}
