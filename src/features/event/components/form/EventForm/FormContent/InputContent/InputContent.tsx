import DateControl from './DateControl';
import TimeControl from './TimeControl';
import TitleControl from './TitleControl/TitleControl';

export default function InputContent() {
  return (
    <div className="flex w-full flex-col justify-center gap-10 rounded-3xl bg-gray-00 px-4 py-6 md:flex-row md:px-6">
      <div className="flex flex-1 flex-col gap-10">
        <TitleControl />
        <TimeControl />
      </div>
      <DateControl />
    </div>
  );
}
