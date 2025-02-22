import { SocialLoginType } from '../LoginPage';
import SocialLoginButton from '@/pages/LoginPage/ButtonGroup/SocialLoginButton/SocialLoginButton';

interface ButtonGroupProps {
  setLastLogin: React.Dispatch<React.SetStateAction<SocialLoginType | null>>;
}

export default function ButtonGroup({ setLastLogin }: ButtonGroupProps) {
  const lastLoginLocal = localStorage.getItem('last-login');

  function handleLoginButtonClick(key: SocialLoginType) {
    return function (e: React.MouseEvent<HTMLAnchorElement>) {
      e.preventDefault();
      setLastLogin(key);
      location.href = `${import.meta.env.VITE_SERVER_OAUTH2_URL}/${key}`;
    };
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <SocialLoginButton
        href={`${import.meta.env.VITE_SERVER_OAUTH2_URL}/naver`}
        social="naver"
        lastLogin={lastLoginLocal === 'naver'}
        onClick={handleLoginButtonClick('naver')}
      />
      <SocialLoginButton
        href={`${import.meta.env.VITE_SERVER_OAUTH2_URL}/kakao`}
        social="kakao"
        lastLogin={lastLoginLocal === 'kakao'}
        onClick={handleLoginButtonClick('kakao')}
      />
      <SocialLoginButton
        href={`${import.meta.env.VITE_SERVER_OAUTH2_URL}/google`}
        social="google"
        lastLogin={lastLoginLocal === 'google'}
        onClick={handleLoginButtonClick('google')}
      />
    </div>
  );
}
