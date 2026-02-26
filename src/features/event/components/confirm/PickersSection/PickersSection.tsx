import { useState } from 'react';

import ConfirmedTimePicker from './ConfirmedTimePicker';
import { ConfirmedTimePickerProps } from './ConfirmedTimePicker/ConfirmedTimePicker';
import { CalendarIcon } from '@/components/icon';
import { useEventQuery } from '@/features/event/api/event.query';
import { useParams } from 'next/navigation';

export default function PickersSection() {
  const [activePicker, setActivePicker] = useState<'start' | 'end' | 'none'>(
    'none',
  );

  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);

  const pickerProps = (type: 'start' | 'end'): ConfirmedTimePickerProps => ({
    type,
    datePickerType: event.category === 'DATE' ? 'date' : 'day',
    isOpen: activePicker === type,
    onOpen: (isOpen: boolean) => setActivePicker(isOpen ? type : 'none'),
  });

  return (
    <section className="flex flex-1 flex-col gap-3 bg-gray-00 px-4 pt-4 md:rounded-3xl md:p-6">
      <div className="flex flex-col gap-2 rounded-2xl bg-transparent md:gap-3 md:p-0">
        <h3 className="flex items-center gap-1">
          <CalendarIcon fontSize={20} innerfill="#F6F7F8" />
          <span className="text-gray-70 text-lg-300">{event.title}</span>
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <ConfirmedTimePicker {...pickerProps('start')} />
          <ConfirmedTimePicker {...pickerProps('end')} />
        </div>
      </div>
    </section>
  );
}
