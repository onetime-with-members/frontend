import { Link } from 'react-router-dom';

import AvatarDropdown from '../avatar/AvatarDropdown';
import LoginButton from './LoginButton';
import logoWhite from '@/assets/logo-white.svg';
import logoBlack from '@/assets/logo.svg';
import useScroll from '@/hooks/useScroll';
import { User } from '@/types/user.type';
import axios from '@/utils/axios';
import cn from '@/utils/cn';
import { useQuery } from '@tanstack/react-query';

interface NavBarProps {
  variant?: 'default' | 'black';
  shadow?: boolean;
  className?: string;
}

export default function NavBar({
  variant = 'default',
  shadow = true,
  className,
}: NavBarProps) {
  const { isScrolling } = useScroll();

  const hasTokens =
    !!localStorage.getItem('access-token') &&
    !!localStorage.getItem('refresh-token');

  const { isLoading, data: user } = useQuery<User>({
    queryKey: ['users', 'profile'],
    queryFn: async () => {
      const res = await axios.get('/users/profile');
      return res.data.payload;
    },
    enabled: hasTokens,
  });

  return (
    <nav className={cn('flex h-[4rem] w-full items-center', className)}>
      <div
        className={cn(
          'fixed left-0 top-0 z-40 h-[4rem] w-full bg-gray-00 p-4 text-gray-80 duration-150',
          {
            'shadow-lg': isScrolling && shadow,
            'bg-gray-80 text-gray-00': variant === 'black',
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
          {user && <AvatarDropdown name={user.nickname} />}
          {!isLoading && !user && <LoginButton />}
        </div>
      </div>
    </nav>
  );
}
