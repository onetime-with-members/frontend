import { useDispatch, useSelector } from 'react-redux';

import EventInputLabel from '../EventInputLabel/EventInputLabel';
import TimeDropdown from '@/components/TimeDropdown/TimeDropdown';
import { AppDispatch, RootState } from '@/store';
import { changeEventValue } from '@/store/eventSlice';
import { EventType } from '@/types/event.type';

export default function TimeSection() {
  const { eventValue } = useSelector((state: RootState) => state.event);
  const dispatch = useDispatch<AppDispatch>();

  function handleSelectTime(key: keyof EventType) {
    return function (time: string) {
      dispatch(changeEventValue({ ...eventValue, [key]: time }));
    };
  }

  return (
    <div className="flex flex-col gap-4">
      <EventInputLabel
        labelId="time"
        labelText="시간"
        description="설문할 시간의 범위를 설정해주세요."
      />
      <div className="flex gap-4">
        <div className="flex items-center gap-3">
          <TimeDropdown
            className="w-[7.5rem]"
            time={eventValue.start_time}
            setTime={handleSelectTime('start_time')}
          />
          <span className="text-gray-70 text-md-300">-</span>
          <TimeDropdown
            className="w-[7.5rem]"
            time={eventValue.end_time}
            setTime={handleSelectTime('end_time')}
          />
        </div>
      </div>
    </div>
  );
}
