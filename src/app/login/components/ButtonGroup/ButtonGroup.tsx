import SocialLoginButton from './SocialLoginButton/SocialLoginButton';

export default function ButtonGroup() {
  const lastLoginLocal =
    typeof window !== 'undefined' && localStorage.getItem('last-login');

  function handleLoginButtonClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    location.href = e.currentTarget.href;
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <SocialLoginButton
        href={`${process.env.VITE_SERVER_OAUTH2_URL}/naver`}
        social="naver"
        lastLogin={lastLoginLocal === 'naver'}
        onClick={handleLoginButtonClick}
      />
      <SocialLoginButton
        href={`${process.env.VITE_SERVER_OAUTH2_URL}/kakao`}
        social="kakao"
        lastLogin={lastLoginLocal === 'kakao'}
        onClick={handleLoginButtonClick}
      />
      <SocialLoginButton
        href={`${process.env.VITE_SERVER_OAUTH2_URL}/google`}
        social="google"
        lastLogin={lastLoginLocal === 'google'}
        onClick={handleLoginButtonClick}
      />
    </div>
  );
}
