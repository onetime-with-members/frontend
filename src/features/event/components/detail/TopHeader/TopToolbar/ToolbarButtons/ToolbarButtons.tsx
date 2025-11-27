import { useState } from 'react';

import EventDeleteAlert from './EventDeleteAlert';
import ToolbarButton from './ToolbarButton';
import { EditIcon, TrashIcon } from '@/components/icon';
import { useEventWithAuthQuery } from '@/features/event/api/event.query';
import { useProgressRouter } from '@/navigation';
import { useParams } from 'next/navigation';

export default function ToolbarButtons() {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const params = useParams<{ id: string }>();
  const progressRouter = useProgressRouter();

  const { data: event } = useEventWithAuthQuery({ id: params.id });

  return (
    <>
      <div className="flex items-center gap-2 text-2xl text-gray-00">
        <ToolbarButton
          onClick={() => progressRouter.push(`/events/${params.id}/edit`)}
        >
          <EditIcon />
        </ToolbarButton>
        {event?.event_status === 'CREATOR' && (
          <ToolbarButton onClick={() => setIsDeleteAlertOpen(true)}>
            <TrashIcon innerfill="#474A5C" />
          </ToolbarButton>
        )}
      </div>
      {isDeleteAlertOpen && (
        <EventDeleteAlert setIsEventDeleteAlertOpen={setIsDeleteAlertOpen} />
      )}
    </>
  );
}
