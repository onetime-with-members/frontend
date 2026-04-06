import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import ModalCloseButton from './ModalCloseButton';
import ModalConfirmButton from './ModalConfirmButton';
import ModalImage from './ModalImage';
import ModalTextContent from './ModalTextContent';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import { useSearchParams } from 'next/navigation';

export default function TalkCalendarSuccessModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [calendarEventId, setCalendarEventId] = useState('');

  const searchParams = useSearchParams();

  const { removeSearchParams } = useChangeSearchParams();

  const calendarEventIdParams = searchParams.get('calendar_event_id');

  useEffect(() => {
    setCalendarEventId(calendarEventIdParams ?? '');
    removeSearchParams(['calendar_event_id']);
  }, [calendarEventIdParams, removeSearchParams]);

  return createPortal(
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50 px-4">
      <div className="relative flex w-full max-w-[328px] flex-col overflow-hidden rounded-3xl bg-gray-00">
        <ModalCloseButton onClick={onClose} />
        <ModalImage />
        <div className="flex flex-col gap-5 p-4">
          <ModalTextContent />
          <ModalConfirmButton
            calendarEventId={calendarEventId}
            onClick={onClose}
          />
        </div>
      </div>
    </div>,
    document.getElementById('pop-up') as HTMLElement,
  );
}
