import logo from '@/assets/logo-auth.svg';

export default function LogoContent() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-primary-50 title-md-200">일정을 쉽고 빠르게,</div>
      <div className="">
        <img
          src={logo}
          alt="로그인 원타임 로고"
          className="w-[16rem] object-cover"
        />
      </div>
    </div>
  );
}
