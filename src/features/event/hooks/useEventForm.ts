import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { defaultEventValue } from '@/lib/constants';
import { EventFormType } from '@/lib/validation/form-types';
import { eventSchema } from '@/lib/validation/schema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function useEventForm(originData?: EventFormType) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { isValid },
    control,
    watch,
    reset,
  } = useForm<EventFormType>({
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
