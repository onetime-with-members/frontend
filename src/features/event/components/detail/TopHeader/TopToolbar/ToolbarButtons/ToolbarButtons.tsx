import { useState } from 'react';

import ConfirmEventButton from './ConfirmEventButton';
import EventDeleteAlert from './EventDeleteAlert';
import ToolbarButton from './ToolbarButton';
import { EditIcon, TrashIcon } from '@/components/icon';
import {
  useEventQuery,
  useEventWithAuthQuery,
} from '@/features/event/api/event.query';
import useEventConfirmStatus from '@/features/event/hooks/useEventConfirmStatus';
import { useProgressRouter } from '@/navigation';
import { useParams } from 'next/navigation';

export default function ToolbarButtons() {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const params = useParams<{ id: string }>();

  const progressRouter = useProgressRouter();
  const eventConfirmStatus = useEventConfirmStatus();

  const { data: event } = useEventQuery(params.id);
  const { data: eventWithAuth } = useEventWithAuthQuery(params.id);

  const isCreator = ['CREATOR', 'CREATOR_AND_PARTICIPANT'].includes(
    eventWithAuth.participation_role,
  );

  return (
    <>
      <div className="flex items-center gap-2 text-2xl text-gray-00">
        {!event.confirmation && (
          <ToolbarButton
            onClick={() => progressRouter.push(`/events/${params.id}/edit`)}
          >
            <EditIcon />
          </ToolbarButton>
        )}
        {isCreator && (
          <ToolbarButton onClick={() => setIsDeleteAlertOpen(true)}>
            <TrashIcon innerfill="#474A5C" />
          </ToolbarButton>
        )}
        {eventConfirmStatus === 'available' && <ConfirmEventButton />}
      </div>
      {isDeleteAlertOpen && (
        <EventDeleteAlert setIsEventDeleteAlertOpen={setIsDeleteAlertOpen} />
      )}
    </>
  );
}
