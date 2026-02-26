import { createPortal } from 'react-dom';

import ConfirmedTimePickerButton from '../shared/ConfirmedTimePickerButton';
import EventHeading from '../shared/EventHeading/EventHeading';
import ModalButton from './ModalButton/ModalButton';
import {
  useConfirmEventMutation,
  useEditEventConfirmedTimeMutation,
  useEventQuery,
} from '@/features/event/api/event.query';
import { useConfirmedTime } from '@/features/event/contexts/ConfirmedTimeContext';
import { ConfirmEventRequestData } from '@/features/event/types';
import { useProgressRouter } from '@/navigation';
import { useParams } from 'next/navigation';

export default function ActionConfirmModal({
  onCancel,
}: {
  onCancel: () => void;
}) {
  const confirmedTime = useConfirmedTime();

  const params = useParams<{ id: string }>();

  const progressRouter = useProgressRouter();

  const { data: event } = useEventQuery(params.id);

  const { mutateAsync: confirmEvent } = useConfirmEventMutation();
  const { mutateAsync: editEventConfirmedTime } =
    useEditEventConfirmedTimeMutation();

  async function handleConfirm() {
    const request = {
      eventId: params.id,
      data: {
        [event.category === 'DATE' ? 'start_date' : 'start_day']:
          confirmedTime.start.date,
        [event.category === 'DATE' ? 'end_date' : 'end_day']:
          confirmedTime.end.date,
        start_time: confirmedTime.start.time,
        end_time: confirmedTime.end.time,
      } as ConfirmEventRequestData,
    };

    if (event.confirmation) {
      await editEventConfirmedTime(request);
    } else {
      await confirmEvent(request);
    }

    progressRouter.back();
  }

  return createPortal(
    <div className="fixed left-0 top-0 z-50 flex h-full w-full cursor-pointer items-center justify-center bg-gray-90 bg-opacity-50 px-4">
      <div
        className="relative flex w-full max-w-[328px] cursor-auto flex-col overflow-hidden rounded-2xl bg-gray-00"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-2 bg-gray-80 px-4 py-3 text-gray-00">
          <EventHeading variant="white" level={4} />
          <div className="grid grid-cols-2 gap-2">
            <ConfirmedTimePickerButton
              type="start"
              datePickerType={event.category === 'DATE' ? 'date' : 'day'}
              selectedDateTime={{
                date: confirmedTime.start.date,
                time: confirmedTime.start.time,
              }}
              variant="dark"
            />
            <ConfirmedTimePickerButton
              type="end"
              datePickerType={event.category === 'DATE' ? 'date' : 'day'}
              selectedDateTime={{
                date: confirmedTime.end.date,
                time: confirmedTime.end.time,
              }}
              variant="dark"
            />
          </div>
        </div>
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
          <ModalButton variant="primary" onClick={handleConfirm}>
            확정하기
          </ModalButton>
        </div>
      </div>
    </div>,
    document.getElementById('pop-up')!,
  );
}
