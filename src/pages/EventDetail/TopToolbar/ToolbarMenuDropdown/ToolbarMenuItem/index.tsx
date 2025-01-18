import clsx from 'clsx';
import { Link } from 'react-router-dom';

import EditIcon from '@/components/icon/EditIcon';
import TrashIcon from '@/components/icon/TrashIcon';

interface ToolbarMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  name: string;
  icon: 'edit' | 'delete';
  href?: string;
  variant?: 'default' | 'danger';
}

export default function ToolbarMenuItem({
  name,
  icon,
  href = '#',
  variant = 'default',
  ...props
}: ToolbarMenuItemProps) {
  return (
    <li {...props}>
      <Link
        to={href}
        className={clsx(
          'flex w-full cursor-pointer items-center justify-between py-2 pl-4 pr-5 duration-150 text-md-200 hover:bg-gray-10',
          {
            'text-gray-60': variant === 'default',
            'text-danger-50': variant === 'danger',
          },
        )}
      >
        <span>
          {icon === 'edit' && <EditIcon size={20} fill="#757A95" />}
          {icon === 'delete' && (
            <TrashIcon size={20} fill="#E4678D" innerFill="#FFFFFF" />
          )}
        </span>
        <span>{name}</span>
      </Link>
    </li>
  );
}
