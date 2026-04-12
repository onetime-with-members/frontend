import cn from '@/lib/cn';
import { ProgressLink } from '@/navigation';

export default function SideTabItem({
  children,
  className,
  active,
  icon,
  href,
  ...props
}: {
  active?: boolean;
  icon?: React.ReactNode;
  href: string;
} & React.HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      className={cn(
        'rounded-lg bg-gray-00 text-gray-40 duration-150 [--inner-fill:#ffffff] hover:bg-primary-00 hover:[--inner-fill:#e8ebfc] active:bg-primary-00 active:[--inner-fill:#e8ebfc]',
        {
          'bg-primary-00 text-primary-50 [--inner-fill:#e8ebfc]': active,
        },
        className,
      )}
      {...props}
    >
      <ProgressLink
        href={href}
        className="flex w-[10rem] items-center justify-start gap-2 p-3 text-md-300"
      >
        <span className="flex items-center justify-center text-2xl">
          {icon}
        </span>
        <span>{children}</span>
      </ProgressLink>
    </li>
  );
}
