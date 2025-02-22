import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import googleAuthLogo from '@/assets/google-auth-logo.svg';
import kakaoAuthLogo from '@/assets/kakao-auth-logo.svg';
import naverAuthLogo from '@/assets/naver-auth-logo.svg';
import cn from '@/utils/cn';

interface SocialLoginButtonProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  href: string;
  social: 'naver' | 'kakao' | 'google';
  lastLogin?: boolean;
}

export default function SocialLoginButton({
  href,
  social,
  className,
  lastLogin,
  ...rest
}: SocialLoginButtonProps) {
  const { t } = useTranslation();

  return (
    <Link
      to={href}
      className={cn(
        'relative flex h-14 w-full items-center justify-center gap-2 rounded-xl',
        {
          'bg-[#03C75A]': social === 'naver',
          'bg-[#FEE500]': social === 'kakao',
          'bg-[#F2F2F2]': social === 'google',
        },
        className,
      )}
      {...rest}
    >
      {lastLogin && (
        <div className="absolute -top-2 right-2.5 rounded-lg rounded-bl-sm bg-gray-90 px-2.5 py-1.5 text-xs font-medium text-gray-00">
          {t('login.lastLogin')}
        </div>
      )}
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
        className={cn('text-sm-300', {
          'text-gray-00': social === 'naver',
          'text-gray-100': social === 'kakao',
          'text-gray-80': social === 'google',
        })}
      >
        {social === 'naver'
          ? t('login.naver')
          : social === 'kakao'
            ? t('login.kakao')
            : social === 'google'
              ? t('login.google')
              : ''}{' '}
      </span>
    </Link>
  );
}
