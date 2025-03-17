import cn from '@/utils/cn';

type HeaderProps = React.HTMLAttributes<HTMLHeadingElement>;

export default function Header({ children, className, ...props }: HeaderProps) {
  return (
    <h2
      className={cn(
        'sticky top-[123px] z-10 bg-gray-05 py-1 text-gray-90 text-lg-300 md:top-[136px]',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}
