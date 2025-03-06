import cn from '@/utils/cn';
import Link from 'next/link';

interface SideTabItemProps extends React.HTMLAttributes<HTMLLIElement> {
  active?: boolean;
  icon?: React.ReactNode;
  href: string;
}

export default function SideTabItem({
  children,
  className,
  active,
  icon,
  href,
  ...props
}: SideTabItemProps) {
  return (
    <li
      className={cn(
        'rounded-lg bg-gray-00 text-gray-40',
        {
          'bg-primary-00 text-primary-50': active,
        },
        className,
      )}
      {...props}
    >
      <Link
        href={href}
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
