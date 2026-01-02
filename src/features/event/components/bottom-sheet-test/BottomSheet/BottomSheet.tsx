import BottomSheetContent from './BottomSheetContent';
import BottomSheetHandle from './BottomSheetHandle';
import BottomSheetInnerContent from './BottomSheetInnerContent';
import BottomSheetRoot from './BottomSheetRoot';
import useBottomSheet from '@/features/event/hooks/useBottomSheet';

export default function BottomSheet() {
  const { ref, dragControls, SHEET_HEIGHT, onDragEnd } = useBottomSheet();

  return (
    <BottomSheetRoot
      ref={ref}
      dragControls={dragControls}
      sheetHeight={SHEET_HEIGHT}
      onDragEnd={onDragEnd}
    >
      <BottomSheetHandle dragControls={dragControls} />
      <BottomSheetContent>
        <BottomSheetInnerContent />
      </BottomSheetContent>
    </BottomSheetRoot>
  );
}
