import { useState } from 'react';

import EventHeading from '../shared/EventHeading';
import ConfirmedTimePicker from './ConfirmedTimePicker';
import { ConfirmedTimePickerProps } from './ConfirmedTimePicker/ConfirmedTimePicker';
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
        <EventHeading level={2} />
        <div className="grid grid-cols-2 gap-3">
          <ConfirmedTimePicker {...pickerProps('start')} />
          <ConfirmedTimePicker {...pickerProps('end')} />
        </div>
        <div id="desktop-picker-panel" />
      </div>
    </section>
  );
}
