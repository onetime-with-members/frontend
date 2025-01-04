import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from '../api/axios';
import logoWhite from '../assets/logo-white.svg';
import logoBlack from '../assets/logo.svg';
import { User } from '../types/user.type';
import AvatarDropdown from './AvatarDropdown';
import LoginButton from './LoginButton';
import { useQuery } from '@tanstack/react-query';

interface NavBarProps {
  overlay?: boolean;
  variant?: 'default' | 'black';
  className?: string;
}

export default function NavBar({
  overlay = false,
  variant = 'default',
  className,
}: NavBarProps) {
  const [isNavBackground, setIsNavBackground] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userError, setUserError] = useState<unknown>();

  const { isPending: isUserPending, data: user } = useQuery<User>({
    queryKey: ['users', 'profile'],
    queryFn: async () => {
      try {
        const res = await axios.get('/users/profile');
        return res.data.payload;
      } catch (error) {
        setUserError(error);
        return null;
      }
    },
    enabled: isLoggedIn,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsNavBackground(true);
      } else {
        setIsNavBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isNavBackground]);

  useEffect(() => {
    if (
      localStorage.getItem('access-token') &&
      localStorage.getItem('refresh-token')
    ) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (userError) {
      console.log(userError);
    }
  }, [userError]);

  return (
    <nav className={clsx('flex h-[4rem] w-full items-center', className)}>
      <div
        className={clsx(
          'fixed left-0 top-0 h-[4rem] w-full p-4 duration-150',
          {
            'shadow-lg': isNavBackground,
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
