import authLogo from '../assets/auth-logo.svg';
import SocialLoginButton from '../components/auth/SocialLoginButton';
import NavBar from '../components/nav-bar/NavBar';

export default function Login() {
  return (
    <div
      className="flex h-screen flex-col items-center justify-center"
      style={{
        background:
          'radial-gradient(932.45% 113.45% at 0% 100%, rgba(145, 46, 222, 0.30) 0%, rgba(134, 151, 241, 0.00) 100%), radial-gradient(141.12% 141.42% at 100% 0%, #4F67E6 0%, #A7B5FF 100%)',
      }}
    >
      <NavBar />
      <div className="flex w-full max-w-[22rem] -translate-y-12 flex-col items-center gap-12 px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="title-md-200 text-gray-00">일정을 쉽고 빠르게,</div>
          <div>
            <img src={authLogo} alt="로그인 원타임 로고" />
          </div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <SocialLoginButton social="naver" />
          <SocialLoginButton social="kakao" />
          <SocialLoginButton social="google" />
        </div>
      </div>
    </div>
  );
}
