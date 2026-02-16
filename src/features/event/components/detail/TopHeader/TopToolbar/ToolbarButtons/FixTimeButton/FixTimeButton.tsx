import { CalendarIcon } from '@/components/icon';

export default function FixTimeButton() {
  return (
    <button className="hidden items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1.5 text-gray-00 text-md-300 md:flex">
      <span>
        <CalendarIcon innerfill="#4c65e5" fontSize={24} />
      </span>
      <span>일정 확정하기</span>
    </button>
  );
}
