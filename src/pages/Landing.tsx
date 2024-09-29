import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import landingImage from '../assets/landing-image.svg';
import NavBar from '../components/nav-bar/NavBar';

export default function Landing() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';

    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, []);

  return (
    <div
      className="absolute left-0 top-0 z-50 h-full min-h-screen w-full text-gray-00"
      style={{
        background: 'linear-gradient(180deg, #1B1C23 24.41%, #31333F 100%)',
      }}
    >
      <header>
        <NavBar />
      </header>
      <div className="flex flex-col items-center">
        <div className="mt-16 h-[114px] w-[132px]">
          <img
            src={landingImage}
            alt="랜딩페이지 이미지"
            className="h-full w-full object-cover"
          />
        </div>
        <p className="title-sm-200 mt-4 text-center">
          링크 공유 한번으로, 여러 사람과
          <br />
          쉽게 일정을 맞추세요.
        </p>
        <Link
          to="/events/new"
          className="text-md-300 mt-6 rounded-full bg-primary-40 px-12 py-3"
        >
          이벤트 만들기
        </Link>
      </div>
    </div>
  );
}
