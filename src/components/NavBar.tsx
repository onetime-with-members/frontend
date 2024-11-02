import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from '../api/axios';
import logoWhite from '../assets/logo-white.svg';
import logoBlack from '../assets/logo.svg';
import Avatar from './Avatar';
import LoginButton from './LoginButton';
import { useQuery } from '@tanstack/react-query';

interface NavBarProps {
  variant?: 'transparent' | 'black' | 'white';
}

export default function NavBar({ variant = 'transparent' }: NavBarProps) {
  const [isNavBackground, setIsNavBackground] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userError, setUserError] = useState<unknown>();

  const { isPending: isUserPending, data: userData } = useQuery({
    queryKey: ['users', 'profile'],
    queryFn: async () => {
      try {
        const res = await axios.get('/users/profile');
        return res.data;
      } catch (error) {
        setUserError(error);
        return null;
      }
    },
    enabled: isLoggedIn,
    retry: false,
  });

  const user = userData?.payload;

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
  }, [isNavBackground, variant]);

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
    <nav className="flex h-[4rem] w-full items-center">
      <div
        className={clsx(
          'fixed left-0 top-0 z-40 h-[4rem] w-full p-4 duration-150',
          {
            'bg-transparent text-gray-00':
              !isNavBackground && variant === 'transparent',
            'bg-gray-00 text-gray-80':
              !isNavBackground && (variant === 'black' || variant === 'white'),
            'bg-gray-00 text-gray-80 shadow-lg': isNavBackground,
          },
        )}
      >
        <div className="mx-auto flex h-full max-w-screen-sm items-center justify-between">
          <Link to="/">
            <img
              src={
                variant === 'black' || variant === 'white'
                  ? logoBlack
                  : isNavBackground
                    ? logoBlack
                    : logoWhite
              }
              alt="OneTime"
              className="h-[2rem]"
            />
          </Link>
          {isLoggedIn ? (
            !isUserPending && user ? (
              <Avatar name={user.nickname} />
            ) : userError ? (
              <LoginButton />
            ) : null
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </nav>
  );
}
