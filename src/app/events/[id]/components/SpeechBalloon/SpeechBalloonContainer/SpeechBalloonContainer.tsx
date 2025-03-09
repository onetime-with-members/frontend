import cn from '@/utils/cn';

interface SpeechBalloonWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export default function SpeechBalloonContainer({
  children,
  className,
  ...props
}: SpeechBalloonWrapperProps) {
  return (
    <div className={cn('relative', className)} {...props}>
      {children}
    </div>
  );
}
