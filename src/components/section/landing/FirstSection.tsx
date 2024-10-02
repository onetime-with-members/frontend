import { Link } from 'react-router-dom';

import calendarImage from '../../../assets/landing/calendar.svg';
import { IconChevronRight } from '@tabler/icons-react';

export default function FirstSection() {
  return (
    <section className="w-full">
      <div className="relative flex w-full flex-col items-center gap-4 pb-[4.75rem] pt-[4.25rem]">
        <div>
          <img src={calendarImage} alt="캘린더 이미지" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-[2rem] font-bold text-primary-50">
            일정을 쉽고 빠르게
          </h1>
          <p className="text-center text-primary-30 text-lg-200">
            링크 공유 한 번으로, 여러 사람과
            <br />
            쉽게 일정을 맞추세요
          </p>
        </div>
        <div
          className="absolute bottom-0 left-1/2 -z-10 h-[825px] w-[825px] -translate-x-1/2 rounded-full"
          style={{
            background: 'linear-gradient(180deg, #FFF 0%, #E8EBFF 100%)',
          }}
        />
      </div>
      <div className="sticky bottom-4 left-0 mx-auto mt-20 w-full max-w-[23rem] px-4">
        <Link
          to="/events/new"
          className="flex h-[4rem] w-full items-center justify-center rounded-2xl px-4 text-gray-00 title-sm-300"
          style={{
            background:
              'linear-gradient(148deg, #8898F2 3.59%, #4C65E5 98.84%)',
          }}
        >
          일정 생성하기
        </Link>
      </div>
      <div className="mt-10 flex justify-center">
        <IconChevronRight size={48} className="rotate-90 text-primary-10" />
      </div>
    </section>
  );
}
