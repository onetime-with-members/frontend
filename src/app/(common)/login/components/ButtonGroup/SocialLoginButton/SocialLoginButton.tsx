import { useTranslations } from 'next-intl';

import cn from '@/lib/cn';
import { Link } from '@/navigation';
import Image from 'next/image';

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
  const t = useTranslations('login');

  return (
    <Link
      href={href}
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
          {t('lastLogin')}
        </div>
      )}
      <div>
        <Image
          src={
            social === 'naver'
              ? '/images/naver-auth-logo.svg'
              : social === 'kakao'
                ? '/images/kakao-auth-logo.svg'
                : social === 'google'
                  ? '/images/google-auth-logo.svg'
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
          width={18}
          height={18}
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
          ? t('naver')
          : social === 'kakao'
            ? t('kakao')
            : social === 'google'
              ? t('google')
              : ''}{' '}
      </span>
    </Link>
  );
}
