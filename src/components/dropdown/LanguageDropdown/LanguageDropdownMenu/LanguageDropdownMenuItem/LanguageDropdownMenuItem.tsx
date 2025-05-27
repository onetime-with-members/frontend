import CheckIcon from '@/components/icon/CheckIcon';
import cn from '@/lib/cn';

interface LanguageDropdownMenuItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  active?: boolean;
}

export default function LanguageDropdownMenuItem({
  children,
  className,
  active,
  ...props
}: LanguageDropdownMenuItemProps) {
  return (
    <li
      className={cn(
        'flex cursor-pointer items-center justify-between text-gray-50 text-md-200',
        {
          'text-primary-40 text-md-300': active,
        },
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {active && (
        <span>
          <CheckIcon size={16} fill="#677CEE" />
        </span>
      )}
    </li>
  );
}
