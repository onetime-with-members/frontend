import { Link } from 'react-router-dom';

export default function BottomButton() {
  return (
    <div className="flex w-full justify-center px-4">
      <Link
        to="/events/new"
        className="flex h-[4rem] w-full max-w-[23rem] items-center justify-center rounded-2xl bg-[#1B1C23] text-gray-00 title-sm-200"
      >
        일정 생성하기
      </Link>
    </div>
  );
}
