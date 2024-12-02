import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from '../api/axios';
import logoBlack from '../assets/logo.svg';
import AvatarDropdown from './AvatarDropdown';
import LoginButton from './LoginButton';
import { useQuery } from '@tanstack/react-query';

export default function NavBar() {
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
    <nav className="flex h-[4rem] w-full items-center">
      <div
        className={clsx(
          'fixed left-0 top-0 z-40 h-[4rem] w-full p-4 duration-150',
          {
            'bg-gray-00 text-gray-80': !isNavBackground,
            'bg-gray-00 text-gray-80 shadow-lg': isNavBackground,
          },
        )}
      >
        <div className="mx-auto flex h-full max-w-screen-md items-center justify-between">
          <Link to="/">
            <img src={logoBlack} alt="OneTime" className="h-[2rem]" />
          </Link>
          {isLoggedIn ? (
            !isUserPending && user ? (
              <AvatarDropdown name={user.nickname} />
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
