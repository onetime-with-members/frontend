import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import logo from '../assets/logo-auth.svg';
import SocialLoginButton from '../components/button/SocialLoginButton';

export default function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const registerToken = searchParams.get('register_token');
    const name = searchParams.get('name');
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    const redirectUrl = searchParams.get('redirect_url');

    if (redirectUrl) {
      localStorage.setItem('redirect-url', redirectUrl);
    }

    if (registerToken || name) {
      const urlSearchParams = new URLSearchParams([
        ...(registerToken ? [['register_token', registerToken]] : []),
        ...(name ? [['name', name]] : []),
      ]);

      navigate(`/onboarding?${urlSearchParams.toString()}`);
    } else if (accessToken && refreshToken) {
      localStorage.setItem('access-token', accessToken);
      localStorage.setItem('refresh-token', refreshToken);

      const localRedirectUrl = localStorage.getItem('redirect-url');
      localStorage.removeItem('redirect-url');
      location.href = localRedirectUrl || '/';
    }
  }, [searchParams]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex w-full max-w-[22rem] -translate-y-6 flex-col items-center gap-12 px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="text-primary-50 title-md-200">
            일정을 쉽고 빠르게,
          </div>
          <div className="">
            <img
              src={logo}
              alt="로그인 원타임 로고"
              className="w-[16rem] object-cover"
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <SocialLoginButton
            href={`${import.meta.env.VITE_SERVER_OAUTH2_URL}/naver`}
            social="naver"
          />
          <SocialLoginButton
            href={`${import.meta.env.VITE_SERVER_OAUTH2_URL}/kakao`}
            social="kakao"
          />
          <SocialLoginButton
            href={`${import.meta.env.VITE_SERVER_OAUTH2_URL}/google`}
            social="google"
          />
        </div>
      </div>
    </div>
  );
}
