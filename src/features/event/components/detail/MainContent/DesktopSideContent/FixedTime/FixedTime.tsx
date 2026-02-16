import FixedTimeHeader from './FixedTimeHeader';
import FixedTimeMain from './FixedTimeMain';

export default function FixedTime() {
  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl bg-gray-70 p-[10px]">
      <FixedTimeHeader />
      <FixedTimeMain />
    </div>
  );
}
