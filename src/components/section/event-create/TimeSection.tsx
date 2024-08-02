import { useState } from 'react';

import Dropdown from '../../dropdown/Dropdown';
import EventInputLabel from '../../input-label/EventInputLabel';

export default function TimeSection() {
  const [selectedStartHour, setSelectedStartHour] = useState(0);
  const [selectedEndHour, setSelectedEndHour] = useState(0);

  function handleSelectAllTime() {
    setSelectedStartHour(0);
    setSelectedEndHour(24);
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
          <Dropdown
            className="w-[7.5rem]"
            value={selectedStartHour}
            setValue={setSelectedStartHour}
          />
          <span className="text-md-300 text-gray-70">~</span>
          <Dropdown
            className="w-[7.5rem]"
            value={selectedEndHour}
            setValue={setSelectedEndHour}
          />
        </div>
        <button
          className="rounded-xl bg-gray-80 px-5 py-4 text-gray-00"
          onClick={handleSelectAllTime}
        >
          종일
        </button>
      </div>
    </div>
  );
}
