import { useEffect, useState } from 'react';

import ConfirmedTimePickerButton from '../shared/ConfirmedTimePickerButton';
import EventHeading from '../shared/EventHeading';
import PickerPanel from './PickerPanel';
import { useEventQuery } from '@/features/event/api/event.query';
import {
  useConfirmedTime,
  useConfirmedTimeDispatch,
} from '@/features/event/contexts/ConfirmedTimeContext';
import { SelectedDateTime } from '@/features/event/types';
import { useParams } from 'next/navigation';

export default function PickersSection() {
  const confirmedTime = useConfirmedTime();
  const dispatch = useConfirmedTimeDispatch();

  const [activePicker, setActivePicker] = useState<'start' | 'end' | 'none'>(
    'start',
  );
  const [selectedDateTime, setSelectedDateTime] =
    useState<SelectedDateTime>(confirmedTime);

  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);

  function dispatchConfirmedTime() {
    if (!dispatch) return;
    if (activePicker === 'start') {
      dispatch({ type: 'start_picker_selected', ...selectedDateTime['start'] });
    } else {
      dispatch({ type: 'end_picker_selected', ...selectedDateTime['end'] });
    }
  }

  function handlePickerTrigger(type: 'start' | 'end') {
    switch (activePicker) {
      case 'none':
        setActivePicker(type);
        return;
      case type:
        setSelectedDateTime(confirmedTime);
        setActivePicker('none');
        return;
      default:
        dispatchConfirmedTime();
        setActivePicker(type);
        return;
    }
  }

  function handlePanelConfirm() {
    dispatchConfirmedTime();
    setActivePicker('none');
  }

  function handlePanelClose() {
    setSelectedDateTime(confirmedTime);
    setActivePicker('none');
  }

  useEffect(() => {
    setSelectedDateTime(confirmedTime);
  }, [confirmedTime]);

  return (
    <section className="flex flex-1 flex-col gap-3 bg-gray-00 px-4 pt-4 md:rounded-3xl md:p-6">
      <div className="flex flex-col gap-2 rounded-2xl bg-transparent md:gap-3 md:p-0">
        <EventHeading level={2} />
        <div className="relative flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <ConfirmedTimePickerButton
              type="start"
              datePickerType={event.category === 'DATE' ? 'date' : 'day'}
              active={activePicker === 'start'}
              onClick={() => handlePickerTrigger('start')}
              selectedDateTime={selectedDateTime['start']}
            />
            <ConfirmedTimePickerButton
              type="end"
              datePickerType={event.category === 'DATE' ? 'date' : 'day'}
              active={activePicker === 'end'}
              onClick={() => handlePickerTrigger('end')}
              selectedDateTime={selectedDateTime['end']}
            />
          </div>
          {activePicker !== 'none' && (
            <PickerPanel
              type={activePicker}
              datePickerType={event.category === 'DATE' ? 'date' : 'day'}
              onConfirm={handlePanelConfirm}
              onCancel={handlePanelClose}
              selectedDateTime={selectedDateTime[activePicker]}
              setSelectedDateTime={(dateTime) =>
                setSelectedDateTime((prev) => ({
                  ...prev,
                  [activePicker]: dateTime,
                }))
              }
            />
          )}
        </div>
      </div>
    </section>
  );
}
