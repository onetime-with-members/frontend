import { useDispatch, useSelector } from 'react-redux';

import TimeDropdown from '@/components/TimeDropdown/TimeDropdown';
import { changeSleepTime } from '@/store/sleep-time';
import { AppDispatch, RootState } from '@/store/store';

export default function EditDropdownContent() {
  const { sleepTime } = useSelector((state: RootState) => state.sleepTime);
  const dispatch = useDispatch<AppDispatch>();

  function handleSleepTimeChange(key: keyof typeof sleepTime, time: string) {
    dispatch(changeSleepTime({ ...sleepTime, [key]: time }));
  }

  return (
    <div className="flex flex-1 items-center gap-2.5">
      <TimeDropdown
        time={sleepTime.start}
        setTime={(time) => handleSleepTimeChange('start', time)}
        className="flex-1"
      />
      <span className="text-gray-40 text-md-300">-</span>
      <TimeDropdown
        time={sleepTime.end}
        setTime={(time) => handleSleepTimeChange('end', time)}
        className="flex-1"
      />
    </div>
  );
}
