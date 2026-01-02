import BottomSheetContent from './BottomSheetContent';
import BottomSheetHandle from './BottomSheetHandle';
import BottomSheetInnerContent from './BottomSheetInnerContent';
import BottomSheetRoot from './BottomSheetRoot';
import BottomSheetContextProvider from '@/features/event/contexts/BottomSheetContext';

export default function BottomSheet() {
  return (
    <BottomSheetContextProvider>
      <BottomSheetRoot>
        <BottomSheetHandle />
        <BottomSheetContent>
          <BottomSheetInnerContent />
        </BottomSheetContent>
      </BottomSheetRoot>
    </BottomSheetContextProvider>
  );
}
