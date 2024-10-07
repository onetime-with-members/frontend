import clsx from 'clsx';
import { Link } from 'react-router-dom';

import googleAuthLogo from '../../assets/google-auth-logo.svg';
import kakaoAuthLogo from '../../assets/kakao-auth-logo.svg';
import naverAuthLogo from '../../assets/naver-auth-logo.svg';

interface SocialLoginButtonProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  href: string;
  social: 'naver' | 'kakao' | 'google';
}

export default function SocialLoginButton({
  href,
  social,
  className,
  ...rest
}: SocialLoginButtonProps) {
  return (
    <Link
      to={href}
      className={clsx(
        'flex h-14 w-full items-center justify-center gap-2 rounded-xl',
        {
          'bg-[#03C75A]': social === 'naver',
          'bg-[#FEE500]': social === 'kakao',
          'bg-gray-00': social === 'google',
        },
        className,
      )}
      {...rest}
    >
      <div>
        <img
          src={
            social === 'naver'
              ? naverAuthLogo
              : social === 'kakao'
                ? kakaoAuthLogo
                : social === 'google'
                  ? googleAuthLogo
                  : ''
          }
          alt={`로그인 ${
            social === 'naver'
              ? '네이버'
              : social === 'kakao'
                ? '카카오'
                : social === 'google'
                  ? '구글'
                  : ''
          } 로고`}
        />
      </div>
      <span
        className={clsx('text-sm-300', {
          'text-gray-00': social === 'naver',
          'text-gray-100': social === 'kakao',
          'text-gray-80': social === 'google',
        })}
      >
        {social === 'naver'
          ? '네이버'
          : social === 'kakao'
            ? '카카오'
            : social === 'google'
              ? 'Google 계정으로'
              : ''}{' '}
        로그인
      </span>
    </Link>
  );
}
