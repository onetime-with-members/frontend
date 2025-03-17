import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

import AvatarDropdown from '../avatar/AvatarDropdown/AvatarDropdown';
import LoginButton from './LoginButton/LoginButton';
import useScroll from '@/hooks/useScroll';
import { Link } from '@/navigation';
import { UserType } from '@/types/user.type';
import axios from '@/utils/axios';
import cn from '@/utils/cn';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

interface NavBarProps {
  variant?: 'default' | 'black' | 'transparent';
  shadow?: boolean;
  className?: string;
  disabled?: boolean;
  isAuthHidden?: boolean;
  heightZero?: boolean;
}

export default function NavBar({
  variant = 'default',
  shadow = true,
  className,
  disabled,
  isAuthHidden = false,
  heightZero = false,
}: NavBarProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [hasTokens, setHasTokens] = useState<boolean>(
    !!getCookie('access-token') && !!getCookie('refresh-token'),
  );

  const { isScrolling } = useScroll();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!!getCookie('access-token') && !!getCookie('refresh-token')) {
      setHasTokens(true);
    }
  }, [hasTokens]);

  const { data: user, isLoading } = useQuery<UserType>({
    queryKey: ['users', 'profile'],
    queryFn: async () => {
      const res = await axios.get('/users/profile');
      return res.data.payload;
    },
    enabled: hasTokens,
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
            href={disabled ? '#' : '/'}
            className={cn({
              'cursor-default': disabled,
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
            />
          </Link>
          {isMounted && !isAuthHidden && (
            <>
              {user ? (
                <AvatarDropdown name={user.nickname} disabled={disabled} />
              ) : (
                !isLoading && !user && <LoginButton />
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
