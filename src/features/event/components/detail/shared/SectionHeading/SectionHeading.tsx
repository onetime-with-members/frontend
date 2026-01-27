import useTopContentHeight from '@/features/event/hooks/useTopContentHeight';
import cn from '@/lib/cn';

export default function SectionHeading({
  children,
  icon,
  status,
  className,
  sticky,
}: {
  icon?: React.ReactNode;
  status?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  sticky?: boolean;
}) {
  const stickTop = useTopContentHeight(
    ({ navBar, eventHeader, barBanner }) => navBar + eventHeader + barBanner,
  );

  return (
    <div
      className={cn(
        'z-10 flex items-center gap-2 bg-gray-00 pb-1 pt-2 text-gray-70 text-md-300 md:text-lg-300',
        {
          sticky,
        },
        className,
      )}
      style={{
        top: stickTop,
      }}
    >
      <div className="flex items-center">
        <span className="text-xl">{icon}</span>
        <h2 className="text-lg-300">{children}</h2>
      </div>
      <span className="text-primary-50">{status}</span>
    </div>
  );
}
