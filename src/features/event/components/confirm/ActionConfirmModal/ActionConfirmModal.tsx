import { createPortal } from 'react-dom';

import ConfirmedTimeSummary from './ConfirmedTimeSummary';
import ModalButton from './ModalButton/ModalButton';

export default function ActionConfirmModal({
  onCancel,
  onConfirm,
  isPending,
}: {
  onCancel: () => void;
  onConfirm: () => void;
  isPending: boolean;
}) {
  return createPortal(
    <div className="fixed left-0 top-0 z-50 flex h-full w-full cursor-pointer items-center justify-center bg-gray-90 bg-opacity-50 px-4">
      <div
        className="relative flex w-full max-w-[328px] cursor-auto flex-col overflow-hidden rounded-2xl bg-gray-00"
        onClick={(e) => e.stopPropagation()}
      >
        <ConfirmedTimeSummary />
        <div className="px-4 py-6 text-center">
          <h3 className="text-gray-80 text-lg-300">이 일정으로 확정할까요?</h3>
          <p className="text-gray-50 text-md-200">
            멤버들이 입력했던 스케줄을 수정할 수 없어요
          </p>
        </div>
        <div className="grid grid-cols-2 gap-1.5 px-3 pb-3">
          <ModalButton variant="secondary" onClick={onCancel}>
            취소하기
          </ModalButton>
          <ModalButton
            variant="primary"
            onClick={onConfirm}
            isPending={isPending}
          >
            {isPending ? '진행 중...' : '확정하기'}
          </ModalButton>
        </div>
      </div>
    </div>,
    document.getElementById('pop-up')!,
  );
}
