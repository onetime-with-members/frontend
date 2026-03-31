import { createPortal } from 'react-dom';

import ModalCloseButton from './ModalCloseButton';
import ModalConfirmButton from './ModalConfirmButton';
import ModalImage from './ModalImage';
import ModalTextContent from './ModalTextContent';

export default function TalkCalendarSuccessModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return createPortal(
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50 px-4">
      <div className="relative flex w-full max-w-[328px] flex-col overflow-hidden rounded-3xl bg-gray-00">
        <ModalCloseButton onClick={onClose} />
        <ModalImage />
        <div className="flex flex-col gap-5 p-4">
          <ModalTextContent />
          <ModalConfirmButton onClick={onClose} />
        </div>
      </div>
    </div>,
    document.getElementById('pop-up') as HTMLElement,
  );
}
