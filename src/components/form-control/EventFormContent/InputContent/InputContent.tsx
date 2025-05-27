import DateSection from './DateSection/DateSection';
import TimeSection from './TimeSection/TimeSection';
import TitleSection from './TitleSection/TitleSection';
import { EventValueType } from '@/lib/types';

interface InputContentBlockProps {
  value: EventValueType;
  setValue: React.Dispatch<React.SetStateAction<EventValueType>>;
}

export default function InputContent({
  value,
  setValue,
}: InputContentBlockProps) {
  return (
    <div className="flex w-full flex-col justify-center gap-10 rounded-3xl bg-gray-00 px-4 py-6 md:flex-row md:px-6">
      <div className="flex flex-1 flex-col gap-10">
        <TitleSection value={value} setValue={setValue} />
        <TimeSection value={value} setValue={setValue} />
      </div>
      <div>
        <DateSection value={value} setValue={setValue} />
      </div>
    </div>
  );
}
