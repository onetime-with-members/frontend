import { Link } from 'react-router-dom';

import AvatarDropdown from '../avatar/AvatarDropdown/AvatarDropdown';
import LoginButton from './LoginButton/LoginButton';
import logoWhite from '@/assets/logo-white.svg';
import logoBlack from '@/assets/logo.svg';
import useScroll from '@/hooks/useScroll';
import { UserType } from '@/types/user.type';
import axios from '@/utils/axios';
import cn from '@/utils/cn';
import { useQuery } from '@tanstack/react-query';

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
  const { isScrolling } = useScroll();

  const hasTokens =
    !!localStorage.getItem('access-token') &&
    !!localStorage.getItem('refresh-token');

  const { isLoading, data: user } = useQuery<UserType>({
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
            to={disabled ? '#' : '/'}
            className={cn({
              'cursor-default': disabled,
            })}
          >
            <img
              src={
                variant === 'default' || variant === 'transparent'
                  ? logoBlack
                  : logoWhite
              }
              alt="OneTime"
              className="h-[2rem]"
            />
          </Link>
          {!isAuthHidden && (
            <>
              {user && (
                <AvatarDropdown name={user.nickname} disabled={disabled} />
              )}
              {!isLoading && !user && <LoginButton />}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
