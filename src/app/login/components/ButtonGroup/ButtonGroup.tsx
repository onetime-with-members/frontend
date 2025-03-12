import SocialLoginButton from './SocialLoginButton/SocialLoginButton';
import { useRouter } from '@/navigation';

export default function ButtonGroup() {
  const router = useRouter();

  const lastLoginLocal =
    typeof localStorage !== 'undefined' && localStorage.getItem('last-login');

  function handleLoginButtonClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    router.push(e.currentTarget.href);
    router.refresh();
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <SocialLoginButton
        href={`${process.env.NEXT_PUBLIC_SERVER_OAUTH2_URL}/naver`}
        social="naver"
        lastLogin={lastLoginLocal === 'naver'}
        onClick={handleLoginButtonClick}
      />
      <SocialLoginButton
        href={`${process.env.NEXT_PUBLIC_SERVER_OAUTH2_URL}/kakao`}
        social="kakao"
        lastLogin={lastLoginLocal === 'kakao'}
        onClick={handleLoginButtonClick}
      />
      <SocialLoginButton
        href={`${process.env.NEXT_PUBLIC_SERVER_OAUTH2_URL}/google`}
        social="google"
        lastLogin={lastLoginLocal === 'google'}
        onClick={handleLoginButtonClick}
      />
    </div>
  );
}
