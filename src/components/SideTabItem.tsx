import clsx from 'clsx';
import { Link } from 'react-router-dom';

interface SideTabItemProps extends React.HTMLAttributes<HTMLLIElement> {
  active?: boolean;
  icon?: React.ReactNode;
  to: string;
}

export default function SideTabItem({
  children,
  className,
  active,
  icon,
  to,
  ...props
}: SideTabItemProps) {
  return (
    <li
      className={clsx(
        'rounded-lg',
        {
          'bg-primary-00 text-primary-50': active,
          'bg-gray-00 text-gray-40': !active,
        },
        className,
      )}
      {...props}
    >
      <Link
        to={to}
        className="flex w-[10rem] items-center justify-start gap-2 p-3 text-md-300"
      >
        <span className="flex h-[24px] w-[24px] items-center justify-center">
          {icon}
        </span>
        <span>{children}</span>
      </Link>
    </li>
  );
}
