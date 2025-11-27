import { useContext } from 'react';
import { SubmitHandler } from 'react-hook-form';

import BottomFloatingButton from './BottomFloatingButton';
import InputContent from './InputContent';
import TopAction from './TopAction';
import {
  useCreateEventMutation,
  useEditEventMutation,
} from '@/features/event/api/event.query';
import { EventFormContext } from '@/features/event/contexts/EventFormContext';
import useNoCreatorRedirect from '@/features/event/hooks/useNoCreatorRedirect';
import { EventSchema } from '@/features/event/types';
import { useProgressRouter } from '@/navigation';
import { useParams } from 'next/navigation';

export default function FormContent() {
  const { formStatus, handleSubmit } = useContext(EventFormContext);

  const progressRouter = useProgressRouter();
  const params = useParams<{ id: string }>();

  useNoCreatorRedirect();

  const { mutateAsync: createEvent, isLoading: isCreateLoading } =
    useCreateEventMutation();
  const { mutateAsync: editEvent, isLoading: isEditLoading } =
    useEditEventMutation();

  const onSubmit: SubmitHandler<EventSchema> = async (values) => {
    if (formStatus === 'create') {
      const { event_id } = await createEvent(values);
      progressRouter.push(`/events/${event_id}`);
    } else {
      await editEvent({ eventId: params.id, event: values });
      progressRouter.push(`/events/${params.id}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit?.(onSubmit)}
      className="flex flex-col items-center pb-40"
    >
      <div className="mx-auto flex w-full max-w-screen-md flex-col items-center justify-center md:pt-6">
        <TopAction />
        <InputContent />
      </div>
      <BottomFloatingButton
        isCreateLoading={isCreateLoading}
        isEditLoading={isEditLoading}
      />
    </form>
  );
}
