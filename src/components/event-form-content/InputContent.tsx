import { EventValue } from '../../types/event.type';
import DateSection from './section/DateSection';
import TimeSection from './section/TimeSection';
import TitleSection from './section/TitleSection';

interface InputContentBlockProps {
  value: EventValue;
  setValue: React.Dispatch<React.SetStateAction<EventValue>>;
}

export default function InputContent({
  value,
  setValue,
}: InputContentBlockProps) {
  return (
    <div className="flex w-full flex-col justify-center gap-16 rounded-3xl bg-gray-00 p-6 md:flex-row">
      <div className="flex flex-1 flex-col gap-16">
        <TitleSection value={value} setValue={setValue} />
        <TimeSection value={value} setValue={setValue} />
      </div>
      <div>
        <DateSection value={value} setValue={setValue} />
      </div>
    </div>
  );
}
