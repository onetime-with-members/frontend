import { useTranslations } from 'next-intl';

import AvatarDropdown from './dropdown/avatar-dropdown';
import useScroll from '@/hooks/useScroll';
import { currentUser } from '@/lib/actions';
import cn from '@/lib/cn';
import { UserType } from '@/lib/types';
import { Link, useRouter } from '@/navigation';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function NavBar({
  variant = 'default',
  shadow = true,
  className,
  disabled,
  isAuthHidden = false,
  heightZero = false,
}: {
  variant?: 'default' | 'black' | 'transparent';
  shadow?: boolean;
  className?: string;
  disabled?: boolean;
  isAuthHidden?: boolean;
  heightZero?: boolean;
}) {
  const { isScrolling } = useScroll();

  const { data: user, isPending } = useQuery<UserType>({
    queryKey: ['users', 'profile'],
    queryFn: currentUser,
  });

  return (
    <nav
      className={cn(
        'flex w-full items-center',
        {
          'h-[4rem]': !heightZero,
        },
        className,
      )}
    >
      <div
        className={cn(
          'fixed left-0 top-0 z-40 w-full bg-gray-00 p-4 text-gray-80 duration-150',
          {
            'shadow-lg': isScrolling && shadow,
            'bg-gray-80 text-gray-00': variant === 'black',
            'bg-transparent text-gray-80':
              variant === 'transparent' && !isScrolling,
          },
          {
            'h-[4rem]': !heightZero,
          },
        )}
      >
        <div className="mx-auto flex h-full max-w-screen-md items-center justify-between">
          <Link
            href="/"
            className={cn({
              'pointer-events-none cursor-default': disabled,
            })}
          >
            <Image
              src={
                variant === 'default' || variant === 'transparent'
                  ? '/images/logo.svg'
                  : '/images/logo-white.svg'
              }
              alt="OneTime"
              width={148}
              height={32}
              className="h-[2rem]"
              priority
            />
          </Link>
          {!isAuthHidden && (
            <>
              {user ? (
                <AvatarDropdown name={user.nickname} disabled={disabled} />
              ) : (
                !isPending && <LoginButton disabled={disabled} />
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function LoginButton({ disabled }: { disabled?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('navbar');

  function handleLoginClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    router.push(`/login?redirect_url=${pathname}`);
  }

  return (
    <Link
      href="/login"
      className={cn('flex items-center text-lg-200', {
        'pointer-events-none': disabled,
      })}
      onClick={handleLoginClick}
    >
      {t('login')}
    </Link>
  );
}
