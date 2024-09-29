import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logoWhite from '../../assets/logo-white.svg';
import logoBlack from '../../assets/logo.svg';
import Avatar from '../avatar/Avatar';

interface NavBarProps {
  variant?: 'white' | 'black';
}

export default function NavBar({ variant = 'white' }: NavBarProps) {
  const [isNavBackground, setIsNavBackground] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <nav className="flex h-[4rem] w-full">
      <div
        className={clsx(
          'fixed left-0 top-0 z-40 h-[4rem] w-full p-4 duration-150',
          {
            'bg-transparent text-gray-00':
              !isNavBackground && variant === 'white',
            'bg-gray-00 text-gray-80': !isNavBackground && variant === 'black',
            'bg-gray-00 text-gray-80 shadow-lg': isNavBackground,
          },
        )}
      >
        <div className="mx-auto flex max-w-screen-sm items-center justify-between">
          <Link to="/">
            <img
              src={
                variant === 'black'
                  ? logoBlack
                  : isNavBackground
                    ? logoBlack
                    : logoWhite
              }
              alt="OneTime 로고"
            />
          </Link>
          {isLoggedIn ? (
            <Link to="/mypage">
              <Avatar />
            </Link>
          ) : (
            <Link to="/login" className="text-lg-200">
              로그인
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
