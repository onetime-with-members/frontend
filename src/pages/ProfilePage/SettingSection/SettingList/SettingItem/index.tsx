import { Link } from 'react-router-dom';

import cn from '@/utils/cn';

interface SettingItemProps extends React.HTMLAttributes<HTMLLIElement> {
  href?: string;
}

export default function SettingItem({
  children,
  className,
  href,
  ...rest
}: SettingItemProps) {
  const content = href ? <Link to={href}>{children}</Link> : children;

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
