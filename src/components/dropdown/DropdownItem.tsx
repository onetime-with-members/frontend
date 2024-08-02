import clsx from 'clsx';

interface DropdownItemProps extends React.LiHTMLAttributes<HTMLLIElement> {}

export default function DropdownItem(props: DropdownItemProps) {
  const { children, className, ...rest } = props;

  return (
    <li
      className={clsx(
        'text-lg-200 w-full py-2 text-center text-gray-50',
        className,
      )}
      {...rest}
    >
      {children}
    </li>
  );
}
