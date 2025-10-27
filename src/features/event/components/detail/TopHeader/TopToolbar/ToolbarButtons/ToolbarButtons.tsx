import { useState } from 'react';

import EventDeleteAlert from './EventDeleteAlert';
import ToolbarButton from './ToolbarButton';
import EditIcon from '@/components/icon/EditIcon';
import TrashIcon from '@/components/icon/trash';
import { eventWithAuthQueryOptions } from '@/features/event/api/events.option';
import { useProgressRouter } from '@/navigation';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function ToolbarButtons() {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const params = useParams<{ id: string }>();
  const progressRouter = useProgressRouter();

  const { data: event } = useQuery({
    ...eventWithAuthQueryOptions(params.id),
  });

  return (
    event?.event_status === 'CREATOR' && (
      <>
        <div className="flex items-center gap-2 text-2xl text-gray-00">
          <ToolbarButton
            onClick={() => progressRouter.push(`/events/${params.id}/edit`)}
          >
            <EditIcon />
          </ToolbarButton>
          <ToolbarButton onClick={() => setIsDeleteAlertOpen(true)}>
            <TrashIcon innerfill="#474A5C" />
          </ToolbarButton>
        </div>
        {isDeleteAlertOpen && (
          <EventDeleteAlert setIsEventDeleteAlertOpen={setIsDeleteAlertOpen} />
        )}
      </>
    )
  );
}
