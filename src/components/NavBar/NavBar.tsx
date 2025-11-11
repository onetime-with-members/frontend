'use client';

import { useEffect, useState } from 'react';

import AvatarDropdown from './AvatarDropdown';
import LoginButton from './LoginButton';
import { defaultUser } from '@/features/user/constants';
import useScroll from '@/hooks/useScroll';
import { useAuth } from '@/lib/auth';
import cn from '@/lib/cn';
import { ProgressLink } from '@/navigation';
import Image from 'next/image';

export default function NavBar({
  variant = 'default',
  shadow = true,
  className,
  disabled,
  isAuthHidden = false,
  heightZero = false,
}: {
  variant?: 'default' | 'black' | 'transparent' | 'gray';
  shadow?: boolean;
  className?: string;
  disabled?: boolean;
  isAuthHidden?: boolean;
  heightZero?: boolean;
}) {
  const [isMounted, setIsMounted] = useState(false);

  const { user, isLoggedIn } = useAuth();
  const { isScrolling } = useScroll();

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
            'bg-gray-05': variant === 'gray',
            'bg-transparent': variant === 'transparent' && !isScrolling,
          },
          {
            'h-[4rem]': !heightZero,
          },
        )}
      >
        <div className="mx-auto flex h-full max-w-screen-md items-center justify-between">
          <ProgressLink
            href="/"
            className={cn({
              'pointer-events-none cursor-default': disabled,
            })}
          >
            <Image
              src={
                variant === 'default' ||
                variant === 'transparent' ||
                variant === 'gray'
                  ? '/images/logo.svg'
                  : '/images/logo-white.svg'
              }
              alt="OneTime"
              width={148}
              height={32}
              className="h-[2rem]"
              priority
            />
          </ProgressLink>
          {!isAuthHidden && isMounted && (
            <>
              {user ? (
                <AvatarDropdown name={user.nickname} disabled={disabled} />
              ) : isLoggedIn ? (
                <AvatarDropdown
                  name={defaultUser.nickname}
                  disabled={disabled}
                />
              ) : (
                <LoginButton disabled={disabled} />
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
