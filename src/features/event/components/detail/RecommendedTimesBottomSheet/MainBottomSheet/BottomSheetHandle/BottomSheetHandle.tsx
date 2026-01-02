import { useContext } from 'react';

import { BottomSheetContext } from '@/features/event/contexts/BottomSheetContext';

export default function BottomSheetHandle() {
  const { dragControls } = useContext(BottomSheetContext);

  return (
    <div className="z-10 shrink-0 rounded-t-3xl bg-gray-00">
      <div
        onPointerDown={(e) => dragControls.start(e)}
        className="flex h-8 w-full cursor-grab touch-none items-center justify-center active:cursor-grabbing"
      >
        <div className="h-1.5 w-12 rounded-full bg-gray-10" />
      </div>
    </div>
  );
}
