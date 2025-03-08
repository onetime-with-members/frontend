import cn from '@/utils/cn';
import Link from 'next/link';

interface SettingItemProps extends React.HTMLAttributes<HTMLLIElement> {
  href?: string;
}

export default function SettingItem({
  children,
  className,
  href,
  ...rest
}: SettingItemProps) {
  const content = href ? <Link href={href}>{children}</Link> : children;

  return (
    <li
      className={cn(
        'flex items-center gap-2 px-6 py-4 text-gray-60 text-md-200',
        className,
      )}
      {...rest}
    >
      {content}
    </li>
  );
}
