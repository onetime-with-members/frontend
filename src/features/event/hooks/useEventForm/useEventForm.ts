import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { defaultEventValue } from '../../constants';
import { eventSchema } from '../../schemas';
import { EventSchema } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';

export default function useEventForm(originData?: EventSchema) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { isValid },
    control,
    watch,
    reset,
  } = useForm<EventSchema>({
    mode: 'onChange',
    defaultValues: originData || defaultEventValue,
    resolver: zodResolver(eventSchema),
  });

  useEffect(() => {
    if (originData) reset(originData);
  }, [originData]);

  return {
    register,
    setValue,
    handleSubmit,
    formState: { isValid },
    control,
    watch,
  };
}
