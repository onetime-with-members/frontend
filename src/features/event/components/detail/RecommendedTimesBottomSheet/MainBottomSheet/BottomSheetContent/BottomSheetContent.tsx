import { useContext } from 'react';

import { BottomSheetContext } from '@/features/event/contexts/BottomSheetContext';
import cn from '@/lib/cn';

export default function BottomSheetContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useContext(BottomSheetContext);

  return (
    <div
      className={cn('flex-1 overflow-y-auto bg-gray-00', {
        'overflow-y-auto': isOpen,
        'overflow-hidden': !isOpen,
      })}
    >
      {children}
    </div>
  );
}
