import clsx from 'clsx';

interface SettingItemProps extends React.HTMLAttributes<HTMLLIElement> {}

export default function SettingItem({
  children,
  className,
  ...rest
}: SettingItemProps) {
  return (
    <li
      className={clsx('flex items-center gap-2 px-6 py-4', className)}
      {...rest}
    >
      {children}
    </li>
  );
}
