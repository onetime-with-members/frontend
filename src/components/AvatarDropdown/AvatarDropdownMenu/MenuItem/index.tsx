import { Link } from 'react-router-dom';

import cn from '@/utils/cn';

interface MenuItemProps {
  children: React.ReactNode;
  variant?: 'default' | 'danger';
  href?: string;
  onClick?: () => void;
}

export default function MenuItem({
  children,
  variant = 'default',
  href = '#',
  onClick,
}: MenuItemProps) {
  return (
    <li onClick={onClick}>
      <Link
        to={href}
        className={cn('block px-4 py-2 text-center text-gray-60 text-md-200', {
          'text-danger-50': variant === 'danger',
        })}
      >
        {children}
      </Link>
    </li>
  );
}
