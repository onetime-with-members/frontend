import { CalendarIcon } from '@/components/icon';

export default function FixedTimeMain() {
  return (
    <div className="flex flex-col items-start rounded-xl bg-gray-60 px-3 py-2">
      <div className="flex flex-row items-center gap-1">
        <CalendarIcon fontSize={16} />
        <span className="text-gray-00 text-sm-300">1일 후</span>
      </div>
      <span className="font-normal text-gray-00 text-lg-300">
        2026. 1. 3. 토 오후 6시
      </span>
    </div>
  );
}
