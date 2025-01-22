import SocialLoginButton from '@/pages/Login/ButtonGroup/SocialLoginButton';

export default function ButtonGroup() {
  return (
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
  );
}
