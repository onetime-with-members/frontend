import { createContext } from 'react';
import {
  UseFormHandleSubmit,
  UseFormRegisterReturn,
  useFieldArray,
} from 'react-hook-form';

import useEventForm from '../hooks/useEventForm';
import { EventFormStatus } from '../types';
import { EventFormType } from '@/lib/validation/form-types';

export const EventFormContext = createContext<{
  formStatus: EventFormStatus;
  isValid: boolean;
  handleSubmit: UseFormHandleSubmit<EventFormType> | null;
  registerTitle: UseFormRegisterReturn<'title'> | null;
  startTime: EventFormType['start_time'];
  setStartTime: (time: EventFormType['start_time']) => void;
  endTime: EventFormType['end_time'];
  setEndTime: (time: EventFormType['end_time']) => void;
  category: EventFormType['category'];
  setCategory: (category: EventFormType['category']) => void;
  ranges: EventFormType['ranges'];
  setRanges: (value: EventFormType['ranges']) => void;
}>({
  formStatus: 'create',
  isValid: false,
  handleSubmit: null,
  registerTitle: null,
  startTime: '',
  setStartTime: () => {},
  endTime: '',
  setEndTime: () => {},
  category: 'DATE',
  setCategory: () => {},
  ranges: [],
  setRanges: () => {},
});

export default function EventFormContextProvider({
  formStatus,
  originData,
  children,
}: {
  formStatus: EventFormStatus;
  originData?: EventFormType;
  children: React.ReactNode;
}) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { isValid },
    control,
    watch,
  } = useEventForm(originData);

  const registerTitle = register('title');

  const startTime = watch('start_time');
  const setStartTime = (time: EventFormType['start_time']) =>
    setValue('start_time', time);

  const endTime = watch('end_time');
  const setEndTime = (time: EventFormType['end_time']) =>
    setValue('end_time', time);

  const category = watch('category');
  const setCategory = (category: EventFormType['category']) =>
    setValue('category', category);

  const ranges = watch('ranges');
  const { replace: setRanges } = useFieldArray<EventFormType>({
    control,
    name: 'ranges' as never,
  });

  return (
    <EventFormContext.Provider
      value={{
        formStatus,
        isValid,
        handleSubmit,
        registerTitle,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        category,
        setCategory,
        ranges,
        setRanges,
      }}
    >
      {children}
    </EventFormContext.Provider>
  );
}
