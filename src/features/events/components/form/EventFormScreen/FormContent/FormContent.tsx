import { useContext } from 'react';
import { SubmitHandler } from 'react-hook-form';

import BottomFloatingButton from './BottomFloatingButton';
import InputContent from './InputContent';
import TopAction from './TopAction';
import {
  useCreateEventMutation,
  useEditEventMutation,
} from '@/features/events/api';
import { EventFormContext } from '@/features/events/contexts/EventFormContext';
import useNoCreatorRedirect from '@/features/events/hooks/useNoCreatorRedirect';
import { EventFormType } from '@/lib/validation/form-types';
import { useProgressRouter } from '@/navigation';
import { useParams } from 'next/navigation';

export default function FormContent() {
  const { formStatus, handleSubmit } = useContext(EventFormContext);

  const progressRouter = useProgressRouter();
  const params = useParams<{ id: string }>();

  useNoCreatorRedirect();

  const { mutateAsync: createEvent, isPending: isCreatePending } =
    useCreateEventMutation();
  const { mutateAsync: editEvent, isPending: isEditPending } =
    useEditEventMutation();

  const onSubmit: SubmitHandler<EventFormType> = async (values) => {
    if (formStatus === 'create') {
      await createEvent(values);
      progressRouter.push(`/events/${params.id}`);
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
        isCreatePending={isCreatePending}
        isEditPending={isEditPending}
      />
    </form>
  );
}
