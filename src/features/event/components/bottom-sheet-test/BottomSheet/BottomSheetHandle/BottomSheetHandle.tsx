import { DragControls } from 'framer-motion';

export default function BottomSheetHandle({
  dragControls,
}: {
  dragControls: DragControls;
}) {
  return (
    <div className="z-10 shrink-0 rounded-t-[30px] bg-white">
      <div
        onPointerDown={(e) => dragControls.start(e)}
        className="flex h-8 w-full cursor-grab touch-none items-center justify-center active:cursor-grabbing"
      >
        <div className="h-1.5 w-12 rounded-full bg-gray-200" />
      </div>
    </div>
  );
}
