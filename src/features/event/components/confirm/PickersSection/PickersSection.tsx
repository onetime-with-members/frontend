import { useState } from 'react';

import ConfirmedTimePicker from './ConfirmedTimePicker';
import { CalendarIcon } from '@/components/icon';
import { useEventQuery } from '@/features/event/api/event.query';
import { useParams } from 'next/navigation';

export default function PickersSection() {
  const [activePicker, setActivePicker] = useState<'start' | 'end' | 'none'>(
    'none',
  );

  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);

  return (
    <section className="flex w-full flex-col gap-3 bg-gray-00 px-4 pt-4 md:w-[442px] md:rounded-3xl md:p-6">
      <div className="flex flex-col gap-2 rounded-2xl bg-transparent md:gap-3 md:p-0">
        <h3 className="flex items-center gap-1">
          <CalendarIcon fontSize={20} innerfill="#F6F7F8" />
          <span className="text-gray-70 text-lg-300">{event.title}</span>
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <ConfirmedTimePicker
            type="start"
            isOpen={activePicker === 'start'}
            setIsOpen={(isOpen: boolean) =>
              setActivePicker(isOpen ? 'start' : 'none')
            }
          />
          <ConfirmedTimePicker
            type="end"
            isOpen={activePicker === 'end'}
            setIsOpen={(isOpen: boolean) =>
              setActivePicker(isOpen ? 'end' : 'none')
            }
          />
        </div>
      </div>
    </section>
  );
}
