import { useState } from 'react';

import EventDeleteAlert from './EventDeleteAlert';
import ToolbarButton from './ToolbarButton';
import { EditIcon, TrashIcon } from '@/components/icon';
import { useProgressRouter } from '@/navigation';
import { useParams } from 'next/navigation';

export default function ToolbarButtons() {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const params = useParams<{ id: string }>();
  const progressRouter = useProgressRouter();

  return (
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
  );
}
