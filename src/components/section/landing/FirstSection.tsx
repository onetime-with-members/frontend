import { Link } from 'react-router-dom';

import calendarImage from '../../../assets/landing/calendar.svg';

export default function FirstSection() {
  return (
    <section className="flex flex-col items-center gap-12">
      <div className="relative flex flex-col gap-[3.25rem] pb-[4.75rem] pt-[4.25rem]">
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
      <Link
        to="/events/new"
        className="flex h-[4rem] w-full items-center justify-center rounded-2xl text-gray-00 title-sm-300"
        style={{
          background: 'linear-gradient(148deg, #8898F2 3.59%, #4C65E5 98.84%)',
        }}
      >
        일정 생성하기
      </Link>
    </section>
  );
}
