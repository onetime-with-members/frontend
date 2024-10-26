import clsx from 'clsx';
import { Link } from 'react-router-dom';

interface AvatarMenuItemProps {
  children: React.ReactNode;
  variant?: 'default' | 'danger';
  href?: string;
  onClick?: () => void;
}

export default function AvatarMenuItem({
  children,
  variant = 'default',
  href = '#',
  onClick,
}: AvatarMenuItemProps) {
  return (
    <li onClick={onClick}>
      <Link
        to={href}
        className={clsx('block px-4 py-2 text-center text-md-200', {
          'text-gray-60': variant === 'default',
          'text-danger-50': variant === 'danger',
        })}
      >
        {children}
      </Link>
    </li>
  );
}
