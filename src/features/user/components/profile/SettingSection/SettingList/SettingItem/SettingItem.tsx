import cn from '@/lib/cn';
import { ProgressLink } from '@/navigation';

export default function SettingItem({
  children,
  className,
  href,
  external,
  ...rest
}: {
  href?: string;
  external?: boolean;
} & React.HTMLAttributes<HTMLLIElement>) {
  const content = href ? (
    external ? (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <ProgressLink href={href}>{children}</ProgressLink>
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
