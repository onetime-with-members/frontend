import { Link } from '@/navigation';
import cn from '@/utils/cn';

interface SettingItemProps extends React.HTMLAttributes<HTMLLIElement> {
  href?: string;
  external?: boolean;
}

export default function SettingItem({
  children,
  className,
  href,
  external,
  ...rest
}: SettingItemProps) {
  const content = href ? (
    external ? (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <Link href={href}>{children}</Link>
    )
  ) : (
    children
  );

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
