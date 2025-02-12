import DateSection from './DateSection/DateSection';
import TimeSection from './TimeSection/TimeSection';
import TitleSection from './TitleSection/TitleSection';

export default function InputContent() {
  return (
    <div className="flex w-full flex-col justify-center gap-16 rounded-3xl bg-gray-00 p-6 md:flex-row">
      <div className="flex flex-1 flex-col gap-16">
        <TitleSection />
        <TimeSection />
      </div>
      <div>
        <DateSection />
      </div>
    </div>
  );
}
