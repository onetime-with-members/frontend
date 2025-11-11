import { createContext } from 'react';
import {
  UseFormHandleSubmit,
  UseFormRegisterReturn,
  useFieldArray,
} from 'react-hook-form';

import useEventForm from '../hooks/useEventForm';
import { EventFormStatus, EventSchema } from '../types';

export const EventFormContext = createContext<{
  formStatus: EventFormStatus;
  isValid: boolean;
  handleSubmit: UseFormHandleSubmit<EventSchema> | null;
  registerTitle: UseFormRegisterReturn<'title'> | null;
  startTime: EventSchema['start_time'];
  setStartTime: (time: EventSchema['start_time']) => void;
  endTime: EventSchema['end_time'];
  setEndTime: (time: EventSchema['end_time']) => void;
  category: EventSchema['category'];
  setCategory: (category: EventSchema['category']) => void;
  ranges: EventSchema['ranges'];
  setRanges: (value: EventSchema['ranges']) => void;
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
  originData?: EventSchema;
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
  const setStartTime = (time: EventSchema['start_time']) =>
    setValue('start_time', time);

  const endTime = watch('end_time');
  const setEndTime = (time: EventSchema['end_time']) =>
    setValue('end_time', time);

  const category = watch('category');
  const setCategory = (category: EventSchema['category']) =>
    setValue('category', category);

  const ranges = watch('ranges');
  const { replace: setRanges } = useFieldArray<EventSchema>({
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
