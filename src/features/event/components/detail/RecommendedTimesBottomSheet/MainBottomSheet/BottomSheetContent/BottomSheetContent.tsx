import { useContext } from 'react';

import { BottomSheetContext } from '@/features/event/contexts/BottomSheetContext';
import cn from '@/lib/cn';

export default function BottomSheetContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, setContentRef } = useContext(BottomSheetContext);

  return (
    <div
      ref={setContentRef}
      className={cn(
        'flex-1 touch-pan-y overflow-y-auto overscroll-contain bg-gray-00',
        {
          'overflow-y-auto': isOpen,
          'overflow-hidden': !isOpen,
        },
      )}
    >
      {children}
    </div>
  );
}
