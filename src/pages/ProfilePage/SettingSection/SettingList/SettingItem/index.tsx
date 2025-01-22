import cn from '@/utils/cn';

interface SettingItemProps extends React.HTMLAttributes<HTMLLIElement> {}

export default function SettingItem({
  children,
  className,
  ...rest
}: SettingItemProps) {
  return (
    <li
      className={cn('flex items-center gap-2 px-6 py-4', className)}
      {...rest}
    >
      {children}
    </li>
  );
}
