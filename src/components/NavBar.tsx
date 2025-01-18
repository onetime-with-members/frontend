import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logoWhite from '../assets/logo-white.svg';
import logoBlack from '../assets/logo.svg';
import useScroll from '../hooks/useScroll';
import { User } from '../types/user.type';
import axios from '../utils/axios';
import AvatarDropdown from './AvatarDropdown';
import LoginButton from './LoginButton';
import { useQuery } from '@tanstack/react-query';

interface NavBarProps {
  overlay?: boolean;
  variant?: 'default' | 'black';
  shadow?: boolean;
  className?: string;
}

export default function NavBar({
  overlay = false,
  variant = 'default',
  shadow = true,
  className,
}: NavBarProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { isScrolling } = useScroll();

  const {
    isPending: isUserPending,
    data: user,
    error: userError,
  } = useQuery<User>({
    queryKey: ['users', 'profile'],
    queryFn: async () => {
      const res = await axios.get('/users/profile');
      return res.data.payload;
    },
    enabled: isLoggedIn,
  });

  useEffect(() => {
    if (
      localStorage.getItem('access-token') &&
      localStorage.getItem('refresh-token')
    ) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <nav className={clsx('flex h-[4rem] w-full items-center', className)}>
      <div
        className={clsx(
          'fixed left-0 top-0 h-[4rem] w-full p-4 duration-150',
          {
            'shadow-lg': isScrolling && shadow,
          },
          {
            'bg-gray-00 text-gray-80': variant === 'default',
            'bg-gray-80 text-gray-00': variant === 'black',
          },
          {
            'z-[9999]': overlay,
            'z-40': !overlay,
          },
        )}
      >
        <div className="mx-auto flex h-full max-w-screen-md items-center justify-between">
          <Link to="/">
            <img
              src={variant === 'default' ? logoBlack : logoWhite}
              alt="OneTime"
              className="h-[2rem]"
            />
          </Link>
          {isLoggedIn ? (
            !isUserPending ? (
              <AvatarDropdown name={user?.nickname || ''} />
            ) : userError ? (
              <LoginButton />
            ) : null
          ) : (
            <LoginButton />
          )}
        </div>
        {overlay && (
          <div className="absolute left-0 top-0 h-full w-full bg-gray-90 bg-opacity-30" />
        )}
      </div>
    </nav>
  );
}
