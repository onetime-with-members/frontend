import { useState } from 'react';

import EventDeleteAlert from './EventDeleteAlert';
import FixTimeButton from './FixTimeButton';
import ToolbarButton from './ToolbarButton';
import { EditIcon, TrashIcon } from '@/components/icon';
import {
  useEventQuery,
  useParticipantsQuery,
} from '@/features/event/api/event.query';
import { useProgressRouter } from '@/navigation';
import { useParams } from 'next/navigation';

export default function ToolbarButtons() {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const params = useParams<{ id: string }>();
  const progressRouter = useProgressRouter();

  const { data: event } = useEventQuery(params.id);
  const { data: pariticipants } = useParticipantsQuery(params.id);

  return (
    <>
      <div className="flex items-center gap-2 text-2xl text-gray-00">
        <ToolbarButton
          onClick={() => progressRouter.push(`/events/${params.id}/edit`)}
        >
          <EditIcon />
        </ToolbarButton>
        {['CREATOR', 'CREATOR_AND_PARTICIPANT'].includes(
          event.participation_role,
        ) && (
          <ToolbarButton onClick={() => setIsDeleteAlertOpen(true)}>
            <TrashIcon innerfill="#474A5C" />
          </ToolbarButton>
        )}
        {pariticipants.length >= 2 && <FixTimeButton />}
      </div>
      {isDeleteAlertOpen && (
        <EventDeleteAlert setIsEventDeleteAlertOpen={setIsDeleteAlertOpen} />
      )}
    </>
  );
}
