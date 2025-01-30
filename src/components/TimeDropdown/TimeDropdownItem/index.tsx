import cn from '@/utils/cn';

interface DropdownItemProps extends React.LiHTMLAttributes<HTMLLIElement> {}

export default function TimeDropdownItem({
  children,
  className,
  ...rest
}: DropdownItemProps) {
  return (
    <li
      className={cn(
        'w-full cursor-pointer py-2 text-center text-gray-50 text-lg-200',
        className,
      )}
      {...rest}
    >
      {children}
    </li>
  );
}
